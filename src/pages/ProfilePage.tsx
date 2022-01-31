import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useFirestore } from '../hooks/useFirestore';
import { IUserObject } from '../types';
import HeaderView from '../views/HeaderView';
import { devices } from '../assets/styles/devices';
import { db } from '../services/firebase';
import dayjs from 'dayjs';
import { useAuth } from '../hooks/useAuth';
import InfoPopup from '../components/atoms/InfoPopup';
import SkeletonHeader from '../components/skeletons/SkeletonHeader';
import ProfileDisplay from '../components/organisms/ProfileDisplay';

const Container = styled.div`
  height: var(--app-height);
`;

const Main = styled.main`
  padding: 0 20px;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;

  @media ${devices.laptop} {
    flex-direction: row;
  }
`;

const SProfileDisplay = styled(ProfileDisplay)`
  @media ${devices.laptop} {
    flex: 1;
  }
`;

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<IUserObject | null>(null);
  const [info, setInfo] = useState(null);

  const { changePhoto } = useFirestore();

  const { currentUser } = useAuth();

  const inputFileRef = useRef<HTMLInputElement>();

  const fileTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const isFileValid = (file: File) => {
    if (file.size > 500000) {
      setInfo({
        isError: true,
        message: 'Selected file is too big (max 500KB)',
      });
      return false;
    }
    if (!fileTypes.includes(file.type)) {
      setInfo({ isError: true, message: 'Selected file must be an image' });
      return false;
    }
    return true;
  };

  const handleChangePhoto = async () => {
    const file = inputFileRef.current.files[0];
    if (isFileValid(file)) {
      await changePhoto(userData, file);
      setInfo({ isError: true, message: 'Profile picture has been updated' });
    }
  };

  const handleFileInput = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    const ref = db.collection('users').doc(currentUser.uid);
    const unsubscribe = ref.onSnapshot((snapshot) => {
      if (snapshot.data()) {
        const { username, photoURL, uid, createdDateTime } = snapshot.data();
        setUserData({ username, photoURL, uid, createdDateTime });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (info)
      setTimeout(() => {
        setInfo(null);
      }, 3000);
  }, [info, setInfo]);

  return (
    <Container>
      {!userData && <SkeletonHeader />}
      {userData && <HeaderView userData={userData} />}
      <Main>
        {info && <InfoPopup isError={info.isError} message={info.message} />}
        {userData && (
          <SProfileDisplay
            userData={userData}
            createdDate={dayjs(userData.createdDateTime).format('DD.MM.YYYY')}
            avatarClick={handleFileInput}
          />
        )}
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChangePhoto}
        />
      </Main>
    </Container>
  );
};

export default Profile;
