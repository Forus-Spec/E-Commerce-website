import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import Logo from "../Logo";
import Button from "../UIComponents/Button";
import { COLORS } from "../UIComponents/Constants";

const Footer = () => {
  return (
    // this is our main Great wrapper functionality which is amazing and awesome
    <Wrapper>
      <Logo />
      <Section>
        <Title>Informations</Title>
        <ul>
          <li>Stocks</li>
          <li>Shops</li>
          <li>News</li>
        </ul>
      </Section>
      <Section>
        <Title>Client</Title>
        <ul>
          <li>This is our Cooperate sales </li>
          <li>Deliver payment function</li>
          <li>About The Company</li>
        </ul>
      </Section>

      <Section>
        <Title>Make your Presence felt 👋</Title>
        <SocialIcons>
          <li>
            <Icon size={32} name="twitter" />
          </li>
          <li>
            <Icon size={32} name="instagram" />
          </li>
          <li>
            <Icon size={32} name="linkedin" />
          </li>
        </SocialIcons>
      </Section>
      <Section>
        <h1 style={{ textAlign: "center" }}>Please subscribe for events</h1>
        <form>
          <fieldset>
            <Label for="subscribe">
              Email:
              <Input required type="email" />
              <Button size="small" type="submit">
                Send
              </Button>
            </Label>
          </fieldset>
        </form>
      </Section>
      <p>© 2022-present. All rights reserved.</p>
    </Wrapper>
  );
};

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5ch;
  padding: 1ch;
  border: 1px solid gray;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  background-color: ${COLORS.black};
`;
const Input = styled.input`
  background: hsl(0 0% 93%);
  border-radius: 8px;
  border: none;
  height: 42px;
  width: 280px;
`;

const Title = styled.h1`
  margin-bottom: 6px;
  padding: 12px 0px;
  font-size: 22px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1px;
  list-style-type: none;
`;

const Section = styled.div`
  width: max-content;
  max-width: 470px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 92px;
  font-size: 0.9rem;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  background-image: conic-gradient(
    from 90deg at 50% 100%,
    hsla(25, 52%, 3%, 1) 50%,
    hsl(220deg 84% 75%) 77.5%,
    hsla(25, 52%, 3%, 1) 100%
  );
`;

export default Footer;
