import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import { Link } from 'react-router-dom';
import NoMessagesIcon from '../assets/images/noMessagesIcon.svg';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const NoMessageTitle = styled.h2`
  font-size: 2rem;
  align-self: center;
`;

const NoMessage = styled(Icon)`
  align-self: center;
  width: 10rem;
  margin: 30px 0 20px;
  height: 10rem;
`;

const Info = styled.p`
  font-size: 1.4rem;
  margin: 10px 0 20px;
  padding: 0 10px;
  text-align: center;
`;

const ActionButton = styled(Link)`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  padding: 1rem 1.5rem;
  align-self: center;
  border-radius: 7px;
`;

const NoMessages = () => {
  return (
    <InfoContainer>
      <NoMessage src={NoMessagesIcon} />
      <NoMessageTitle>No chats</NoMessageTitle>
      <Info>
        You are not chatting with anyone, go to the browse tab and search for
        new people to chat with
      </Info>
      <ActionButton to="/browse">LET&apos;S GO CHATTING!</ActionButton>
    </InfoContainer>
  );
};

export default NoMessages;
