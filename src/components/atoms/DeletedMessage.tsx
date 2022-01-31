import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  align-items: ${({ isSend }: { isSend: boolean }) =>
    isSend ? 'flex-end' : 'flex-start'};
  max-width: 100%;
`;

const MessageBox = styled.div`
  border: 2px solid #f2f2f2;
  padding: 15px;
  border-radius: 15px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
`;

interface IProps {
  isSend: boolean;
}

const DeletedMessage: React.FC<IProps> = ({ isSend }) => {
  return (
    <Container isSend={isSend}>
      <MessageBox>
        <Text>Message has been deleted</Text>
      </MessageBox>
    </Container>
  );
};

export default DeletedMessage;
