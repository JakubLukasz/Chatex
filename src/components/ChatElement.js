import React from 'react';
import styled from 'styled-components';
import DefaultUserIcon from '../assets/images/defaultUserIcon.svg';
import PropTypes from 'prop-types';
import { useChat } from '../hooks/useChat';

const User = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  background-color: ${({ uid, cUid }) =>
    uid === cUid ? '#e4e4eb' : 'transparent'};
  border-radius: 7px;
  padding: 10px;
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

const LastMessages = styled.p`
  max-width: 60vw;
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.p`
  margin-left: auto;
  margin-right: 0;
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Bold = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.color.primary};
`;

const ChatElement = ({ username, photoURL, messages, uid }) => {
  const { setIsChatOpen, setChatInfo, chatInfo } = useChat();
  const handleChatOpen = () => {
    setChatInfo({ photoURL, username, uid, messages });
    setIsChatOpen(true);
  };

  const { message, sendTime, send } = messages[0];

  return (
    <User onClick={handleChatOpen} uid={chatInfo.uid} cUid={uid}>
      <Photo src={photoURL ? photoURL : DefaultUserIcon} />
      <UserInfo>
        <Username>{username}</Username>
        <LastMessages>
          {send ? (
            <>
              <Bold>Send: </Bold>
              {message}
            </>
          ) : (
            message
          )}
        </LastMessages>
      </UserInfo>
      <Time>{sendTime}</Time>
    </User>
  );
};

ChatElement.propTypes = {
  username: PropTypes.string,
  photoURL: PropTypes.string,
  messages: PropTypes.array,
  uid: PropTypes.string,
};

export default ChatElement;
