import React from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const SButton = styled.button`
  height:100%:
  width:100%;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  padding: 2px;
  transition:filter .2s ease;

  &:hover{
    filter:brightness(95%)
  }
`;

const SettingsIcon = styled(BiDotsVerticalRounded as any)`
  font-size: 3.5rem;
  object-fit: cover;
`;

interface IProps {
  onClick: () => void;
  className?: string;
}

const SettingsButton: React.FC<IProps> = ({ onClick, className }) => {
  return (
    <SButton className={className} onClick={onClick}>
      <SettingsIcon />
    </SButton>
  );
};

export default SettingsButton;
