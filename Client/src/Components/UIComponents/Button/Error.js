import React from "react";
import styled, { keyframes } from 'styled-components';
import Icon from "../../Icon";

function Error() {
  return (
    <>
      <div style={{
        position: "absolute",
        fontSize: "inherit",
        marginRight: "30px",
        opacity: "0.8"
      }}>
         Error...
      </div>
      <Animation>
        <Icon
          name="x"
          size={32}
        />
      </Animation>
    </>
  );
}

const coloredCircle = keyframes`
    0% {
        opacity:0
    }
      30%{
         opacity:1;
       }
      60% {
       opacity:0;
    }
      90% {
       opacity:1
    }
`

const Animation = styled.div`
   margin-left:60px;
   font-size:1px;
   animation: ${coloredCircle} 0.8s ease-in-out ;
`


export default Error;
