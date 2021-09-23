import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(null);
  const [chatInfo, setChatInfo] = useState({});

  const ctx = {
    isChatOpen,
    setIsChatOpen,
    chatInfo,
    setChatInfo,
  };

  return <ChatContext.Provider value={ctx}>{children}</ChatContext.Provider>;
};

ChatContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ChatContextProvider;
