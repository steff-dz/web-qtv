import React, { useState } from "react";
import RightNav from "../RightNav";
import styled from "styled-components";

const Burger = () => {
  const [open, setOpen] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setOpen(!open);
    }
  };
  return (
    <>
      <StyledBurger
        role="button"
        aria-label="click to open the menu"
        tabIndex="0"
        open={open}
        onKeyPress={handleKeyPress}
        onClick={() => setOpen(!open)}
      >
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} />
    </>
  );
};

const StyledBurger = styled.div`
  width: 5rem;
  height: 5rem;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  position: relative;
  top: -1.5vh;
  div {
    width: 100%;
    height: 0.5rem;
    background-color: whitesmoke;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${({ open }) =>
        open ? "translateX(-100%)" : "translateX(0)"};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export default Burger;
