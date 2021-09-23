import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';

const Title = styled.h4`
  font-size: 1.5rem;
`;

const DeleteButton = styled.button`
  background-color: #cc0000;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  padding: 7px 15px;
  width: 100%;
  margin: 10px 0;
  border-radius: 7px;
  color: #ffffff;
  text-transform: uppercase;
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin: 3px 0 10px;
`;

const Bold = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: #cc0000;
  text-transform: uppercase;
`;

const DeleteUser = () => {
  const { clearUser } = useFirestore();
  const { deleteUser } = useAuth();

  const handleDelete = async () => {
    await clearUser();
    await deleteUser();
  };

  return (
    <>
      <Title>Delete your Account</Title>
      <Text>
        If you do not want to use this application anymore, delete your account,
        <Bold> remember these changes cannot be undone</Bold>
      </Text>
      <DeleteButton onClick={handleDelete}>delete account</DeleteButton>
    </>
  );
};

export default DeleteUser;
