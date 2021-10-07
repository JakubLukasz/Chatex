import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';
import FacebookIcon from '../assets/images/facebookIcon.svg';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';

const FacebookButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  border: 1px solid ${({ theme }) => theme.color.lightSecondary};
  border-radius: 50%;
`;

const StyledIcon = styled(Icon)`
  height: 2rem;
  width: 2rem;
`;

const FacebookProvider = ({ setFormError }) => {
  const { fbAuth } = useAuth();
  const history = useHistory();
  const { checkIsProviderDataExists } = useFirestore();
  const handleSignin = async () => {
    try {
      const { user } = await fbAuth();
      await checkIsProviderDataExists(user);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
  };
  return (
    <FacebookButton onClick={handleSignin}>
      <StyledIcon src={FacebookIcon} />
    </FacebookButton>
  );
};

FacebookProvider.propTypes = {
  setFormError: PropTypes.func,
};

export default FacebookProvider;
