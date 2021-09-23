import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import MessageIcon from '../assets/images/messageIcon.svg';
import ProfileIcon from '../assets/images/profileIcon.svg';
import BrowseIcon from '../assets/images/browseIcon.svg';
import LogOutIcon from '../assets/images/logOutIcon.svg';
import { useAuth } from '../hooks/useAuth';
import { devices } from '../assets/styles/devices';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  z-index: 9997;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px -1px 4px;

  @media ${devices.tablet} {
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }
`;

const LogOutButton = styled.button`
  padding: 15px 10px;
`;

const StyledIcon = styled(Icon)`
  width: auto;
  height: 2.3rem;
  fill: #bdbdbd;
`;

const StyledNavLink = styled(NavLink)`
  padding: 15px 10px;

  &.open svg {
    fill: #292929;
  }
`;

const AppNav = () => {
  const { logOut } = useAuth();
  const handleLogOut = () => logOut();

  return (
    <Navigation>
      <StyledNavLink exact to="/" activeClassName="open">
        <StyledIcon src={MessageIcon} />
      </StyledNavLink>
      <StyledNavLink to="/browse" activeClassName="open">
        <StyledIcon src={BrowseIcon} />
      </StyledNavLink>
      <StyledNavLink to="/profile" activeClassName="open">
        <StyledIcon src={ProfileIcon} />
      </StyledNavLink>
      <LogOutButton onClick={handleLogOut}>
        <StyledIcon src={LogOutIcon} />
      </LogOutButton>
    </Navigation>
  );
};

export default AppNav;
