import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ error }) => (error ? '#f0b9b9' : '#bdffd0')};
  border-radius: 7px;
  padding: 10px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0 0 0 10px;
  color: ${({ error }) => (error ? '#e04f5f' : '#32bea6')};
`;

const FormMessage = ({ error, message }) => {
  return (
    <Container error={error}>
      <Text error={error}>{message}</Text>
    </Container>
  );
};

FormMessage.propTypes = {
  error: PropTypes.any,
  message: PropTypes.any,
};

export default FormMessage;
