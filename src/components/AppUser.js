import React from 'react';
import styled from 'styled-components';
import DefaultUserIcon from '../assets/images/defaultUserIcon.svg';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Photo = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  margin-left: 10px;
  border: 2px solid ${({ theme }) => theme.color.primary};
  object-fit: cover;
`;

const AppUser = ({ photoURL, username }) => {
  return (
    <Container>
      <Text>{username}</Text>
      <Photo src={photoURL ? photoURL : DefaultUserIcon} />
    </Container>
  );
};

AppUser.propTypes = {
  photoURL: PropTypes.string,
  username: PropTypes.string,
};

export default AppUser;
