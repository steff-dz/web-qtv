import { useState, useEffect } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { Wrapper } from "../components/Wrapper";
import { PageTitle } from "../components/PageTitle";
import Input from "../components/Input";
import client from "../client";
import groq from "groq";

//try and export this to another file since you are using this on two pages
export async function getStaticProps() {
  const query = groq`
  {
      "tricks": *[_type == 'tricks']{
        title, 
        slug,
        tags
      }
  }
  
  `;

  const data = await client.fetch(query);

  return {
    props: {
      tricks: data,
    },
  };
}

const TrickMixer = ({ tricks }) => {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [trickData, setTrickData] = useState();
  console.log(tricks);

  //This is a helper function that could probably be moved outside
  function randomNum(max) {
    console.log("this is our max length", max);
    return Math.floor(Math.random() * (max - 1) + 1);
  }

  function testSubmit(e) {
    e.preventDefault();
    //conditional to filter out the tricks accordiong to the selected level---------
    let filteredTricks = [];
    if (selectedLevels.length === 3) {
      console.log("all three levels were selected");
      tricks.tricks.forEach((trick) => filteredTricks.push(trick));
    } else {
      tricks.tricks.forEach((trick) => {
        if (
          trick.tags[0] === selectedLevels[0] ||
          trick.tags[0] === selectedLevels[1]
        ) {
          filteredTricks.push(trick);
        }
      });
    }

    //Creating 2 empty arrays for unique numbers and tricks selected at random
    let randomSet = [];
    let numArray = [];

    //create six unique numbers--------
    while (numArray.length < 6) {
      let num = Math.floor(Math.random() * filteredTricks.length) + 1;
      if (numArray.indexOf(num) === -1) numArray.push(num);
    }

    //finding random trick w/ random number & putting it into new array
    numArray.forEach((num) => {
      randomSet.push(filteredTricks[num]);
    });
    setTrickData(randomSet);
  }

  const handleInput = (e) => {
    const choice = e.target.value;
    console.log(choice);
    const exists = selectedLevels.find((e) => e === choice);
    if (exists) {
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
                value={"Beginner"}
                title={"Beginner Level"}
                handleInput={handleInput}
              />
              <Input
                type={"checkbox"}
                id={"intermediateLvl"}
                name={"intermediateLvl"}
                value={"Intermediate"}
                title={"Intermediate Level"}
                handleInput={handleInput}
              />
              <Input
                type={"checkbox"}
                id={"advancedLvl"}
                name={"advancedLvl"}
                value={"Advanced"}
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
