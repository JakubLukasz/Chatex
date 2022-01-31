import React from 'react';
import styled from 'styled-components';

import Avatar from '../atoms/Avatar';
import { FaPen } from 'react-icons/fa';
import { IUserObject } from '../../types';
import { devices } from '../../assets/styles/devices';

const OnButtonHover = styled.button`
  opacity: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  color: #ffffff;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 1;
  pointer-events: all;
  transition: opacity 0.2s ease;
`;

const EditIcon = styled(FaPen)`
  font-size: 1.3rem;
  color: ${({ theme }: { theme: any }) => theme.color.darkSecondary};
`;

const Container = styled.div`
  position: relative;
  border-radius: 50%;

  &:hover ${OnButtonHover} {
    opacity: 1;
    pointer-events: all;
  }

  &:hover ${IconContainer} {
    opacity: 0;
    pointer-events: none;
  }
`;

const SAvatar = styled(Avatar)`
  /* width: 300px;
  height: 300px; */

  width: 60vw;
  height: 60vw;

  @media ${devices.tablet} {
    width: 350px;
    height: 350px;
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

interface IProps {
  userData: IUserObject;
  onClick: () => void;
}

const ProfileAvatar: React.FC<IProps> = ({ userData, onClick }) => {
  return (
    <Container>
      <SAvatar src={userData.photoURL} alt={userData.username} />
      <IconContainer>
        <EditIcon />
      </IconContainer>
      <OnButtonHover onClick={onClick}>Change Avatar</OnButtonHover>
    </Container>
  );
};

export default ProfileAvatar;
