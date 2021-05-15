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
import { useRouter } from "next/router";

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
  const [formToggle, setFormToggle] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (trickData) {
      setFormToggle(!formToggle);
    }
  }, [trickData]);

  const handleInput = (e) => {
    const choice = e.target.value;
    const exists = selectedLevels.find((e) => e === choice);
    if (exists) {
      setSelectedLevels(selectedLevels.filter((el) => el !== choice));
    } else {
      setSelectedLevels([...selectedLevels, choice]);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    //conditional to filter out the tricks accordiong to the selected level---------
    let filteredTricks = [];
    if (selectedLevels.length === 3) {
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
      let num = Math.floor(Math.random() * filteredTricks.length);
      if (numArray.indexOf(num) === -1) numArray.push(num);
    }

    //finding random trick w/ random number & putting it into new array
    numArray.forEach((num) => {
      randomSet.push(filteredTricks[num]);
    });
    setTrickData(randomSet);
  }

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
          <div>
            <Input
              type={"checkbox"}
              id={"beginnerLvl"}
              name={"beginnerLvl"}
              value={"Beginner"}
              title={"Beginner Level"}
              handleInput={handleInput}
              selectedLevels={selectedLevels}
            />

            <Input
              type={"checkbox"}
              id={"intermediateLvl"}
              name={"intermediateLvl"}
              value={"Intermediate"}
              title={"Intermediate Level"}
              handleInput={handleInput}
              selectedLevels={selectedLevels}
            />
            <Input
              type={"checkbox"}
              id={"advancedLvl"}
              name={"advancedLvl"}
              value={"Advanced"}
              title={"Advanced Level"}
              handleInput={handleInput}
              selectedLevels={selectedLevels}
            />
          </div>

          <button type="submit">
            GO <FontAwesomeIcon size="xs" icon={faArrowRight} />
          </button>
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
        <ImageContainer />
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
  position: relative;
`;

const ImageContainer = styled.div`
  background-image: url("/images/rail.jpeg");
  height: 100vh;
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  opacity: 0.5;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
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
  margin-top: 7%;
  font-size: 6.3rem;
  @media only screen and (max-width: 640px) {
    margin-top: 17%;
  }
`;

const FormSection = styled.section`
  margin: 0 auto;
  width: 80vw;
  height: 60vh;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.textSize};
  font-family: ${(props) => props.theme.textFont};
  font-weight: 200;

  article {
    color: ${(props) => props.theme.white};
    border-radius: 15px;
    width: 35vw;
    height: fit-content;
  }

  #instructions-container {
    background-color: rgb(84, 104, 113, 0.6);
    padding: 3rem 8rem;

    p {
      :nth-child(1) {
        margin-bottom: ${(props) => props.theme.spacing[5]};
      }
    }
  }

  #trick-container {
    width: 80%;
    margin: 0 auto;
    background-color: rgb(75, 98, 109, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => props.theme.spacing[5]};
    padding: ${(props) => props.theme.spacing[5]} 0;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.white};
      :hover {
        font-weight: 400;
        letter-spacing: ${(props) => props.theme.spacing[2]};
        transition: 0.3s;
      }
    }
  }

  form {
    background-color: rgb(75, 98, 109);
    width: 35vw;
    height: fit-content;
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.white};
    font-weight: 200;
    border-radius: 15px;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 8rem;

    div {
      width: fit-content;
    }
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: ${(props) => props.theme.buttonFont};
    color: ${(props) => props.theme.white};
    font-weight: 800;
    margin-top: ${(props) => props.theme.spacing[3]};
    span {
      padding-right: 20px;
    }
    :hover {
      font-size: 3.8rem;
    }
  }

  @media only screen and (max-width: 950px) {
    /* font-size: 2rem; */

    #instructions-container,
    form {
      padding: 3rem 4rem;
    }

    button {
      font-size: 2.5rem;
      :hover {
        font-size: 3rem;
      }
    }
  }

  @media only screen and (max-width: 750px) {
    /* flex-direction: column; */
    width: 100vw;
    height: 100vh;
    /* border: 1px solid orange; */
    justify-content: normal;
    gap: 65px;

    #instructions-container {
      /* background-color: rgb(75, 98, 109); */
      /* border: 1px solid blue; */
      width: 40vw;
      margin-left: 30px;
    }

    form {
      justify-self: flex-end;
      width: 40vw;
    }
  }

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    #instructions-container {
      width: 80vw;
      margin-left: 0;
    }

    form {
      justify-self: normal;
      width: 80vw;
    }
  }

  @media only screen and (max-width: 415px) {
    gap: 50px;
    form {
      justify-self: normal;
    }
  }
`;

export default TrickMixer;
