import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import testUserIcon from '../assets/images/profileIcon.svg';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { generateNumber } from '../helpers/generateNumber';
import { useFirestore } from '../hooks/useFirestore';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

const Info = styled.p`
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const StyledIcon = styled(Icon)`
  width: 2rem;
  height: 2rem;
  fill: #ffffff;
`;

const LogButton = styled.button`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const ExampleData = ({ setFormError }) => {
  const { signUp } = useAuth();
  const { createUserData } = useFirestore();
  const [randomId, setRandomId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const id = generateNumber(10);
    setRandomId(id);
  }, []);

  const handleTestLogin = async () => {
    const username = `guest_${randomId}`;
    const email = `guest_${randomId}@gmail.com`;
    const password = `guest_${randomId}`;
    try {
      const { user } = await signUp(email, password);
      await createUserData(username, user);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <Container>
      <LogButton onClick={handleTestLogin}>
        <StyledIcon src={testUserIcon} />
      </LogButton>
      <Info>
        login as Guest
        <br />
      </Info>
    </Container>
  );
};

ExampleData.propTypes = {
  setFormError: PropTypes.func,
};

export default ExampleData;
