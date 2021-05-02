import { useState, useEffect } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { Wrapper } from "../components/Wrapper";
import { PageTitle } from "../components/PageTitle";
import Input from "../components/Input";

const TrickMixer = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);

  //   useEffect(() => {
  //     console.log(selectedLevels, "from useEffect");
  //   }, [selectedLevels]);

  function testSubmit(e) {
    e.preventDefault();
    console.log(selectedLevels);
  }

  const handleInput = (e) => {
    console.log(e.target.value);
    const choice = e.target.value;
    const exists = selectedLevels.find((e) => e === choice);
    if (exists) {
      //console.log(exists, "from function");
      setSelectedLevels(selectedLevels.filter((el) => el !== choice));
    } else {
      setSelectedLevels([...selectedLevels, choice]);
    }
  };

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
              <Input
                type={"checkbox"}
                id={"beginnerLvl"}
                name={"beginnerLvl"}
                value={"beginner"}
                title={"Beginner Level"}
                handleInput={handleInput}
              />
              <Input
                type={"checkbox"}
                id={"intermediateLvl"}
                name={"intermediateLvl"}
                value={"intermediate"}
                title={"Intermediate Level"}
                handleInput={handleInput}
              />
              <Input
                type={"checkbox"}
                id={"advancedLvl"}
                name={"advancedLvl"}
                value={"advanced"}
                title={"Advanced Level"}
                handleInput={handleInput}
              />
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

  button {
    width: 20%;
    font-size: 3rem;
  }
`;
export default TrickMixer;
