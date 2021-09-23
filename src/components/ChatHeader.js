import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import CloseIcon from '../assets/images/closeIcon.svg';
import DefaultUserIcon from '../assets/images/defaultUserIcon.svg';
import { useChat } from '../hooks/useChat';
import PropTypes from 'prop-types';
import { devices } from '../assets/styles/devices';

const Container = styled.header`
  background-color: #ffffff;
  padding: 15px 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${devices.tablet} {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Photo = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Username = styled.h2`
  margin-left: 10px;
`;

const StyledCloseIcon = styled(Icon)`
  width: auto;
  height: 2rem;
`;

const ChatHeader = ({ photoURL, username }) => {
  const { setIsChatOpen, setChatInfo } = useChat();

  const handleBack = () => {
    setChatInfo({ photoURL: '', username: '', uid: '', messages: [] });
    setIsChatOpen(false);
  };

  return (
    <Container>
      <UserInfo>
        <Photo src={photoURL ? photoURL : DefaultUserIcon} />
        <Username>{username}</Username>
      </UserInfo>
      <CloseButton onClick={handleBack}>
        <StyledCloseIcon src={CloseIcon} />
      </CloseButton>
    </Container>
  );
};

ChatHeader.propTypes = {
  photoURL: PropTypes.string,
  username: PropTypes.string,
};

export default ChatHeader;
