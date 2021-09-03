import React from 'react';
import Icon from './Icon';
import LogoSrc from '../assets/images/chat.svg';
import PropTypes from 'prop-types';

const Logo = ({ className }) => {
  return <Icon className={className} src={LogoSrc} />;
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
