import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';

import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Alert from '../components/atoms/Alert';

import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
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
  margin-bottom: 15px;
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
  font-weight: 600;
  margin-left: 5px;
`;

const SButton = styled(Button)`
  margin-top: 30px;
`;

const SLogo = styled(Logo)`
  width: 50%;

  & svg path {
    fill: #ffffff;
  }
`;

const SignupPage: React.FC = () => {
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const { signUp } = useAuth();
  const history = useHistory();
  const { createUserData, getAllUsernames } = useFirestore();
  const [allUsernames, setAllUsernames] = useState([]);

  useEffect(() => {
    getAllUsernames().then((usernames) => setAllUsernames(usernames));
  }, []);

  const onSubmit = handleSubmit(async ({ username, email, password }) => {
    try {
      setFormError('');
      setIsLoading(true);
      const { user } = await signUp(email, password);
      await createUserData(username, user.email, user.uid, user.photoURL);
      history.push('/');
    } catch (error: any) {
      setFormError(error.message);
    }
    setIsLoading(false);
  });

  const checkUsername = (username) => {
    const isRepeated = allUsernames.includes(username.toLowerCase());
    if (!isRepeated) return username;
    else return false;
  };

  return (
    <Container>
      <FormContainer>
        <Test>
          <Heading>Login</Heading>
          <Description>Welcome back on Chatex.</Description>
          <Content>
            {formError && <Alert message={formError} error />}
            <Form onSubmit={onSubmit}>
              <Input
                name="username"
                register={register}
                errors={errors.username}
                minLength={{
                  value: 5,
                  message: 'Username must have at least 5 characters',
                }}
                maxLength={{
                  value: 15,
                  message: 'Username cannot be longer than 15 characters',
                }}
                validate={(value): any =>
                  value === checkUsername(value) || 'Username already taken'
                }
              />
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
                minLength={{
                  value: 8,
                  message: 'Password must have at least 8 characters',
                }}
              />
              <Input
                name="confirmPassword"
                label="confirm Password"
                password
                register={register}
                errors={errors.confirmPassword}
                validate={(value): any =>
                  value === getValues('password') ||
                  'The passwords do not match'
                }
              />
              <SButton label="Sign up" disabled={isLoading} submit />
            </Form>
            <SignupLinkText>
              Already have an account?
              <SignupLink to="/login">Login</SignupLink>
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
export default SignupPage;
