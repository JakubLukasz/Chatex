import React from 'react';
import Icon from './Icon';
import logoSrc from '../../assets/images/logo.svg';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return <Icon className={className} src={logoSrc} />;
};

export default Logo;
