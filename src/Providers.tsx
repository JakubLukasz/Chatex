import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/styles/theme';
import AuthContextProvider from './context/AuthContext';
import FirestoreContextProvider from './context/FirestoreContext';
import GlobalStyles from './assets/styles/GlobalStyles';

const Providers: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <FirestoreContextProvider>
        <GlobalStyles theme={theme} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>
  );
};

export default Providers;
