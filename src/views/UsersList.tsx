import React, { useState, useEffect } from 'react';
import SkeletonUserButton from '../components/skeletons/SkeletonUserButton';

import UserButton from '../components/molecules/UserButton';
import { useFirestore } from '../hooks/useFirestore';
import { db } from '../services/firebase';
import { IUserObject, ICurrentChat } from '../types';
import styled from 'styled-components';
import { Waypoint } from 'react-waypoint';
import NoDataFound from '../components/atoms/NoDataFound';

interface IProps {
  setCurrentChat: React.Dispatch<React.SetStateAction<ICurrentChat>>;
  userData: IUserObject;
  phrase: string;
}

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
    background: ${({ theme }) => theme.color.lightSecondary};
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.secondary};
  }
`;

const UsersList: React.FC<IProps> = ({ setCurrentChat, userData, phrase }) => {
  const [users, setUsers] = useState<IUserObject[] | null>(null);
  const [usersCursor, setUsersCursor] = useState(null);
  const {
    getChatWithCheck,
    searchUsers,
    getAllChattingUsernames,
    getDataFromCollection,
    getCursor,
  } = useFirestore();

  const getMoreLatestUsers = async (userData: IUserObject) => {
    const usernames = await getAllChattingUsernames(userData);
    const allUsernames = usernames.concat(userData.username);
    const userRef = db
      .collection('users')
      .orderBy('timestamp', 'desc')
      .startAfter(usersCursor)
      .limit(20);
    const data = await getDataFromCollection(userRef);
    const usersFiltered = data.filter(
      ({ username }) => !allUsernames.includes(username)
    );
    const cursor = await getCursor(userRef);
    if (usersFiltered.length !== 0) {
      setUsers(usersFiltered);
      setUsersCursor(cursor);
    }
  };

  const getLatestUsers = async (userData: IUserObject) => {
    setUsersCursor(null);
    const usernames = await getAllChattingUsernames(userData);
    const allUsernames = usernames.concat(userData.username);
    const userRef = db
      .collection('users')
      .orderBy('timestamp', 'desc')
      .limit(20);
    const data = await getDataFromCollection(userRef);
    const usersFiltered = data.filter(
      ({ username }) => !allUsernames.includes(username)
    );
    const cursor = await getCursor(userRef);
    setUsers(usersFiltered);
    setUsersCursor(cursor);
  };

  useEffect(() => {
    getLatestUsers(userData);
  }, []);

  useEffect(() => {
    if (phrase === '') getLatestUsers(userData);
    else searchUsers(userData.username, phrase).then((data) => setUsers(data));
  }, [phrase]);

  const handleUserButttonClick = async (
    userData: IUserObject,
    personData: IUserObject
  ) => {
    const { id, isChatAvailable } = await getChatWithCheck([
      userData,
      personData,
    ]);
    const { username, photoURL } = personData;
    setCurrentChat({
      username,
      photoURL,
      id,
      isChatAvailable,
    });
  };

  return (
    <Container>
      {!users &&
        [1, 2, 3, 4, 5, 6, 7].map((n) => <SkeletonUserButton key={n} />)}
      {users &&
        users.map(({ photoURL, username }) => (
          <UserButton
            onClick={async () =>
              await handleUserButttonClick(userData, { username, photoURL })
            }
            key={username}
            photoURL={photoURL}
            username={username}
          />
        ))}
      {users && <Waypoint onEnter={() => getMoreLatestUsers(userData)} />}
      {users && users.length === 0 && (
        <NoDataFound
          text="
No users found"
        />
      )}
    </Container>
  );
};

export default UsersList;
