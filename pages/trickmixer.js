import { useState, useEffect } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { Wrapper } from "../components/Wrapper";
import { PageTitle } from "../components/PageTitle";

const TrickMixer = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);

  //   useEffect(() => {
  //     console.log(selectedLevels, "from useEffect");
  //   }, [selectedLevels]);

  function testSubmit(e) {
    e.preventDefault();
    console.log(selectedLevels);
  }

  function handleInput(e) {
    const choice = e.target.value;
    const exists = selectedLevels.find((e) => e === choice);
    if (exists) {
      //console.log(exists, "from function");
      setSelectedLevels(selectedLevels.filter((el) => el !== choice));
    } else {
      setSelectedLevels([...selectedLevels, choice]);
    }
  }

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <main>
          <PageTitle style={{ paddingBottom: "2rem" }}>Trick Mixer</PageTitle>
          <SectionBase>
            <p>
              If you need ideas for a run, we can help you with that! Select the
              level of tricks you want, then hit the GO button. <br />
              <br />
              We will grab a random set of six tricks for you that you can put
              together in a single run. Of course, feel free to skip some, add
              others, and do them in any order you want!
            </p>
            <FormBase onSubmit={(e) => testSubmit(e)}>
              <div>
                <input
                  type="checkbox"
                  id="beginnerlvl"
                  name="beginnerlvl"
                  value="beginner"
                  onChange={(e) => handleInput(e)}
                />
                <label htmlFor="beginner">Beginner Level</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="intermediatelvl"
                  name="intermediatelvl"
                  value="intermediate"
                  onChange={(e) => handleInput(e)}
                />
                <label htmlFor="intermediate">Intermediate Level</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="advancedlvl"
                  name="advancedlvl"
                  value="advanced"
                  onChange={(e) => handleInput(e)}
                />
                <label htmlFor="advanced">Advanced Level</label>
              </div>
              <button type="submit">GO</button>
            </FormBase>
          </SectionBase>
        </main>
      </Wrapper>
    </>
  );
};

const SectionBase = styled.section`
  border: 1px solid grey;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes[6]};
  font-family: ${(props) => props.theme.textFont};
  p {
    border: 1px solid pink;
    width: 45%;
    margin: 1rem;
    padding: 2rem 3rem;
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.black};

    line-height: 50px;
    border-radius: 10px;
    text-align: left;
  }
`;

const FormBase = styled.form`
  width: 45%;
  margin: 1rem;
  padding: 2rem 3rem;
  background-color: ${(props) => props.theme.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  div {
    border: 1px solid black;
    input {
      width: 30px;
    }
  }

  button {
    width: 20%;
    font-size: 3rem;
  }
`;
export default TrickMixer;
