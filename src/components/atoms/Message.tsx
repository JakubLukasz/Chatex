import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  align-items: ${({ isSend }: { isSend: boolean }) =>
    isSend ? 'flex-end' : 'flex-start'};
  max-width: 100%;
`;

const Text = styled.p`
  font-size: 1.5rem;
  color: ${({ isSend, theme }: { isSend: boolean; theme: any }) =>
    isSend ? '#ffffff' : theme.color.secondary};
  font-weight: 500;
  max-height: 70%;
  word-wrap: break-word;
`;

const SendTime = styled.p`
  display: none;
  font-weight: 600;
  color: ${({ isSend, theme }: { isSend: boolean; theme: any }) =>
    isSend ? theme.color.lightSecondary : theme.color.lightSecondary};
`;

const DeleteIcon = styled(MdDelete)`
  display: none;
  color: ${({ theme }: { theme: any }) => theme.color.lightSecondary};
  font-size: 2rem;
  padding: 0;
`;

const MessageBox = styled.div`
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px 20px;
  border-radius: ${({ isSend }) =>
    isSend ? '30px 30px 10px 30px' : '30px 30px 30px 10px'};
  background-color: ${({ theme, isSend }: { theme: any; isSend: boolean }) =>
    isSend ? theme.color.primary : '#e6e6e6'};
  /* margin: ${({ isSend }) => (isSend ? '0 0 0 15px' : '0 15px 0 0')}; */
  max-width: 70%;

  &:hover ${SendTime} {
    display: block;
  }

  &:hover ${DeleteIcon} {
    display: block;
  }
`;

const Options = styled.div`
  padding: 0 5px;
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  flex-direction: ${({ isSend }) => (isSend ? 'row-reverse' : 'row')};
  left: ${({ isSend }: { isSend: boolean }) => (isSend ? '0' : '100%')};
  transform: ${({ isSend }) =>
    isSend ? 'translate(-100%,-50%)' : 'translate(0,-50%)'};
`;

const DeleteButton = styled.button`
  display: ${({ isSend }: { isSend: boolean }) => (isSend ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

interface IProps {
  value: string;
  sendTime: string;
  isSend: boolean;
  onDelete: () => void;
}

const Message: React.FC<IProps> = ({ value, sendTime, isSend, onDelete }) => {
  return (
    <Container isSend={isSend}>
      <MessageBox isSend={isSend}>
        <Text isSend={isSend}>{value}</Text>
        <Options isSend={isSend}>
          <DeleteButton isSend={isSend} onClick={onDelete}>
            <DeleteIcon />
          </DeleteButton>
          <SendTime isSend={isSend}>{sendTime}</SendTime>
        </Options>
      </MessageBox>
    </Container>
  );
};

export default Message;
