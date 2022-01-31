import React from 'react';
import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import { IUserObject } from '../../types';

import ProfileAvatar from '../molecules/ProfileAvatar';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media ${devices.laptop} {
    flex-direction: row;
    justify-content: center;
  }
`;

const Name = styled.p`
  font-size: 4rem;
  margin-top: 20px;
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
`;

const Date = styled.p`
  font-size: 1.3rem;
  text-transform: capitalize;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.color.secondary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${devices.laptop} {
    align-items: flex-start;
    margin-left: 30px;
  }
`;

interface IProps {
  className?: string;
  userData: IUserObject;
  createdDate: string;
  avatarClick: () => void;
}

const ProfileDisplay: React.FC<IProps> = ({
  className,
  userData,
  createdDate,
  avatarClick,
}) => {
  return (
    <Container className={className}>
      <ProfileAvatar onClick={avatarClick} userData={userData} />
      <Content>
        <Name>{userData.username}</Name>
        <Date>On Chatex since: {createdDate}</Date>
      </Content>
    </Container>
  );
};

export default ProfileDisplay;
