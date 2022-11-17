import React from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";

import image1 from "../../assets/AU/Picture2.jpg";
import image2 from "../../assets/AU/Picture1.jpg";
import image3 from "../../assets/AU/Picture3.jpg";
import image4 from "../../assets/AU/Picture5.jpg";
import image5 from "../../assets/AU/Picture4.jpg";
import Icon from "../../Components/Icon";

import Avatar from "./Avatar";
import { COLORS } from "../../Components/UIComponents/Constants";

function expandedCard({ children, onCollapse }) {
  return (
    <motion.div layoutId="expandable-card" onClick={onCollapse}>
      {children}
      <motion.p
        className="card expanded secondary"
        onClick={onCollapse}
        transition={{ delay: 0.3 }}
        initial={{ opacity: 0, top: "6rem" }}
        animate={{ opacity: 1, top: "3rem" }}
      >
        I'm Awesmoe
      </motion.p>
    </motion.div>
  );
}

const AboutUs = () => {
  const staticData = [
    {
      fullName: "Fares Essayeh",
      position: "UI/UX designer",
      image: image1,
      alt: "ADAM",
      emoji: "🤩"
    },
    {
      fullName: "Fares Essayeh",
      position: "Front-end developer",
      image: image2,
      alt: "ADAM",
      emoji: "✨"
    },
    {
      fullName: "Fares Essayeh",
      position: "Junior developer",
      image: image3,
      alt: "ADAM",
      emoji: "🌠"
    },
    {
      fullName: "Fares Essayeh",
      position: "Architect",
      image: image4,
      alt: "ADAM",
      emoji: "⭐"
    },
    {
      fullName: "Fares Essayeh",
      position: "SQL developer",
      image: image5,
      alt: "ADAM",
      emoji: "🌃"
    }
  ];
  return (
    <>
      <BodyWrapper>
        <Wrapper>
          {staticData.map(el => (
            <Avatar
              image={el.image}
              fullName={el.fullName}
              position={el.position}
              alt={el.alt}
              emoji={el.emoji}
            />
          ))}
        </Wrapper>
        <Title>Success is the greatest</Title>
        <Paragraph>
          Electronic City company offers offers adapted to the professional
          environment.Whether you are a company, startup,community,association
          or administration, benefit from personalized support and solutions
          adapted to your projects: consumable capital goods,volume purchases,
          Quotes, etc.
        </Paragraph>
        <Title>Our Great experts are at your service</Title>
      </BodyWrapper>
      <Stack>
        <Item>
          <Icon
            name="dollar-sign"
            strokeWidth={1.5}
            size={64}
            color="#0154AB"
          />
          <ItemTitle>Flexing Pricing Policy</ItemTitle>
          <ItemText>
            Always Competitive prices and an extensive loyalty program for our
            customers
          </ItemText>
        </Item>
        <Item>
          <Icon name="users" strokeWidth={1.5} size={64} color="#0154AB" />
          <ItemTitle>Hello World</ItemTitle>
          <ItemText>
            Always Competitive prices and an extensive loyalty program for our
            customers
          </ItemText>
        </Item>
        <Item>
          <Icon name="thumbs-up" strokeWidth={1.5} size={64} color="#0154AB" />
          <ItemTitle>Hello World</ItemTitle>
          <ItemText>
            Always Competitive prices and an extensive loyalty program for our
            customers
          </ItemText>
        </Item>
        <Item>
          <Icon name="truck" strokeWidth={1.5} size={64} color="#0154AB" />
          <ItemTitle>Hello World</ItemTitle>
          <ItemText>
            Always Competitive prices and an extensive loyalty program for our
            customers
          </ItemText>
        </Item>
      </Stack>
    </>
  );
};
// this is our stack functionality
const Stack = styled.ul`
  margin-top: 68px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1580px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  box-shadow: 7px 7px 7px 7px #00000012;
`;
const Item = styled.li`
  padding: 10px;
  overflow: hidden;
  border-right: 1px solid #eee;
  padding-right: 20px;
`;
const ItemText = styled.p``;
const ItemTitle = styled.div``;
const BodyWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-weight: 800;
  text-align: center;
  display: block;
  font-size: 70px;
  margin-top: 100px;
`;
const Paragraph = styled.p`
  margin: auto;
  font-weight: 500;
  font-size: 1.225rem;
  line-height: 22px;
  max-width: 1100px;
  text-align: left;
  padding-left: 11px;
  font-weight: bold;
  line-height: 24px;
  border-left: 5px solid blue;
`;
const Wrapper = styled.div`
  --outer-radius: 24px;
  --padding: 68px;
  margin-top: 52px;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap: 60px;
  border-radius: var(--outer-radius);
  padding: var(--padding);
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
  overflow: auto;
  background: ${COLORS.primary};
`;

export default AboutUs;
