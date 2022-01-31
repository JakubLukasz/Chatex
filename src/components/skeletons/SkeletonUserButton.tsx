import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const Avatar = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 15px;
`;

const Info = styled.div`
  width:100%:
  height:30px;
`;

const Username = styled.div`
  background-color: #ddd;
  width: 140px;
  height: 15px;
  border-radius: 3px;
  margin-bottom: 10px;
`;

const ClickInfo = styled.div`
  background-color: #ddd;
  width: 90px;
  height: 15px;
  border-radius: 3px;
`;

const SkeletonUserButton = () => {
  return (
    <Container>
      <Avatar />
      <Info>
        <Username />
        <ClickInfo />
      </Info>
    </Container>
  );
};

export default SkeletonUserButton;
