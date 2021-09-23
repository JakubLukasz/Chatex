import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DefaultUserIcon from '../assets/images/defaultUserIcon.svg';
import { useChat } from '../hooks/useChat';

const User = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const UserInfo = styled.div`
  margin-left: 15px;
  text-align: left;
`;

const Username = styled.p`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Photo = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ClickInfo = styled.span`
  font-size: 1.2rem;
`;

const UserElement = ({ photoURL, username, uid }) => {
  const { setIsChatOpen, setChatInfo } = useChat();

  const handleChatOpen = () => {
    window.scrollTo(0, 0);
    setChatInfo({ photoURL, username, uid });
    setIsChatOpen(true);
  };

  return (
    <User onClick={handleChatOpen}>
      <Photo src={photoURL ? photoURL : DefaultUserIcon} alt={username} />
      <UserInfo>
        <Username>{username}</Username>
        <ClickInfo>Click to chat</ClickInfo>
      </UserInfo>
    </User>
  );
};

UserElement.propTypes = {
  photoURL: PropTypes.string,
  username: PropTypes.string,
  uid: PropTypes.string,
  searchingPhrase: PropTypes.string,
};

export default UserElement;
