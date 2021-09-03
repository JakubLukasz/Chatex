import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';
import GoogleIcon from '../assets/images/googleIcon.svg';
import PropTypes from 'prop-types';

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  border: 1px solid ${({ theme }) => theme.color.lightSecondary};
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  height: 2rem;
  width: auto;
`;

const GoogleProvider = () => {
  return (
    <Container>
      <StyledIcon src={GoogleIcon} />
    </Container>
  );
};

GoogleProvider.propTypes = {
  className: PropTypes.string,
};

export default GoogleProvider;
