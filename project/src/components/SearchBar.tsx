import React, { useState } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
      setQuery('');
    }
  };

  const handleMicClick = () => {
    // Microphone functionality can be implemented here
    console.log('Microphone clicked');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] p-4 border-t border-gray-800"
    >
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="w-full bg-[#2A2A2A] text-white rounded-full px-6 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-lg disabled:opacity-50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {query.length}/2000
          </span>
        </div>
        <button
          type="button"
          onClick={handleMicClick}
          disabled={isLoading}
          className="p-3 rounded-full bg-[#2A2A2A] text-gray-400 hover:text-white active:bg-[#3A3A3A] transition-colors duration-300 disabled:opacity-50 cursor-pointer touch-manipulation select-none"
          aria-label="Voice input"
        >
          <Mic size={20} />
        </button>
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 transition-colors duration-300 disabled:opacity-50 cursor-pointer touch-manipulation select-none"
          aria-label="Send message"
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </div>
    </form>
  );
};