import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ChatInterface } from './components/ChatInterface';
import { searchGoogle, getGeminiResponse } from './services/api';
import type { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      type: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get search results
      const searchResults = await searchGoogle(query);
      const context = searchResults
        .map(result => `${result.title} (${result.link})`)
        .join('\n');

      // Get AI response
      const aiResponse = await getGeminiResponse(query, context);

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        type: 'ai',
        timestamp: new Date(),
        sources: searchResults,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Properly handle the error object
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Search error:', errorMessage);
      
      // Add error message to chat
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your request. Please try again later.',
        type: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen bg-[#121212] flex flex-col">
      <ChatInterface messages={messages} onClear={handleClear} />
      <SearchBar onSubmit={handleSearch} isLoading={isLoading} />
    </div>
  );
}

export default App;