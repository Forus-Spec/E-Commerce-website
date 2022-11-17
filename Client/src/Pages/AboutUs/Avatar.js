import React from "react";
import styled from "styled-components";
import { COLORS } from "../../Components/UIComponents/Constants";

const Avatar = ({ alt, image, emoji, position }) => {
  return (
    <Article>
      <Image alt={alt} src={image} />
      <AvatarPosition>{position}</AvatarPosition>
    </Article>
  );
};
// This is our Information Wrapper functionality which is huge and awesome
const InformationWrapper = styled.div`
  display: flex;
  background: linear-gradient(to top, #dfe9f3 0%, white 100%);
  flex-direction: column;
  text-align: left;
  border-radius: calc(var(--outer-radius) - var(--padding));
  padding: var(--padding);
  border: 1px solid black;
  --outer-radius: 24px;
  --padding: 8px;
`;
// ⚠️ check your global p styles
const Wrapper = styled.div`
  background: linear-gradient(
    180.2deg,
    rgb(30, 33, 48) 6.8%,
    rgb(74, 98, 110) 131%
  );
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  align-items: flex-start;
  background-color: grey;
  --outer-radius: 24px;
  --padding: 8px;
  border-radius: calc(var(--outer-radius) - var(--padding));
  padding: var(--padding);
`;

const AvatarTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: radial-gradient(
    circle at 18.7% 37.8%,
    rgb(250, 250, 250) 0%,
    rgb(225, 234, 238) 90%
  );
  align-items: flex-start;
  --outer-radius: 24px;
  --padding: 8px;
  border-radius: calc(var(--outer-radius) - var(--padding));
  padding: var(--padding);
  width: fit-content;
  text-align: center;
`;

const AvatarPosition = styled.div`
  margin-top: 10px;
  font-size: 1.1rem;
  color: white;
  font-weight: 600;
  background-image: ${COLORS.primary};
  border-radius: calc(var(--outer-radius) - var(--padding));
  padding: var(--padding);
  width: 100%;
  background: radial-gradient(
    circle at 10% 20%,
    rgb(242, 235, 243) 0%,
    rgb(234, 241, 249) 90.1%
  );
  box-shadow: inset 3px 3px 5px #cbcbcb, inset -3px -3px 5px #ffffff;
  font-weight: bold;
  color: ${COLORS.orange};
`;
const Image = styled.img`
  border-radius: calc(var(--outer-radius) - var(--padding));
  display: block;
  object-fit: cover;
  width: 100%;
  height: 200px;
`;

/*
  const AvatarStyle = styled.article`
  margin-bottom:20px;
  text-align:center;
  width: 176px;
  height: 176px;
  border-radius:50% ;
  outline:10px solid rgba(242, 101, 34, 0.46);
`;
*/

export default Avatar;
