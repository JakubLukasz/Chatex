import React, { useEffect, useState } from 'react';
import { IUserObject, ICurrentChat, IChat } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import SkeletonUserButton from '../components/skeletons/SkeletonUserButton';
import ChatButton from '../components/molecules/ChatButton';
import styled from 'styled-components';
import { db } from '../services/firebase';
import NoDataFound from '../components/atoms/NoDataFound';

const Container = styled.div`
  overflow: auto;
  margin-bottom: 65px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.secondary};
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.darkSecondary};
  }
`;

interface IProps {
  currentChatId: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<ICurrentChat>>;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
  userData: IUserObject;
  phrase: string;
}

const ChatsList: React.FC<IProps> = ({
  currentChatId,
  setCurrentChat,
  setCurrentSection,
  userData,
  phrase,
}) => {
  const [chats, setChats] = useState(null);
  const [isVisitedFirstTime, setIsVisitedFirstTime] = useState(true);

  const { searchChats, getDataFromCollection } = useFirestore();

  const isDeviceMobile = () => window.innerWidth <= 768;

  const getChats = async (userData) => {
    const ref = db
      .collection('chats')
      .where('users', 'array-contains', userData)
      .orderBy('lastMessage.sendDateTime', 'desc');
    const data = await getDataFromCollection(ref);
    const chats = data.filter((chat) => chat.lastMessage !== null);
    return chats;
  };

  useEffect(() => {
    const ref = db
      .collection('chats')
      .where('users', 'array-contains', userData)
      .orderBy('lastMessage.sendDateTime', 'desc');
    const unsubscribe = ref.onSnapshot((snapshot) => {
      const tmp = [];
      snapshot.forEach((doc) => tmp.push(doc.data() as IChat));
      setChats(tmp.filter((chat) => chat.lastMessage !== null));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chats && isVisitedFirstTime && !isDeviceMobile()) {
      const { username, photoURL } = chats[0].users.find(
        ({ username }) => username !== userData.username
      );
      const { id, isChatAvailable } = chats[0];
      setCurrentChat({
        username,
        photoURL,
        id,
        isChatAvailable,
      });
      setIsVisitedFirstTime(false);
    }
  }, [chats]);

  useEffect(() => {
    if (phrase === '') getChats(userData).then((data) => setChats(data));
    else searchChats(userData, phrase).then((data) => setChats(data));
  }, [phrase]);

  return (
    <Container>
      {!chats &&
        [1, 2, 3, 4, 5, 6, 7].map((n) => <SkeletonUserButton key={n} />)}
      {chats &&
        chats.map(({ id, users, lastMessage, isChatAvailable }) => {
          const { username, photoURL } = users.find(
            ({ username }) => username !== userData.username
          );
          return (
            <ChatButton
              key={id}
              onClick={() =>
                setCurrentChat({
                  username,
                  photoURL,
                  id,
                  isChatAvailable,
                })
              }
              username={username}
              photoURL={photoURL}
              lastMessage={lastMessage}
              isCurrent={currentChatId === id}
              isSend={lastMessage.sendBy === userData.username}
            />
          );
        })}
      {chats && chats.length === 0 && (
        <NoDataFound
          text="No chat found, go to the users tab to start chatting"
          callback={() => setCurrentSection('Users')}
        />
      )}
    </Container>
  );
};

export default ChatsList;
