import React from 'react'
import styled from 'styled-components';
import { FONTSIZE,COLORS } from '../Constants';

//This is our awesome label which is awesome
const Label = ({ children, htmlFor, ...props }) => {
  return (<LabelStyle htmlFor={htmlFor} {...props}>{children}</LabelStyle>)
}

const LabelStyle = styled.label`
  margin-top:2px;
  margin-bottom:8px;
  margin-left:10px;
  display:block;
  color: ${COLORS.gray700};
  font-weight: 600;
  font-size:${FONTSIZE.medium}rem;
`

export default Label
