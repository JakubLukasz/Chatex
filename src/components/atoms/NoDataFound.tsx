import React from 'react';
import styled from 'styled-components';
import { BsArrowRightShort } from 'react-icons/bs';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
`;

const NoChatsButton = styled.button`
  display: ${({ isCallbackProvided }: { isCallbackProvided: () => void }) =>
    isCallbackProvided ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const NoChatsIcon = styled(BsArrowRightShort)`
  font-size: 2.5rem;
`;

interface IProps {
  text: string;
  callback?: () => void;
}

const NoDataFound: React.FC<IProps> = ({ text, callback }) => {
  return (
    <Container>
      <Text>{text}</Text>
      <NoChatsButton isCallbackProvided={callback} onClick={callback}>
        <NoChatsIcon />
      </NoChatsButton>
    </Container>
  );
};

export default NoDataFound;
