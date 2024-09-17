import React from 'react';
import './Chat.style.scss';
import useChat from './useChat.hooks';

const ChatComponent: React.FC = () => {
  const { messages, handleGetStocks, handleGetStockDetails } = useChat();

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages && messages.length > 0 && React.Children.toArray(messages.map(({ isData, isUser, text, value }) => (
          <div className={`message ${isUser ? 'user' : 'bot'}`}>
            {isData && value && !value.includes('@') && <button onClick={() => handleGetStocks(value, text)}>{text}</button>}
            {isData && value && value.includes('@') && <button onClick={() => handleGetStockDetails(value, text)}>{text}</button>}
            {!isData && <p>{text}</p>}

          </div>
        )))}
      </div>
    </div>
  );
};

export default ChatComponent;