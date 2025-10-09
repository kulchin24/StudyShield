export interface Source {
  uri: string;
  title: string;
}

export interface FactCheckResult {
  text: string;
  sources: Source[];
}

// New type for chat messages
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: Source[];
}
