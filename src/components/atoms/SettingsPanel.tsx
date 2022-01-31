import React from 'react';
import styled from 'styled-components';
import { BiLogOut } from 'react-icons/bi';
import { BsPersonFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';

const Container = styled.nav`
  position: absolute;
  top: 120%;
  right: 0;
  z-index: 10;
  display: flex;
  padding: 10px;
  flex-direction: column;
  background-color: #f1f1f1;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Button = styled.button`
  font-size: 1.3rem;
  font-weight: 500;
  word-break: keep-all;
  background-color: #f1f1f1;
  padding: 10px 100px 10px 10px;
  border-radius: 7px;
  /* margin: 10px 0; */
  color: ${({ theme }) => theme.color.secondary};
  display: flex;
  align-items: center;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(95%);
  }
`;

const LogoutIcon = styled(BiLogOut)`
  font-size: 2.5rem;
  transform: rotate(180deg);
`;

const ProfileIcon = styled(BsPersonFill)`
  font-size: 2.5rem;
`;

const HomeIcon = styled(AiFillHome)`
  font-size: 2.5rem;
`;

const Text = styled.p`
  margin-left: 10px;
  font-size: 1.4rem;
  font-weight: 500;
`;

interface IProps {
  homeClick: () => void;
  profileClick: () => void;
  logoutClick: () => void;
}

const SettingsPanel: React.FC<IProps> = ({
  homeClick,
  profileClick,
  logoutClick,
}) => {
  return (
    <Container>
      <Button onClick={homeClick}>
        <HomeIcon />
        <Text>Home</Text>
      </Button>
      <Button onClick={profileClick}>
        <ProfileIcon />
        <Text>Profile</Text>
      </Button>
      <Button onClick={logoutClick}>
        <LogoutIcon />
        <Text>Logout</Text>
      </Button>
    </Container>
  );
};

export default SettingsPanel;
