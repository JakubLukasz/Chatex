import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/theme';
import GlobalStyles from '../assets/styles/GlobalStyles';
import PropTypes from 'prop-types';

const SetupTemplate = ({ children }) => {
  return (
    <>
      <GlobalStyles theme={theme} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

SetupTemplate.propTypes = {
  children: PropTypes.node,
};

export default SetupTemplate;
