import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import styled from 'styled-components';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import AppUser from './AppUser';
import { devices } from '../assets/styles/devices';

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 15px 20px;
  z-index: 9997;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media ${devices.tablet} {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
`;

const StyledLogo = styled(Logo)`
  font-size: 3rem;
`;

const AppHeader = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const chatPartnerRef = db.collection('users').doc(currentUser.uid);
    const unsubscribe = chatPartnerRef.onSnapshot((doc) =>
      setUserData(doc.data())
    );
    return () => unsubscribe();
  }, []);

  return (
    <Header>
      <StyledLogo />
      {userData && <AppUser {...userData} />}
    </Header>
  );
};

export default AppHeader;
