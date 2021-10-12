import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import FormMessage from '../components/FormMessage';
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

const Title = styled.h2`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.font.family.dancingScript};
  color: ${({ theme }) => theme.color.primary};
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
  margin: 40px 0 0;
  width: 50%;
  align-self: center;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const Error = styled.span`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ff0033;
  margin: 10px 0 0;
`;

const Reset = () => {
  const { resetPassword } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setError('');
      setMessage('');
      setIsLoading(true);
      await resetPassword(data.email);
      setMessage('Check your email');
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Preview />
      <FormSection>
        <Main>
          <Title>Chatex</Title>
          {error && <FormMessage error message={error} />}
          {message && <FormMessage message={message} />}
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
            <SubmitButton disabled={isLoading} type="submit">
              Reset
            </SubmitButton>
            <AccountLink to="/signin">Sign in with your account</AccountLink>
          </Form>
        </Main>
      </FormSection>
    </Container>
  );
};
export default Reset;
