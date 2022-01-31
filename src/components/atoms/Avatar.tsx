import React from 'react';
import styled from 'styled-components';
import defaultUserIcon from '../../assets/images/defaultUserIcon.svg';

const Container = styled.div`
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.color.primary};
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

interface IProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar: React.FC<IProps> = ({ src, alt, className }) => {
  return (
    <Container className={className}>
      <Image src={src ?? defaultUserIcon} alt={alt} />
    </Container>
  );
};

export default Avatar;
