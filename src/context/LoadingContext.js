import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoadingContext = createContext({});

const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const ctx = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={ctx}>{children}</LoadingContext.Provider>
  );
};

LoadingContextProvider.propTypes = {
  children: PropTypes.node,
};

export default LoadingContextProvider;
