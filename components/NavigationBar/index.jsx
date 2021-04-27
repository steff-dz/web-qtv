import { useRouter } from "next/router";
import styled from "styled-components";
import Burger from "./Burger";

const NavigationBar = () => {
  const router = useRouter();
  return (
    <header>
      <Nav>
        <Logo onClick={() => router.push("/")}>
          <img src="/images/QTV.png" />
        </Logo>
        <Burger />
      </Nav>
    </header>
  );
};

const Nav = styled.nav`
  width: 100%;
  height: 65px;
  margin-top: 20px;
  padding: 0 ${(props) => props.theme.spacing[4]};
  display: flex;
  /* border-bottom: 1px solid #e6e4e4; */
  justify-content: space-between;
  align-items: center;
  background-color: #546871;

  color: white;
`;

const Logo = styled.span`
  /* padding: 15px 0; */
  /* font-family: ${(props) => props.theme.titleFont};
  font-size: 7rem;
  font-weight: bold; */
  img {
    padding-top: 15%;
    width: 150px;
  }

  cursor: pointer;
`;

export default NavigationBar;
