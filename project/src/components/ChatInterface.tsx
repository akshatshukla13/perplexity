import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import type { Message as MessageType } from '../types';
import { Trash2, Share2 } from 'lucide-react';

interface ChatInterfaceProps {
  messages: MessageType[];
  onClear: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onClear }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference to the end of the chat

  // Auto-scroll to the bottom whenever the messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Runs whenever the messages change

  const handleShare = () => {
    // Share functionality can be implemented here
    console.log('Share clicked');
  };

  return (
    <div className="h-[90vh] bg-[#121212] text-white">
      <div className="sticky top-0 z-10 bg-[#1E1E1E] border-b border-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">AI Search Assistant</h1>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#2A2A2A] active:bg-[#3A3A3A] transition-colors duration-300 cursor-pointer touch-manipulation select-none"
              aria-label="Share conversation"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={onClear}
              className="p-2 rounded-full hover:bg-[#2A2A2A] active:bg-[#3A3A3A] transition-colors duration-300 cursor-pointer touch-manipulation select-none"
              aria-label="Clear conversation"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto p-4 overflow-y-auto h-[calc(90vh-64px)]">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {/* This div will be scrolled to automatically */}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};
