import React, { useState } from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';

import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Alert from '../components/atoms/Alert';

import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Logo from '../components/atoms/Logo';

const Container = styled.main`
  display: flex;
  width: 100vw;
  height: var(--app-height);
`;

const Heading = styled.h1`
  font-size: 3.6rem;
  margin-bottom: 15px;
`;

const Test = styled.div`
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.lightSecondary};
  margin-bottom: 50px;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 0px 30px;

  @media ${devices.laptop} {
    width: 50%;
  }
`;

const GraphicContainer = styled.div`
  display: none;
  background-color: ${({ theme }) => theme.color.primary};

  @media ${devices.laptop} {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SignupLinkText = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color.secondary};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
`;

const SignupLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
`;

const SButton = styled(Button)`
  margin-top: 20px;
`;

const SLogo = styled(Logo)`
  width: 50%;

  & svg path {
    fill: #ffffff;
  }
`;

const ResetPage: React.FC = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { resetPassword } = useAuth();

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      setError('');
      setMessage('');
      setIsLoading(true);
      await resetPassword(email);
      setMessage('Check your email');
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  });

  return (
    <Container>
      <FormContainer>
        <Test>
          <Heading>Reset Password</Heading>
          <Description>Welcome back on Chatex.</Description>
          <Content>
            {error && <Alert message={error} error />}
            {message && <Alert message={message} />}
            <Form onSubmit={onSubmit}>
              <Input
                name="email"
                register={register}
                errors={errors.email}
                pattern={{
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }}
              />
              <SButton label="Reset" disabled={isLoading} submit />
            </Form>
            <SignupLinkText>
              <SignupLink to="/login">Login</SignupLink> with your account
            </SignupLinkText>
          </Content>
        </Test>
      </FormContainer>
      <GraphicContainer>
        <SLogo />
      </GraphicContainer>
    </Container>
  );
};
export default ResetPage;
