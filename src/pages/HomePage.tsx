import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';

import ChatsList from '../views/ChatsList';
import UsersList from '../views/UsersList';
import SwitchSections from '../components/molecules/SwitchSections';
import HeaderView from '../views/HeaderView';
import ChatView from '../views/ChatView';
import SkeletonHeader from '../components/skeletons/SkeletonHeader';
import { AiOutlineSearch } from 'react-icons/ai';

import { useFirestore } from '../hooks/useFirestore';
import { ICurrentChat, IUserObject } from '../types';

const Container = styled.div`
  height: var(--app-height);
`;

const Main = styled.div`
  height: calc(100% - 70px);
  display: flex;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const UsersSection = styled.div`
  background-color: #f1f1f1;
  padding: 0 20px;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  @media ${devices.laptop} {
    width: 500px;
  }
`;

const SSwitchSections = styled(SwitchSections)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin: 20px 0;
  padding: 0 10px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Input = styled.input`
  font-size: 1.3rem;
  flex: 1;
  padding: 10px 0;
  border: none;
  outline: none;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const SearchIcon = styled(AiOutlineSearch)`
  font-size: 1.7rem;
  margin: 0;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 0 0;
  padding: 5px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(95%);
  }
`;

const HomePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('Chats');
  const [phrase, setPhrase] = useState('');
  const [userData, setUserData] = useState<IUserObject | null>(null);
  const [currentChat, setCurrentChat] = useState<ICurrentChat | null>(null);
  const [searchbarValue, setSearchbarValue] = useState('');

  const { getUserData } = useFirestore();

  const inputRef = useRef<HTMLInputElement>();

  const handleSearchbarSubmit = (e) => {
    e.preventDefault();
    setPhrase(inputRef.current.value);
  };

  const handleOnChangeSearchbar = () => {
    if (inputRef.current.value === '') setPhrase('');
    setSearchbarValue(inputRef.current.value);
  };

  useEffect(() => {
    getUserData().then(({ username, photoURL }) =>
      setUserData({ username, photoURL })
    );
  }, []);

  return (
    <Container>
      {!userData && <SkeletonHeader />}
      {userData && <HeaderView userData={userData} />}
      <Main>
        <UsersSection>
          <Form onSubmit={handleSearchbarSubmit}>
            <SearchButton type="submit">
              <SearchIcon />
            </SearchButton>
            <Input
              ref={inputRef}
              onChange={handleOnChangeSearchbar}
              value={searchbarValue}
              placeholder="Search"
              type="text"
            />
          </Form>
          <Title>
            {currentSection === 'Chats' ? 'Chats' : 'Latest Accounts'}
          </Title>
          {userData && currentSection === 'Chats' && (
            <ChatsList
              phrase={phrase}
              currentChatId={currentChat && currentChat.id}
              setCurrentChat={setCurrentChat}
              userData={userData}
              setCurrentSection={setCurrentSection}
            />
          )}
          {userData && currentSection === 'Users' && (
            <UsersList
              phrase={phrase}
              setCurrentChat={setCurrentChat}
              userData={userData}
            />
          )}
          <SSwitchSections setSection={setCurrentSection} />
        </UsersSection>
        {userData && currentChat && (
          <ChatView
            userData={userData}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            setCurrentSection={setCurrentSection}
          />
        )}
      </Main>
    </Container>
  );
};

export default HomePage;
