import React from 'react';
import Avatar from '../atoms/Avatar';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 7px;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(95%);
  }
`;

const Info = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)`
  width: 4.5rem;
  height: 4.5rem;
`;

const Username = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: left;
  text-transform: capitalize;
`;

const ClickInfo = styled.p`
  text-align: left;
`;

interface IProps {
  username: string;
  photoURL: string;
  onClick?: () => void;
}

const UserButton: React.FC<IProps> = ({ onClick, photoURL, username }) => {
  return (
    <Button onClick={onClick}>
      <SAvatar src={photoURL} alt={username} />
      <Info>
        <Username>{username}</Username>
        <ClickInfo>Click to chat</ClickInfo>
      </Info>
    </Button>
  );
};

export default UserButton;
