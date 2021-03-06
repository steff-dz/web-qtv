import Link from "next/link";
import styled from "styled-components";

const RightNav = ({ open }) => {
  return (
    <BurgerMenu open={open}>
      <div
        role="menu"
        aria-label="click one of the links below to navigate to that page"
      >
        <Link href="/vault">The Vault</Link>

        <Link href="#">Register</Link>

        <Link href="#">Login</Link>

        <Link href="/trickmixer">Trick Mixer</Link>
      </div>
    </BurgerMenu>
  );
};

const BurgerMenu = styled.div`
  background-color: ${(props) => props.theme.blue};
  border-left: 10px solid #3d7075;
  box-shadow: ${({ open }) =>
    open
      ? "  0px 5px 13px -7px #000000, -15px 0px 9px -6px rgba(0, 0, 0, 0.54);"
      : ""};

  position: fixed;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  height: 100vh;
  width: 450px;
  transition: transform 0.3s ease-in-out;
  z-index: 19;

  div {
    display: flex;
    flex-direction: column;
    margin-top: 10vh;
    gap: 5rem;
    width: fit-content;

    a {
      padding-left: 1rem;
      text-decoration: none;
      color: white;
      font-size: 3.5rem;
      font-family: ${(props) => props.theme.textFont};
      &:hover {
        font-weight: 800;
      }
      cursor: pointer;
    }
    @media only screen and (max-width: 1500px) {
      margin: 15vh auto;
    }
  }

  @media only screen and (max-width: 1500px) {
    width: 100vw;
  }
`;

export default RightNav;
