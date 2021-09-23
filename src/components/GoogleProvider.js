import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';
import GoogleIcon from '../assets/images/googleIcon.svg';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';

const GoogleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  border: 1px solid ${({ theme }) => theme.color.lightSecondary};
  border-radius: 50%;
  margin: 0 10px;
`;

const StyledIcon = styled(Icon)`
  height: 2rem;
  width: auto;
`;

const GoogleProvider = ({ setFormError }) => {
  const history = useHistory();
  const { googleAuth } = useAuth();
  const { checkIsProviderDataExists } = useFirestore();
  const handleSignin = async () => {
    try {
      const { user } = await googleAuth();
      await checkIsProviderDataExists(user);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
  };
  return (
    <GoogleButton onClick={handleSignin}>
      <StyledIcon src={GoogleIcon} />
    </GoogleButton>
  );
};

GoogleProvider.propTypes = {
  setFormError: PropTypes.func,
};

export default GoogleProvider;
