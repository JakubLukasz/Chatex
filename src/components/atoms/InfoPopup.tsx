import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.5rem;
  padding: 15px 30px;
  background-color: #ffffff;
  border-radius: 7px;
  position: absolute;
  z-index: 1000;
  left: 50%;
  bottom: 100px;
  transform: translate(-50%, 0);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Type = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  color: ${({ isError }: { isError: boolean }) =>
    isError ? '#d32f2f' : '#57d624'};
  margin-bottom: 10px;
`;

const Message = styled.p`
  text-align: center;
`;

interface IProps {
  message: string;
  isError?: boolean;
}

const InfoPopup: React.FC<IProps> = ({ message, isError }) => {
  return (
    <Container>
      <Type isError={isError}>{isError ? 'error' : 'success'}</Type>
      <Message>{message}</Message>
    </Container>
  );
};

export default InfoPopup;
