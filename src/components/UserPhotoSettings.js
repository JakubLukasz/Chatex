import React, { useRef } from 'react';
import styled from 'styled-components';
import DefaultIcon from '../assets/images/defaultUserIcon.svg';
import PropTypes from 'prop-types';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePicture = styled.img`
  border: 4px solid ${({ theme }) => theme.color.primary};
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 50%;
`;

const ChangePictureButton = styled.button`
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 1rem;
  margin-top: 5px;
`;

const Username = styled.p`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-top: 15px;
`;

const Info = styled.p`
  margin-top: 5px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const UserPhotoSettings = ({ className, photoURL, username }) => {
  const inputFileRef = useRef();
  const { changePhoto } = useFirestore();
  const { currentUser } = useAuth();

  const handleFileInput = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = () => {
    const reader = new FileReader();
    const file = inputFileRef.current.files[0];

    reader.addEventListener('load', () => {
      changePhoto(reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className={className}>
      <ProfilePicture src={photoURL ? photoURL : DefaultIcon} />
      <ChangePictureButton onClick={handleFileInput}>
        Change Photo <br />
        (max 750 KB)
      </ChangePictureButton>
      <input
        ref={inputFileRef}
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Username>{username}</Username>
      {currentUser.emailVerified && <Info>Email Verified.</Info>}
    </Container>
  );
};

UserPhotoSettings.propTypes = {
  className: PropTypes.string,
  photoURL: PropTypes.string,
  username: PropTypes.string,
};

export default UserPhotoSettings;
