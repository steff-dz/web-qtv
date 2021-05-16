import { useRouter } from "next/router";
import styled from "styled-components";
import Burger from "./Burger";

const NavigationBar = () => {
  const router = useRouter();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push("/");
    }
  };

  return (
    <header>
      <Nav role="navigation">
        <Logo>
          <img
            aria-label="link for home page"
            onClick={() => router.push("/")}
            onKeyPress={handleKeyPress}
            tabIndex="0"
            src="/images/QTV.png"
            alt="Logo for showing letters QTV"
          />
        </Logo>
        <Burger />
      </Nav>
    </header>
  );
};

const Nav = styled.nav`
  width: 100vw;
  padding: 1rem ${(props) => props.theme.spacing[5]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.grey};
  color: white;

  @media only screen and (max-width: 500px) {
    padding: 1rem 2rem;
  }
`;

const Logo = styled.span`
  z-index: 8;
  cursor: pointer;
  img {
    padding-top: 0;
    width: 125px;
  }
`;

export default NavigationBar;
