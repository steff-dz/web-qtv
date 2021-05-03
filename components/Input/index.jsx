import styled from "styled-components";

const Input = ({ type, id, name, value, title, handleInput }) => {
  return (
    <InputContainer>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => handleInput(e)}
      />
      <label htmlFor={id}>{title}</label>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  div {
    border: 1px solid black;
    input {
      width: 30px;
    }
  }
`;

export default Input;
