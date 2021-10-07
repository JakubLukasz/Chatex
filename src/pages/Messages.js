import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import ChatElement from '../components/ChatElement';
import NoMessages from '../components/NoMessages';
import { useFirestore } from '../hooks/useFirestore';
import LoadingScreen from '../components/LoadingScreen';

const Main = styled.div`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.background};
  flex: 1;
  overflow: auto;
  position: relative;
`;

const Title = styled.h2`
  margin-top: 20px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Messages = () => {
  const { currentUser } = useAuth();
  const [searchPhrase, setSearchPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatLength, setChatLength] = useState(null);
  const { getChatSize } = useFirestore();

  useEffect(() => {
    setIsLoading(true);
    const chatRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('chats');
    const unsubscribe = chatRef.onSnapshot((snapshot) => {
      const tmp = [];
      getChatSize().then((resp) => setChatLength(resp));
      snapshot.forEach((doc) => tmp.push(doc.data()));
      tmp.sort(
        (a, b) =>
          new Date(b.messages[0].sendDateTime) -
          new Date(a.messages[0].sendDateTime)
      );
      setChats(tmp);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatLength === chats.length) setIsLoading(false);
  }, [chats, chatLength]);

  if (isLoading)
    return (
      <Main>
        <LoadingScreen />
      </Main>
    );
  else
    return (
      <Main>
        {chats.length !== 0 && <SearchBar setSearchPhrase={setSearchPhrase} />}
        <Title>Chats</Title>
        {chats &&
          chats
            .filter((chat) => chat.messages.length !== 0)
            .filter((chat) => {
              if (searchPhrase == '') return chat;
              else if (
                chat.username.toLowerCase().includes(searchPhrase.toLowerCase())
              )
                return chat;
            })
            .map((chat) => <ChatElement key={chat.id} {...chat} />)}
        {chats.length === 0 && <NoMessages />}
      </Main>
    );
};

export default Messages;
