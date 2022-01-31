import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ error }: { error: boolean }) =>
    error ? 'rgba(247, 62, 59,0.2)' : 'rgba(74, 155, 255,0.2)'};
  padding: 25px;
  border-radius: 7px;
  border: 2px solid
    ${({ error }) =>
      error ? 'rgba(247, 62, 59,0.35)' : 'rgba(74, 155, 255,0.35)'};
`;

const Text = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${({ error }: { error: boolean }) =>
    error ? 'rgba(247, 62, 59,0.8)' : 'rgba(74, 155, 255,0.8)'};
`;

interface IProps {
  message: string;
  error?: boolean;
}

const Alert: React.FC<IProps> = ({ message, error }) => {
  return (
    <Container error={error}>
      <Text error={error}>{message}</Text>
    </Container>
  );
};

export default Alert;
