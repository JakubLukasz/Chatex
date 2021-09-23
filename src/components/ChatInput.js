import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useFirestore } from '../hooks/useFirestore';
import { devices } from '../assets/styles/devices';
import { useHistory } from 'react-router-dom';

const Container = styled.form`
  display: flex;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media ${devices.tablet} {
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }
`;

const MessageInput = styled.input`
  flex: 1;
  font-size: 1.3rem;
  padding: 17px 0 20px 17px;
  border: none;
  outline: none;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;
const MessageButton = styled.button`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  padding-right: 20px;
`;

const ChatInput = ({ className, partnerData, userData }) => {
  const { sendMessage } = useFirestore();
  const inputRef = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = inputRef.current.value;
    if (message !== '') await sendMessage(message, partnerData, userData);
    inputRef.current.value = '';
    window.scrollTo(0, document.body.scrollHeight);
    history.push('/');
  };

  return (
    <Container className={className} onSubmit={handleSubmit}>
      <MessageInput
        ref={inputRef}
        type="text"
        placeholder="Type..."
        spellcheck="false"
      />
      <MessageButton>Send</MessageButton>
    </Container>
  );
};

ChatInput.propTypes = {
  className: PropTypes.string,
  partnerData: PropTypes.object,
  userData: PropTypes.object,
};

export default ChatInput;
