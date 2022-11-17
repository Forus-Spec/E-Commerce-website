import React from 'react';
import styled from 'styled-components/macro';
import HeaderCity from '../../assets/LightninCity.png';
const Logo = (props) => {
  return (
    <Wrapper>
      <img style={{
        width: "220px",
        height: "220px",
      }}
        src={HeaderCity} />
    </Wrapper>
  );
};



const Wrapper = styled.div`
`;

export default Logo;
