import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Message = styled.p`
  text-transform: capitalize;
  color: #d32f2f;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 5px 0 0 10px;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${({ theme, errors }: { theme: any; errors: { message: string } }) =>
    errors ? theme.color.error : theme.color.lightSecondary};
  font-weight: 500;
  text-transform: capitalize;
`;

const InputField = styled.input`
  font-size: 1.3rem;
  padding: 15px;
  border: 1px solid
    ${({ theme, errors }: { theme: any; errors: { message: string } }) =>
      errors ? theme.color.error : theme.color.lightSecondary};
  border-radius: 7px;
  font-weight: 500;
  outline: none;
`;

interface IProps {
  label?: string;
  name: string;
  register: any;
  errors: { message: string };
  password?: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  validate?: (value: string) => string;
}

const Input: React.FC<IProps> = ({
  label,
  name,
  register,
  errors,
  password,
  pattern,
  minLength,
  maxLength,
  validate,
}) => {
  return (
    <Container>
      <Label errors={errors} htmlFor={name}>
        {label ?? name}
      </Label>
      <InputField
        errors={errors}
        type={password ? 'password' : 'text'}
        {...register(name, {
          required: `${label ?? name} is required`,
          pattern,
          minLength,
          maxLength,
          validate,
        })}
      />
      {errors && <Message>{errors.message}</Message>}
    </Container>
  );
};

export default Input;
