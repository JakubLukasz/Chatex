import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import Providers from '../components/Providers';
import { useForm } from 'react-hook-form';

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ImgSection = styled.div`
  display: none;
  background-color: ${({ theme }) => theme.color.primary};
  flex: 3;
  height: 100%;

  @media ${devices.tabletVerL} {
    display: block;
    flex: 2;
  }
  @media ${devices.tabletL} {
    display: block;
  }
  @media ${devices.laptop} {
    flex: 3;
  }
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
  margin: 20px 0 40px 0;
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
  margin: 20px 0 10px;
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
  margin: 20px 0 0;
  width: 50%;
  align-self: center;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const StyledProviders = styled(Providers)`
  margin: 20px 0 0;
`;

const Signin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const Error = styled.span`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: #ff0033;
    margin: 10px 0 0;
  `;

  return (
    <Container>
      <ImgSection></ImgSection>
      <FormSection>
        <Main>
          <Title>Chatex</Title>
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
            <SubmitButton type="submit">Sign in</SubmitButton>
            <AccountLink to="/signup">Create an Account</AccountLink>
          </Form>
          <StyledProviders />
        </Main>
      </FormSection>
    </Container>
  );
};
export default Signin;
