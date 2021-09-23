import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h4`
  font-size: 1.5rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin: 3px 0 10px;
`;

const Verify = styled.div``;

const VerifyButton = styled.button`
  background-color: ${({ theme }) => theme.color.primary};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  padding: 7px 15px;
  width: 100%;
  margin: 10px 0;
  border-radius: 7px;
  color: #ffffff;
`;

const Bold = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.color.primary};
`;

const Message = styled.p`
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const VerifyEmail = ({ username, email, setIsVerifyButtonClicked }) => {
  const { verifyEmail } = useAuth();
  const [message, setMessage] = useState('');
  const handleVerify = () => {
    verifyEmail()
      .then(() =>
        setMessage(
          `Verification link has been sent to ${email}, check your email.`
        )
      )
      .catch((error) => setMessage(error.message));
    setIsVerifyButtonClicked(true);
  };

  return (
    <Container>
      <Title>Verify your Email</Title>
      <Verify>
        <Text>
          Hello <Bold>{username}</Bold> click on the button to verify your email
        </Text>
        {message && <Message>{message}</Message>}
        <VerifyButton onClick={handleVerify}>VERIFY</VerifyButton>
      </Verify>
    </Container>
  );
};

VerifyEmail.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  setIsVerifyButtonClicked: PropTypes.func,
};

export default VerifyEmail;
