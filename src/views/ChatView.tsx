import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';
import { IMessage, IUserObject, ICurrentChat } from '../types';

import Avatar from '../components/atoms/Avatar';
import CloseButton from '../components/atoms/CloseButton';
import SendButton from '../components/atoms/SendButton';
import Message from '../components/atoms/Message';

import { db } from '../services/firebase';

import { useFirestore } from '../hooks/useFirestore';
import DeletedMessage from '../components/atoms/DeletedMessage';
import { Waypoint } from 'react-waypoint';

const Container = styled.div`
  background-color: #ffffff;
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  @media ${devices.laptop} {
    width: calc(100% - 500px);
    position: static;
  }
`;

const Header = styled.header`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  border-top: 4px solid #f1f1f1;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 3px 5px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const SAvatar = styled(Avatar)`
  width: 4.5rem;
  height: 4.5rem;
`;

const Username = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin-left: 15px;
`;

const Content = styled.div`
  overflow: auto;
  padding: 0 20px 10px 20px;
  flex: 1;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.lightPrimary};
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.primary};
  }
`;

const MessageForm = styled.form`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.06) 0px -3px 5px;
`;

const MessageInput = styled.input`
  height: 100%;
  width: 100%;
  padding-left: 15px;
  font-size: 1.5rem;
  font-weight: 500;
  border: none;
  outline: none;
`;

const SSendButton = styled(SendButton)`
  margin: 10px;
`;

const SCloseButton = styled(CloseButton)`
  margin-left: 10px;
  @media ${devices.laptop} {
    display: none;
  }
`;

const Options = styled.div`
  display: flex;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;

const InfoContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoText = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 30px;
  color: ${({ theme }) => theme.color.primary};
`;

interface IProps {
  userData: IUserObject;
  currentChat: ICurrentChat;
  setCurrentChat: React.Dispatch<React.SetStateAction<ICurrentChat | null>>;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

const ChatView: React.FC<IProps> = ({
  userData,
  currentChat,
  setCurrentChat,
  setCurrentSection,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [messagesCursor, setMessagesCursor] = useState(null);

  const messageContainerRef = useRef(null);
  const typeContainerRef = useRef(null);

  const { sendMessage, deleteMessage } = useFirestore();

  const scrollToBottom = (container) => {
    container.scrollTop = container.scrollHeight - container.clientHeight;
  };

  const scrollMoreMessages = (container, prevHeight) => {
    container.scrollTop = container.scrollHeight - prevHeight;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const { username, photoURL } = currentChat;
    const inputMessage = message;
    setMessage('');
    typeContainerRef.current.focus();
    if (inputMessage === '') return;
    await sendMessage(inputMessage, [userData, { username, photoURL }]);
    setCurrentSection('Chats');
  };

  const handleShowMoreMessages = async () => {
    if (messagesCursor) {
      const prevHeight = messageContainerRef.current.scrollHeight;
      const ref = db
        .collection('chats')
        .doc(currentChat.id)
        .collection('messages')
        .orderBy('sendDateTime', 'desc')
        .startAfter(messagesCursor)
        .limit(30);
      const resp = await ref.get();
      const tmp = [];
      resp.forEach((doc) => tmp.push(doc.data()));
      setMessages((messagesSnapshot) => messagesSnapshot.concat(tmp));
      scrollMoreMessages(messageContainerRef.current, prevHeight);
      setMessagesCursor(resp.docs[resp.docs.length - 1]);
    }
  };

  useEffect(() => {
    setMessagesCursor(null);
    const ref = db
      .collection('chats')
      .doc(currentChat.id)
      .collection('messages')
      .orderBy('sendDateTime', 'desc')
      .limit(30);
    const unsubscribe = ref.onSnapshot((snapshot) => {
      const tmp = [];
      snapshot.forEach((doc) => tmp.push(doc.data() as IMessage));
      setMessages(tmp);
      setMessagesCursor(snapshot.docs[snapshot.docs.length - 1]);
      scrollToBottom(messageContainerRef.current);
    });
    return () => unsubscribe();
  }, [currentChat.id]);

  return (
    <Container>
      <Header>
        <Info>
          <SAvatar src={currentChat.photoURL} alt={currentChat.username} />
          <Username>{currentChat.username}</Username>
        </Info>
        <Options>
          <SCloseButton onClick={() => setCurrentChat(null)} />
        </Options>
      </Header>
      <Content ref={messageContainerRef}>
        {messages && <Waypoint onEnter={() => handleShowMoreMessages()} />}
        <MessagesContainer>
          {messages &&
            messages.map(({ isDeleted, id, sendBy, sendTime, value }) =>
              isDeleted ? (
                <DeletedMessage
                  key={id}
                  isSend={sendBy === userData.username}
                />
              ) : (
                <Message
                  key={id}
                  value={value}
                  sendTime={sendTime}
                  isSend={sendBy === userData.username}
                  onDelete={() => deleteMessage(currentChat.id, id)}
                />
              )
            )}
        </MessagesContainer>
        {currentChat.isChatAvailable === false && (
          <InfoContianer>
            <InfoText>Chat niedostępny</InfoText>
          </InfoContianer>
        )}
      </Content>

      {currentChat.isChatAvailable && (
        <MessageForm onSubmit={handleSendMessage}>
          <MessageInput
            ref={typeContainerRef}
            placeholder="Type..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <SSendButton />
        </MessageForm>
      )}
    </Container>
  );
};

export default ChatView;
