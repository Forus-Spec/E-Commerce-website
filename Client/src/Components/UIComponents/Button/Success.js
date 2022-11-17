import React from "react";
import styled, { keyframes } from "styled-components";
import Icon from "../../Icon";
function Success() {
  return (
    <>
      <div
        style={{
          fontSize: "inherit"
        }}
      ></div>
      Added
      <Animation>
        <Icon size={32} strokeWidth={2.5} name="check" />
      </Animation>
    </>
  );
}

const Collsion = keyframes`
    0% {
        opacity:0;
         outline-offset:1px;
         margin-bottom:2px;
         outline-color:white;
    }
      50%{
         opacity:0.6;
         outline-color:white;
         color:green;
         font-size:8px;
         font-weight:800;
       }
     100% {
        color:green;
        opacity:0.8;
        font-size:12px;
    }
     100% {
         font-size:20px;
         color:green;
         opacity:1
    }
    `;

const fadeIn = keyframes`
    from { opacity: 1; }
    to   { opacity: 0; }
`;

const Animation = styled.div`
  font-size: 1px;
  animation: ${Collsion} 0.8s ease-in-out, ${fadeIn} 0.8s ease-in-out;
`;

export default Success;
