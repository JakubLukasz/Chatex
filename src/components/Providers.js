import React from 'react';
import styled from 'styled-components';
import GoogleProvider from '../components/GoogleProvider';
import FacebookProvider from '../components/FacebookProvider';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.color.secondary};
`;

const Providers = ({ className }) => {
  return (
    <Container className={className}>
      <Text>Sign in with</Text>
      <GoogleProvider />
      <FacebookProvider />
    </Container>
  );
};

Providers.propTypes = {
  className: PropTypes.string,
};

export default Providers;
