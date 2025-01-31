import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink } from 'lucide-react';
import type { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(message.timestamp);

  return (
    <div
      className={`flex ${
        message.type === 'user' ? 'justify-end' : 'justify-start'
      } mb-4 animate-message`}
    >
      <div
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}

        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          message.type === 'user'
            ? 'bg-purple-600 text-white'
            : 'bg-[#2A2A2A] text-white'
        }`}
      >
        <ReactMarkdown
          className="prose prose-invert max-w-none"
          components={{
            h1: ({ node, ...props }) => (
              <h1 {...props} className="text-purple-400" />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-purple-400" />
            ),
            h3: ({ node, ...props }) => (
              <h3 {...props} className="text-purple-400" />
            ),
            h4: ({ node, ...props }) => (
              <h4 {...props} className="text-purple-400" />
            ),
            h5: ({ node, ...props }) => (
              <h5 {...props} className="text-purple-400" />
            ),
            h6: ({ node, ...props }) => (
              <h6 {...props} className="text-purple-400" />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Sources:</p>
            {message.sources.map((source, index) => (
              <a
                key={index}
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                <ExternalLink size={12} />
                {source.title}
              </a>
            ))}
          </div>
        )}
        
        <div className="text-right mt-1">
          <span className="text-xs text-gray-400">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};