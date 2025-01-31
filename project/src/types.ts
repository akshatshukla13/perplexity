export interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  sources?: Source[];
}

export interface Source {
  title: string;
  link: string;
}