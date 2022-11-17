import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;
const comeInOut = keyframes`
 to{transform: rotate(.5turn)}
`;

export const LoadingAnimation = styled.div`
  width: 22px;
  aspect-ratio: 1;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  --_c: radial-gradient(farthest-side, #25b09b 92%, #0000);
  background: var(--_c) top, var(--_c) left, var(--_c) right, var(--_c) bottom;
  background-size: 8px 8px;
  background-repeat: no-repeat;
  animation: ${comeInOut} 0.6s linear infinite, ${fadeIn} 0.5s forwards;
`;
