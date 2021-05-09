import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Input = ({ type, id, name, value, title, handleInput }) => {
  const [toggle, setToggle] = useState(false);
  const checkmark = <FontAwesomeIcon icon={faCheck} />;

  return (
    <InputContainer>
      {toggle && type === "checkbox" ? <span>{checkmark} </span> : " "}
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onClick={() => setToggle(!toggle)}
        onChange={(e) => handleInput(e)}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: fit-content;

  span {
    margin: 0 1rem;
  }

  label {
    cursor: pointer;
    text-align: left;

    :hover {
      font-weight: 200;
    }
  }
  input {
    opacity: 0;
  }
`;

export default Input;
