import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserPhotoSettings from '../components/UserPhotoSettings';
import VerifyEmail from '../components/VerifyEmail';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import DeleteUser from '../components/DeleteUser';

const Main = styled.main`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.background};
  flex: 1;
  overflow: auto;
`;

const UserPhoto = styled(UserPhotoSettings)`
  margin: 20px 0 40px;
`;

const Profile = () => {
  const { currentUser } = useAuth();
  const [reloader, setReloader] = useState(true);
  const [userData, setUserData] = useState({});
  const [isVerifyButtonClicked, setIsVerifyButtonClicked] = useState(false);

  useEffect(() => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const unsubscribe = userRef.onSnapshot((snapshot) =>
      setUserData(snapshot.data())
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isVerifyButtonClicked) {
      const interval = setInterval(async () => {
        setReloader(!reloader);
        try {
          if (currentUser) {
            await currentUser.reload();
          }
        } catch (error) {
          console.log(error);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    if (currentUser.emailVerified) setIsVerifyButtonClicked(false);
  }, [currentUser.emailVerified]);

  return (
    <Main>
      <UserPhoto {...userData} />
      {!currentUser.emailVerified && (
        <VerifyEmail
          {...userData}
          setIsVerifyButtonClicked={setIsVerifyButtonClicked}
        />
      )}
      <DeleteUser />
    </Main>
  );
};

export default Profile;
