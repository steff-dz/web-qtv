import { useState, useEffect } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { Wrapper } from "../components/Wrapper";
import { PageTitle } from "../components/PageTitle";
import Input from "../components/Input";
import client from "../client";
import groq from "groq";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
  const [formToggle, setFormToggle] = useState(true);

  useEffect(() => {
    if (trickData) {
      console.log(trickData.length, trickData, "from useEffect");
      setFormToggle(!formToggle);
    } else {
      console.log("trick data is empty");
    }
  }, [trickData]);

  function handleSubmit(e) {
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
    //console.log("these are the filtered tricks:", filteredTricks);
    //Creating 2 empty arrays for unique numbers and tricks selected at random
    let randomSet = [];
    let numArray = [];

    //create six unique numbers--------
    while (numArray.length < 6) {
      let num = Math.floor(Math.random() * filteredTricks.length);
      if (numArray.indexOf(num) === -1) numArray.push(num);
    }

    //console.log("these are our numbers:", numArray);
    //finding random trick w/ random number & putting it into new array
    numArray.forEach((num) => {
      randomSet.push(filteredTricks[num]);
    });
    setTrickData(randomSet);

    //console.log("this is our random set", randomSet);
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

  function renderForm() {
    return (
      <>
        <article id="instructions-container">
          <p>Get a set of 6 random tricks to give you an idea for a run.</p>
          <p>
            Just click on the name of a level to choose which type of tricks you
            want, then press GO!
          </p>
        </article>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div id="input-container">
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

            <button type="submit">
              GO <FontAwesomeIcon size="xs" icon={faArrowRight} />
            </button>
          </div>
        </form>
      </>
    );
  }

  function renderTricks() {
    return (
      <>
        <article id="trick-container">
          {trickData.map((el) => (
            <Link key={el.slug.current} href={`/trick/${el.slug.current}`}>
              <a target="_blank">{el.title}</a>
            </Link>
          ))}
          <button onClick={() => setFormToggle(!formToggle)}>
            <span>
              <FontAwesomeIcon size="xs" icon={faArrowLeft} />
            </span>
            GO BACK
          </button>
        </article>
      </>
    );
  }

  return (
    <>
      <IndexWrapper>
        <ImageContainer></ImageContainer>
        <NavigationBar />
      </IndexWrapper>
      <MainBase>
        <StyledPageTitle>Trick Mixer</StyledPageTitle>
        <FormSection>{formToggle ? renderForm() : renderTricks()}</FormSection>
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
  display: flex;
  flex-direction: column;
`;

const StyledPageTitle = styled(PageTitle)`
  z-index: 30;
  margin-top: 5%;
  font-size: 8rem;
`;

const FormSection = styled.section`
  margin: 0 auto;
  /* border: 1px solid grey; */
  width: 80vw;
  height: fit-content;
  display: flex;
  justify-content: space-between;

  article {
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.white};
    font-size: 3rem;
    border-radius: 15px;
    line-height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 8rem;
    font-weight: 200;
  }

  #instructions-container {
    width: 35vw;
    height: 30vh;
    background-color: rgb(84, 104, 113, 0.6);
    p {
      text-align: left;

      :nth-child(1) {
        margin-bottom: 2rem;
      }
    }
  }

  #trick-container {
    width: 100%;
    background-color: rgb(75, 98, 109, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    font-size: 4rem;
    line-height: 45px;
    padding: 5rem 0;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.white};
    }
  }

  form {
    width: 35vw;
    height: 30vh;
    background-color: rgb(75, 98, 109);
    margin-top: 10%;
    padding: 2rem 8rem;
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.white};
    font-size: 3rem;
    font-weight: 200;
    line-height: 45px;
    border-radius: 15px;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: 3.5rem;
    color: ${(props) => props.theme.white};
    margin-top: 5%;
    font-weight: 800;
    span {
      padding-right: 20px;
    }
    :hover {
      font-size: 3.8rem;
    }
  }
`;

const TricksSection = styled.section`
  border: 1px solid lightblue;

  height: 300px;
`;
export default TrickMixer;
