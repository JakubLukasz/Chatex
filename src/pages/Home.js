import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import UserElement from '../components/UserElement';
import { db } from '../services/firebase';

const Main = styled.div`
  padding: 0 20px;
  flex: 1;
  background-color: ${({ theme }) => theme.color.background};
  overflow: auto;
`;

const Users = styled.div``;

const Title = styled.h2`
  margin-top: 20px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [chatUsernames, setChatUsernames] = useState([]);
  const [usersLength, setUsersLength] = useState(null);
  const { getUsersSize, getChatUsernames } = useFirestore();
  const { currentUser } = useAuth();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const usersRef = db.collection('users');
    const unsubscribe = usersRef.onSnapshot((snapshot) => {
      const tmp = [];
      if (snapshot.size) {
        getUsersSize().then((resp) => setUsersLength(resp));
        snapshot.forEach((doc) => tmp.push(doc.data()));
        tmp.sort(
          (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)
        );
        setUsers(tmp);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(usersLength, users.length);
    if (usersLength === users.length) setIsLoading(false);
  }, [users, usersLength]);

  useEffect(() => {
    getChatUsernames().then((usernames) => setChatUsernames(usernames));
  }, []);

  const checkChat = (username) => {
    const resp = chatUsernames.includes(username);
    return resp;
  };

  return (
    <Main>
      <SearchBar setSearchPhrase={setSearchPhrase} />
      <Users>
        <Title>Latest Accounts</Title>
        {users &&
          users
            .filter(({ uid }) => uid !== currentUser.uid)
            .filter(({ username }) => !checkChat(username))
            .filter((user) => {
              if (searchPhrase == '') return user;
              else if (
                user.username.toLowerCase().includes(searchPhrase.toLowerCase())
              )
                return user;
            })
            .map((user) => <UserElement key={user.uid} {...user} />)}
      </Users>
    </Main>
  );
};

export default Home;
