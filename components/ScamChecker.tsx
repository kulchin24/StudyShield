import React, { useState, useRef, useEffect } from 'react';
import { createFactCheckChat, sendMessage } from '../services/geminiService';
import { ChatMessage, Source } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { Chat } from '@google/genai';

// Simple Markdown renderer to handle bold text
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <pre className="whitespace-pre-wrap font-sans text-charcoal leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      })}
    </pre>
  );
};

const ScamChecker: React.FC = () => {
  const [query, setQuery] = useState('');
  const [followUpQuery, setFollowUpQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatRef = useRef<Chat | null>(null);

  const handleInitialCheck = async () => {
    if (!query.trim()) {
      setError('Please enter some text to check.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessages([]);

    try {
      chatRef.current = createFactCheckChat();
      const initialPrompt = `As an expert in identifying scams related to studying in Japan, analyze this query: "${query}". Identify potential red flags like pressure tactics, unofficial payment requests, or guaranteed visas. Provide a clear, factual summary of your findings and any associated risks. Structure your response for easy readability.`;
      
      setMessages([{ role: 'user', text: query }]);
      const response = await sendMessage(chatRef.current, initialPrompt);
      setMessages(prev => [...prev, { role: 'model', text: response.text, sources: response.sources }]);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuery.trim() || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', text: followUpQuery };
    setMessages(prev => [...prev, userMessage]);
    setFollowUpQuery('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(chatRef.current, followUpQuery);
      setMessages(prev => [...prev, { role: 'model', text: response.text, sources: response.sources }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSources = (sources: Source[]) => (
    <div className="mt-4">
      <h4 className="text-sm font-bold text-peacock-blue/80 font-serif mb-2">Sources:</h4>
      <ul className="list-disc list-inside space-y-1">
        {sources.map((source, index) => (
          <li key={index} className="text-charcoal/90 text-xs">
            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-peacock-blue hover:underline">
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 border-2 border-peacock-blue/20">
      <div className="space-y-5">
        <h2 className="text-3xl font-bold text-peacock-blue text-center font-serif">Study Shield Agent</h2>
        <p className="text-center text-charcoal/80 -mt-3">
          Paste text from an email, a website link, or an agent's name below for an initial analysis.
        </p>

        <div className="bg-saffron/10 border-l-4 border-saffron text-charcoal/90 p-4 rounded-r-lg" role="alert">
          <p className="font-semibold">A Note on AI Verification</p>
          <p className="text-sm mt-1">
              This tool provides an initial analysis for guidance and is not a substitute for professional advice. It may make mistakes, so please cross-reference critical information with the official resources listed below.
          </p>
        </div>
        
        {messages.length === 0 && !isLoading && (
          <>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'An agent is asking for 50,000 INR upfront via UPI for a student visa. Is this normal?' or paste an email text..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-peacock-blue focus:border-transparent transition duration-300 resize-none"
              disabled={isLoading}
            />
            <button
              onClick={handleInitialCheck}
              disabled={isLoading || !query.trim()}
              className="w-full bg-gradient-to-r from-peacock-blue to-bamboo text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg flex items-center justify-center space-x-3 transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify Now
            </button>
          </>
        )}
        
        {isLoading && messages.length === 0 && (
            <div className="flex justify-center items-center h-56 flex-col space-y-4">
                <LoadingSpinner />
                <p className="text-charcoal/70">The Study Shield Agent is thinking...</p>
            </div>
        )}

      </div>

      {error && !isLoading && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="max-h-[50vh] overflow-y-auto space-y-4 p-4 bg-gray-50/50 rounded-lg border">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl p-4 rounded-2xl ${msg.role === 'user' ? 'bg-peacock-blue/10' : 'bg-bamboo/10'}`}>
                  {msg.role === 'model' ? (
                    <MarkdownRenderer text={msg.text} />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-charcoal leading-relaxed">{msg.text}</pre>
                  )}
                  {msg.sources && msg.sources.length > 0 && renderSources(msg.sources)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="max-w-xl p-4 rounded-2xl bg-bamboo/10 flex items-center space-x-2">
                      <div className="h-2 w-2 bg-bamboo rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-bamboo rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-bamboo rounded-full animate-bounce"></div>
                  </div>
              </div>
            )}
          </div>
          <form onSubmit={handleFollowUp} className="flex items-center space-x-2">
            <input
              type="text"
              value={followUpQuery}
              onChange={(e) => setFollowUpQuery(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="w-full p-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-peacock-blue focus:border-transparent transition duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !followUpQuery.trim()}
              className="bg-peacock-blue text-white rounded-full p-3 shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScamChecker;
