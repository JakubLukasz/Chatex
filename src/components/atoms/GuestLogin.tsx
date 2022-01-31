import React from 'react';
import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.color.lightSecondary};
  font-weight: 600;
  padding: 10px 0;
  background-color: #ffffff;
  transition: filter 0.3s ease;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    filter: brightness(95%);
  }
`;

const Icon = styled(BsFillPersonFill)`
  margin-right: 10px;
  font-size: 3rem;
  fill: ${({ theme }) => theme.color.secondary};
`;

interface IProps {
  onClick?: any;
}

const GuestLogin: React.FC<IProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon />
      Login as guest
    </Button>
  );
};

export default GuestLogin;
