import React from 'react';
import Avatar from '../atoms/Avatar';
import styled from 'styled-components';
import { IMessage } from '../../types';
import dayjs from 'dayjs';

const UserButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: ${({ isCurrent }: { isCurrent: boolean }) =>
    isCurrent ? '#e3e3e3' : '#f1f1f1'};
  border-radius: 7px;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(95%);
  }
`;

const Info = styled.div`
  margin-left: 15px;
  text-align: left;
  max-width: calc(80% - 4.5rem);
`;

const SAvatar = styled(Avatar)`
  width: 4.5rem;
  height: 4.5rem;
`;

const Username = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const ClickInfo = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
`;

const Bold = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.primary};
`;

const DateContainer = styled.div`
  text-align: right;
`;

const SendDate = styled.p`
  font-weight: 400;
  font-size: 1.3rem;
`;

const SendTime = styled.p`
  font-weight: 500;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`;

interface IProps {
  username: string;
  photoURL: string;
  onClick: () => void;
  lastMessage: IMessage;
  isSend: boolean;
  isCurrent: boolean;
}

const ChatButton: React.FC<IProps> = ({
  onClick,
  photoURL,
  username,
  isSend,
  lastMessage,
  isCurrent,
}) => {
  return (
    <UserButton onClick={onClick} isCurrent={isCurrent}>
      <Main>
        <SAvatar src={photoURL} alt={username} />
        <Info>
          <Username>{username}</Username>
          <ClickInfo>
            {isSend ? (
              <>
                <Bold>Send: </Bold>
                {lastMessage.value}
              </>
            ) : (
              lastMessage.value
            )}
          </ClickInfo>
        </Info>
      </Main>
      <DateContainer>
        <SendDate>
          {dayjs(lastMessage.sendDateTime).format('DD.MM.YYYY')}
        </SendDate>
        <SendTime>{lastMessage.sendTime}</SendTime>
      </DateContainer>
    </UserButton>
  );
};

export default ChatButton;
