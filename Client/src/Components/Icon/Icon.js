import React from "react";
import styled from "styled-components/macro";
import {
  Search,
  Menu,
  User,
  Users,
  Truck,
  Heart,
  AlertCircle,
  MessageSquare,
  ShoppingBag,
  ChevronDown,
  ShoppingCart,
  ThumbsUp,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  Star,
  LogIn,
  X,
  Info,
  Twitter,
  Instagram,
  Linkedin,
  Check,
  XSquare,
  LogOut,
  Camera,
  Trash
} from "react-feather";
import { COLORS } from "../UIComponents/Constants";

// This is our icons stars
const icons = {
  search: Search,
  check: Check,
  menu: Menu,
  user: User,
  users: Users,
  truck: Truck,
  heart: Heart,
  star: Star,
  message: MessageSquare,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  xMark: X,
  trash: Trash,
  camera: Camera,
  "shopping-bag": ShoppingBag,
  "chevron-down": ChevronDown,
  "shopping-cart": ShoppingCart,
  "thumbs-up": ThumbsUp,
  "dollar-sign": DollarSign,
  "alert-circle": AlertCircle,
  "left-arrow": ArrowLeft,
  "right-arrow": ArrowRight,
  "log-in": LogIn,
  "log-out": LogOut,
  info: Info
};

const Icon = ({
  name,
  color,
  size,
  strokeWidth,
  hover = false,
  filled = false,
  ...delegated
} = {}) => {
  const Component = icons[name];
  if (!Component) throw new Error(`No icon found for ID: ${name}`);
  return (
    <Wrapper strokeWidth={strokeWidth} hover={hover} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > svg {
    &:hover {
      fill: ${props => (props.hover ? `${COLORS.orange}` : "")};
      transition: 0.4s;
      border-radius: 10%;
    }
    fill: ${props => (props.active ? `${COLORS.orange}` : null)};
    display: block;
    stroke-width: ${p => p.strokeWidth}px;
  }
`;

export default Icon;
