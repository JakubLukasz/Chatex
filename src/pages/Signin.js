import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Providers from '../components/Providers';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import FormMessage from '../components/FormMessage';
import Logo from '../components/Logo';
import Preview from '../components/Preview';

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: var(--app-height);
`;

const FormSection = styled.div`
  flex: 2;
  padding: 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledLogo = styled(Logo)`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  font-size: 1.4rem;
  padding: 10px;
  border: none;
  border: 2px solid ${({ theme }) => theme.color.lightSecondary};
  border-radius: 7px;
  color: ${({ theme }) => theme.color.secondary};
  outline-color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};

  &:focus {
    color: ${({ theme }) => theme.color.primary};
  }

  &::selection {
    background-color: ${({ theme }) => theme.color.primary};
    color: #ffffff;
  }
`;

const InputLabel = styled.label`
  font-size: 1.3rem;
  margin: 10px 0 5px;
  color: ${({ theme }) => theme.color.secondary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.secondary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 1.3rem;
`;

const ResetLink = styled(StyledLink)`
  align-self: flex-end;
  margin: 5px 0 10px;
`;

const AccountLink = styled(StyledLink)`
  color: ${({ theme }) => theme.color.primary};
  align-self: center;
  margin: 10px 0 15px;
`;

const SubmitButton = styled.button`
  font-size: 1.6rem;
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 7px;
  margin-top: 20px;
  width: 50%;
  align-self: center;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const StyledProviders = styled(Providers)`
  margin: 20px 0 0;
`;

const Error = styled.span`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ff0033;
  margin: 5px 0 0;
`;

const Signin = () => {
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    // setError,
  } = useForm();
  const { signIn } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Preview />
      <FormSection>
        <Main>
          <StyledLogo />
          {formError && <FormMessage error message={formError} />}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel>Email</InputLabel>
            <InputField
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="text"
              name="email"
            />
            {errors.email && <Error>{errors.email.message}</Error>}
            <InputLabel>Password</InputLabel>
            <InputField
              {...register('password', { required: 'Password is Required' })}
              type="password"
              name="password"
            />
            {errors.password && <Error>{errors.password.message}</Error>}
            <ResetLink to="/reset">Forgot password?</ResetLink>
            <SubmitButton disabled={isLoading} type="submit">
              Sign in
            </SubmitButton>
            <AccountLink to="/signup">Create an Account with email</AccountLink>
          </Form>
          <StyledProviders setFormError={setFormError} />
        </Main>
      </FormSection>
    </Container>
  );
};
export default Signin;
