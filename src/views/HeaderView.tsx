import React, { useState } from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';

import Logo from '../components/atoms/Logo';
import Avatar from '../components/atoms/Avatar';
import SettingsPanel from '../components/atoms/SettingsPanel';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import SettingsButton from '../components/atoms/SettingsButton';
import { IUserObject } from '../types';

const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 15px 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media ${devices.laptop} {
    box-shadow: none;
  }
`;

const SLogo = styled(Logo)`
  height: 30px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const SAvatar = styled(Avatar)`
  height: 4rem;
  width: 4rem;
  margin: 0 15px;
`;

const Settings = styled.div`
  position: relative;
`;

interface IProps {
  userData: IUserObject;
}

const HeaderView: React.FC<IProps> = ({ userData }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { logOut } = useAuth();
  const history = useHistory();

  return (
    <Container>
      <Link to="/">
        <SLogo />
      </Link>
      <Info>
        <Username>{userData.username}</Username>
        <Link to="/profile">
          <SAvatar src={userData.photoURL} alt={userData.username} />
        </Link>
        <Settings>
          <SettingsButton
            onClick={() => setIsSettingsOpen((state) => !state)}
          />

          {isSettingsOpen && (
            <SettingsPanel
              homeClick={() => history.push('/')}
              profileClick={() => history.push('/profile')}
              logoutClick={() => logOut()}
            />
          )}
        </Settings>
      </Info>
    </Container>
  );
};

export default HeaderView;
