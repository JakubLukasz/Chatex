import React from 'react';
import styled from 'styled-components';
import DefaultUserIcon from '../assets/images/defaultUserIcon.svg';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: ${({ send }) => (send ? 'row-reverse' : 'row')};
  margin: 3px 0;
`;

const Picture = styled.img`
  display: ${({ send }) => (send ? 'none' : 'block')};
  border-radius: 50%;
  object-fit: cover;
  width: 3rem;
  height: 3rem;
  align-self: flex-end;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Text = styled.p`
  font-size: 1.3rem;
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 30px;
  background-color: ${({ theme, send }) =>
    send ? theme.color.primary : '#ffffff'};
  color: ${({ send }) => (send ? '#ffffff' : '#000000')};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  max-width: 70%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Message = ({ send, message, photoURL }) => {
  return (
    <Container send={send}>
      <Picture src={photoURL ? photoURL : DefaultUserIcon} send={send} />
      <Text send={send}>{message}</Text>
    </Container>
  );
};

Message.propTypes = {
  send: PropTypes.bool,
  message: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
