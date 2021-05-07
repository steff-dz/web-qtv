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
  const [displayTricks, setDisplayTricks] = useState(false);

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
    console.log("these are the filtered tricks:", filteredTricks);
    //Creating 2 empty arrays for unique numbers and tricks selected at random
    let randomSet = [];
    let numArray = [];

    //create six unique numbers--------
    while (numArray.length < 6) {
      let num = Math.floor(Math.random() * filteredTricks.length);
      if (numArray.indexOf(num) === -1) numArray.push(num);
    }

    console.log("these are our numbers:", numArray);
    //finding random trick w/ random number & putting it into new array
    numArray.forEach((num) => {
      randomSet.push(filteredTricks[num]);
    });
    setTrickData(randomSet);

    console.log("this is our random set", randomSet);
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
      <IndexWrapper>
        <ImageContainer></ImageContainer>
        <NavigationBar />
      </IndexWrapper>
      <MainBase>
        <StyledPageTitle>Trick Mixer</StyledPageTitle>
        <SectionBase>
          <article id="instruction-container">
            <p>Get a set of 6 random tricks to give you an idea for a run.</p>
            <p>
              Just click on the name of a level to choose which type of tricks
              you want, then press GO!
            </p>
          </article>
          <form onSubmit={(e) => testSubmit(e)}>
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
          </form>
        </SectionBase>
      </MainBase>
    </>
  );
};

const IndexWrapper = styled(Wrapper)`
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.div`
  background-image: url("/images/rail.jpeg");
  height: 100%;
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  opacity: 0.5;
`;

const MainBase = styled.main`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
`;

const StyledPageTitle = styled(PageTitle)`
  z-index: 30;
  margin-top: 5%;
  font-size: 8rem;
`;

const SectionBase = styled.section`
  margin: 0 auto;
  /* border: 1px solid grey; */
  width: 90%;
  height: 70%;
  display: flex;
  justify-content: space-between;

  article {
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.white};
    font-size: 3rem;
    border-radius: 15px;

    p {
      text-align: left;

      :nth-child(1) {
        margin-bottom: 2rem;
      }
    }
  }

  #instruction-container {
    width: 40vw;
    line-height: 45px;
    height: 40vh;
    background-color: rgb(84, 104, 113, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 8rem;
  }

  form {
    width: 40vw;
    height: 40vh;
    background-color: rgb(75, 98, 109);
    align-self: flex-end;

    padding: 0 8rem;
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.white};
    font-size: 3rem;
    border-radius: 15px;
  }
`;

export default TrickMixer;
