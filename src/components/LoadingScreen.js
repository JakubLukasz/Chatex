import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  width: 100vw;
  height: var(--app-height);
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingIcon = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingScreen = () => {
  return (
    <Loading>
      <LoadingIcon></LoadingIcon>
    </Loading>
  );
};

export default LoadingScreen;
