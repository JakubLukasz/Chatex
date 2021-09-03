import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';
import FacebookIcon from '../assets/images/facebookIcon.svg';
import PropTypes from 'prop-types';

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  border: 1px solid ${({ theme }) => theme.color.lightSecondary};
  border-radius: 50%;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  height: 2rem;
  width: auto;
`;

const FacebookProvider = () => {
  return (
    <Container>
      <StyledIcon src={FacebookIcon} />
    </Container>
  );
};

FacebookProvider.propTypes = {
  className: PropTypes.string,
};

export default FacebookProvider;
