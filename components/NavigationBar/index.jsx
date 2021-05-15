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
  width: 100vw;
  padding: 0 ${(props) => props.theme.spacing[5]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.grey};
  color: white;
  @media only screen and (max-width: 500px) {
    padding: 0 1rem;
  }
`;

const Logo = styled.span`
  z-index: 8;
  img {
    padding-top: ${(props) => props.theme.spacing[4]};
    width: 125px;
  }

  cursor: pointer;
`;

export default NavigationBar;
