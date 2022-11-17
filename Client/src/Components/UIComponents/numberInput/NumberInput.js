import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../Constants';

const NumberInput = () => {

  const [quantity, setQuantity] = React.useState()

  const handleIncrement = () => {
    setQuantity(prevCount => prevCount + 1)
  }

  const handleDecrement = () => {
    setQuantity(prevCount => prevCount - 1)
  }

  return (
    <>
      <Wrapper>
        <Span onClick={handleDecrement}>+</Span>
        <NumberOutput>01</NumberOutput>
        <Span onClick={handleIncrement}>-</Span>
      </Wrapper>
    </>
  )
}

// This is our Wrapper functionality
const Wrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:12px;
`

const NumberOutput = styled.div`
  font-size:28px;
  pointer-events:none;
`

const Span = styled.span`
  background-image:${COLORS.primary};
  text-align:center;
  padding-top:2px;
  padding-left:2px;
  width:32px;
  height:32px;
  border-radius: 8px ;
  font-weight:600;
  cursor: pointer;
`

export default NumberInput;
