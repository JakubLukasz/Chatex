import React from 'react';
import styled from 'styled-components';
import { BiX } from 'react-icons/bi';

const Container = styled.button`
  height:100%:
  width:100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  padding:2px;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(95%);
  }
`;

const Icon = styled(BiX)`
  font-size: 3rem;
  margin: 0;
  padding: 0;
  object-fit: cover;
`;

interface IProps {
  onClick: () => void;
  className?: string;
}

const CloseButton: React.FC<IProps> = ({ className, onClick }) => {
  return (
    <Container className={className} onClick={onClick}>
      <Icon />
    </Container>
  );
};

export default CloseButton;
