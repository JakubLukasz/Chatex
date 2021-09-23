import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import ChatElement from '../components/ChatElement';
import { useLoading } from '../hooks/useLoading';
import NoMessages from '../components/NoMessages';
import { useFirestore } from '../hooks/useFirestore';

const Main = styled.div`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.background};
  flex: 1;
  overflow: auto;
`;

const Title = styled.h2`
  margin-top: 20px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Messages = () => {
  const { currentUser } = useAuth();
  const [searchPhrase, setSearchPhrase] = useState('');
  const [chats, setChats] = useState([]);
  const [chatSize, setChatSize] = useState(null);
  const { setIsLoading } = useLoading();
  const { getChatSize } = useFirestore();

  useEffect(() => {
    getChatSize().then((size) => setChatSize(size));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const chatRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('chats');
    const unsubscribe = chatRef.onSnapshot((snapshot) => {
      const tmp = [];
      if (snapshot.size) {
        snapshot.forEach((doc) => tmp.push(doc.data()));
        tmp.sort(
          (a, b) =>
            new Date(b.messages[0].sendDateTime) -
            new Date(a.messages[0].sendDateTime)
        );
        setChats(tmp);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatSize == chats.length) setIsLoading(false);
  }, [chats]);

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
