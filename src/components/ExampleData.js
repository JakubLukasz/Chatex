import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.p`
  font-size: 1.7rem;
  margin-bottom: 10px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin-bottom: 5px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Bold = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const ExampleData = () => {
  return (
    <Container>
      <Info>Example Data</Info>
      <Text>
        <Bold>E-mail:</Bold> testuserchatex@gmail.com
      </Text>
      <Text>
        <Bold>Password:</Bold> testuser
      </Text>
    </Container>
  );
};

export default ExampleData;
