import React from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

const IconSVG = styled(SVG)`
  width: 100%;
  height: 100%;
`;

interface IProps {
  src: string;
  [x: string]: any;
}

const Icon: React.FC<IProps> = ({ src, ...props }) => {
  return (
    <div {...props}>
      <IconSVG src={src}></IconSVG>
    </div>
  );
};

export default Icon;
