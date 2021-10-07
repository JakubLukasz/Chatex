import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingIcon = styled.div`
  border: 3px solid #dedede;
  border-top: 3px solid ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
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
      <LoadingIcon />
    </Loading>
  );
};

export default LoadingScreen;
