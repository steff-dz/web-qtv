import Link from "next/link";
import styled from "styled-components";

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <Link href="/vault">
        <li>The Vault</li>
      </Link>
      <li>Register</li>
      <li>Login</li>
      <li>Trick Run Mash Up</li>
      <li>Skater Name Generator</li>
    </Ul>
  );
};

const Ul = styled.ul`
  list-style: none;
  flex-flow: column nowrap;
  background-color: rgb(75, 137, 144);
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
  width: 550px;
  padding-top: 3.5rem;
  transition: transform 0.3s ease-in-out;

  li {
    padding: 18px 10px;
    color: white;
    font-size: ${(props) => props.theme.fontSizes[7]};
    font-family: ${(props) => props.theme.textFont};
    &:hover {
      font-weight: 800;
    }

    cursor: pointer;
  }
`;

export default RightNav;
