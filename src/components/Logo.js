import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LogoText = styled.h1`
  font-family: ${({ theme }) => theme.font.family.dancingScript};
  color: ${({ theme }) => theme.color.primary};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Logo = ({ className }) => {
  return (
    <StyledLink to="/">
      <LogoText className={className}>Chatex</LogoText>
    </StyledLink>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
