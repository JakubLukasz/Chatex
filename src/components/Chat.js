import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { useChat } from '../hooks/useChat';
import Message from './Message';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { useFirestore } from '../hooks/useFirestore';
import { devices } from '../assets/styles/devices';

const Container = styled.div`
  width: 100vw;
  height: var(--app-height);
  background-color: ${({ theme }) => theme.color.background};
  z-index: 9998;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;

  @media ${devices.tablet} {
    width: 50vw;
    right: 0;
    left: unset;
  }

  @media ${devices.laptop} {
    width: 70vw;
  }
`;

const Main = styled.main`
  padding: 0 20px 10px;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  flex: 1;
`;

const Chat = ({ isChatOpen }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [partnerPhoto, setPartnerPhoto] = useState('');
  const { chatInfo } = useChat();
  const { currentUser } = useAuth();
  const { getUserData } = useFirestore();

  const chatContainerRef = useRef(null);

  const scrollToBottom = (container) => {
    container.scrollTop = container.scrollHeight - container.clientHeight;
  };

  useEffect(() => {
    if (isChatOpen) document.body.style.overflow = 'hidden';

    return () => (document.body.style.overflow = 'unset');
  }, []);

  useEffect(() => {
    getUserData().then(({ username, uid, photoURL }) =>
      setUserData({ username, uid, photoURL })
    );
  }, [chatInfo.uid]);

  useEffect(() => {
    const chatPartnerRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('chats')
      .doc(chatInfo.uid);
    const unsubscribe = chatPartnerRef.onSnapshot((doc) => {
      if (doc.data()) {
        const { messages, photoURL } = doc.data();
        setChatMessages(messages);
        setPartnerPhoto(photoURL);
        scrollToBottom(chatContainerRef.current);
      } else {
        setChatMessages([]);
      }
    });
    return () => unsubscribe();
  }, [chatInfo.uid]);

  return (
    <Container>
      <ChatHeader {...chatInfo} />
      <Main ref={chatContainerRef}>
        {chatMessages &&
          chatMessages.map(({ messageID, message, send }) => (
            <Message
              key={messageID}
              send={send}
              message={message}
              photoURL={partnerPhoto}
            />
          ))}
      </Main>
      <ChatInput partnerData={chatInfo} userData={userData} />
    </Container>
  );
};

Chat.propTypes = {
  isChatOpen: PropTypes.bool,
};

export default Chat;
