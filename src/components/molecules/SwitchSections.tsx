import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 7px;
  overflow: hidden;
`;

const Button = styled.button`
  width: 50%;
  padding: 15px 0;
  background-color: #ffffff;
  font-weight: 500;
  transition: filter 0.3s ease;

  &:first-child {
    border-right: 1px solid rgba(0, 0, 0, 0.16);
  }

  &:hover {
    filter: brightness(96%);
  }
`;

interface IProps {
  setSection: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const SwitchSections: React.FC<IProps> = ({ className, setSection }) => {
  const handleClick = (e) => {
    setSection(e.target.innerText);
  };

  return (
    <Container className={className}>
      <Button onClick={handleClick}>Chats</Button>
      <Button onClick={handleClick}>Users</Button>
    </Container>
  );
};

export default SwitchSections;
