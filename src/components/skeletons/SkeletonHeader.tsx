import React from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 15px 20px;
`;

const Username = styled.div`
  width: 100px;
  height: 15px;
  background-color: #ddd;
  border-radius: 3px;
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #ddd;
  margin: 0 15px;
`;

const SLogo = styled(Logo)`
  height: 30px;
`;

const Settings = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #ddd;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const SkeletonHeader = () => {
  return (
    <Container>
      <SLogo />
      <Info>
        <Username />
        <Avatar />
        <Settings />
      </Info>
    </Container>
  );
};

export default SkeletonHeader;
