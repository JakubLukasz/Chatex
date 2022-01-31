import React, { useState } from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';

import Input from '../components/atoms/Input';
import GuestLogin from '../components/atoms/GuestLogin';
import Button from '../components/atoms/Button';
import Alert from '../components/atoms/Alert';
import Logo from '../components/atoms/Logo';

import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';

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

const Spacing = styled.p`
  position: relative;
  font-size: 1.3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.lightSecondary};
  text-align: center;
  margin: 40px 0 20px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.lightSecondary};
    left: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.lightSecondary};
    right: 0;
  }
`;

const ResetLink = styled(Link)`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color.secondary};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 20px;
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
  font-weight: 600;
  margin-left: 5px;
`;

const SLogo = styled(Logo)`
  width: 50%;

  & svg path {
    fill: #ffffff;
  }
`;

const LoginPage: React.FC = () => {
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { signIn, signUp } = useAuth();
  const { createUserData, getRandomUsername, getRandomId } = useFirestore();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleGuestLogin = async () => {
    const username = await getRandomUsername();
    const email = `${username}@gmail.com`;
    const password = getRandomId(10);
    try {
      const { user } = await signUp(email, password);
      await createUserData(username, user.email, user.uid, user.photoURL);
      history.push('/');
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
      history.push('/');
    } catch (error: any) {
      setFormError(error.message);
    }
    setIsLoading(false);
  });

  return (
    <Container>
      <FormContainer>
        <Test>
          <Heading>Login</Heading>
          <Description>Welcome back on Chatex.</Description>
          <Content>
            <GuestLogin onClick={handleGuestLogin} />
            <Spacing>OR</Spacing>
            {formError && <Alert message={formError} error />}
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
              <Input
                name="password"
                password
                register={register}
                errors={errors.password}
              />
              <ResetLink to="/reset">Forgot password?</ResetLink>
              <Button label="Login" disabled={isLoading} submit />
            </Form>
            <SignupLinkText>
              Don&apos;t have an account?
              <SignupLink to="/signup">Sign up</SignupLink>
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
export default LoginPage;
