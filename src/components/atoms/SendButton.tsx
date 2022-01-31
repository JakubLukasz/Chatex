import React from 'react';
import styled from 'styled-components';
import { BiSend } from 'react-icons/bi';

const Container = styled.button`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 7px;
`;

const Icon = styled(BiSend)`
  font-size: 2.5rem;
  color: #ffffff;
`;

interface IProps {
  className?: string;
}

const SendButton: React.FC<IProps> = ({ className }) => {
  return (
    <Container className={className} type="submit">
      <Icon />
    </Container>
  );
};

export default SendButton;
