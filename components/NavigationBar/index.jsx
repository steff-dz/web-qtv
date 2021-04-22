import React from "react";
import styled from "styled-components";
import Burger from "./Burger";

const NavigationBar = () => {
  return (
    <header>
      <Nav>
        <Logo>QTV</Logo>
        <Burger />
      </Nav>
    </header>
  );
};

const Nav = styled.nav`
  width: 100%;
  height: 65px;
  padding: 0 ${(props) => props.theme.spacing[4]};
  display: flex;
  border-bottom: 1px solid #e6e4e4;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  /* padding: 15px 0; */
  font-family: ${(props) => props.theme.titleFont};
  font-size: ${(props) => props.theme.fontSizes[7]};
  font-weight: 700;
`;

export default NavigationBar;
