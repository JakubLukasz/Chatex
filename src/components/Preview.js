import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import ChatSrc from '../assets/images/chat.svg';
import ChatReverseSrc from '../assets/images/chat-reverse.svg';
import { devices } from '../assets/styles/devices';

const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: none;
  background-color: ${({ theme }) => theme.color.primary};
  flex: 3;
  height: var(--app-height);

  @media ${devices.tabletL} {
    display: flex;
  }
  @media ${devices.laptop} {
    flex: 3;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  width: 20rem;
  height: 20rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #ffffff;
  margin-top: 100px;
  max-width: 90%;
  text-align: center;
`;
const Description = styled.p`
  font-size: 1.6rem;
  text-align: center;
  max-width: 85%;
  color: #ffffff;
  margin-top: 10px;
`;

const LeftIcon = styled(StyledIcon)`
  margin: 40px 30px 0 0;

  ${devices.laptop} {
    color: black;
  }
`;

const RightIcon = styled(StyledIcon)``;

const Preview = ({ className }) => {
  return (
    <Container className={className}>
      <PhotoContainer>
        <LeftIcon src={ChatSrc} />
        <RightIcon src={ChatReverseSrc} />
      </PhotoContainer>
      <Title>Chat with your friends whenever you want!</Title>
      <Description>
        Chatex is an application made by Jakub Łukaszewski that enables
        text-based conversations between people.
      </Description>
    </Container>
  );
};

Preview.propTypes = {
  className: PropTypes.string,
};

export default Preview;
