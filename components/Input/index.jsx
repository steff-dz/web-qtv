import styled from "styled-components";

const Input = ({ type, id, name, value, title, handleInput }) => {
  return (
    <InputContainer>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => handleInput(e)}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  border: 1px solid black;
  label {
    cursor: pointer;
  }
  input {
    opacity: 0.5;
  }
`;

export default Input;
