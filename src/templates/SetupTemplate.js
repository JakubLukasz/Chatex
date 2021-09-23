import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/theme';
import AuthContextProvider from '../context/AuthContext';
import ChatContextProvider from '../context/ChatContext';
import FirestoreContextProvider from '../context/FirestoreContext';
import LoadingContextProvider from '../context/LoadingContext';
import GlobalStyles from '../assets/styles/GlobalStyles';
import PropTypes from 'prop-types';

const SetupTemplate = ({ children }) => {
  return (
    <LoadingContextProvider>
      <ChatContextProvider>
        <AuthContextProvider>
          <FirestoreContextProvider>
            <GlobalStyles theme={theme} />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </FirestoreContextProvider>
        </AuthContextProvider>
      </ChatContextProvider>
    </LoadingContextProvider>
  );
};

SetupTemplate.propTypes = {
  children: PropTypes.node,
};

export default SetupTemplate;
