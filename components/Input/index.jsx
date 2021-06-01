import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Input = ({
  type,
  id,
  name,
  value,
  title,
  handleInput,
  selectedLevels,
}) => {
  const checkmark = <FontAwesomeIcon icon={faCheck} />;
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInput(e.target.dataset.value);
    }
  };

  return (
    <InputContainer>
      {selectedLevels.find((el) => el === value) ? (
        <span>{checkmark} </span>
      ) : (
        ""
      )}
      <label
        tabIndex="0"
        htmlFor={id}
        data-value={value}
        onKeyDown={(e) => handleKeyPress(e)}
      >
        {title}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={(e) => handleInput(e.target.value)}
        />
      </label>
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
    :focus {
      outline: 1px solid black;
    }

    :hover {
      font-weight: 200;
    }
  }
  input {
    visibility: hidden;
  }

  @media only screen and (max-width: 415px) {
    font-size: 2rem;
  }
`;

export default Input;
