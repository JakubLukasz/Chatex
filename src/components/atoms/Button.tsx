import React from 'react';
import styled from 'styled-components';

const SButton = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 7px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.8rem;
  padding: 13px 0;
  transition: filter 0.3s ease;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    filter: brightness(90%);
  }
`;

interface IProps {
  className?: string;
  onClick?: () => any;
  label: string;
  submit?: boolean;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({
  className,
  label,
  onClick,
  submit,
  disabled,
}) => {
  return (
    <SButton
      disabled={disabled ?? null}
      type={submit ? 'submit' : null}
      className={className}
      onClick={onClick}
    >
      {label}
    </SButton>
  );
};

export default Button;
