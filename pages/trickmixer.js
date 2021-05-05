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
  // useEffect(() => {
  //   if (trickData === undefined || null) {
  //     console.log("its empty!");
  //   } else {
  //     console.log(trickData);
  //   }
  // }, [trickData]);

  //This is a helper function that could probably be moved outside
  function randomNum(max) {
    console.log("this is our max length", max);
    return Math.floor(Math.random() * (max - 1) + 1);
  }

  function testSubmit(e) {
    e.preventDefault();

    console.log(randomNum());
    console.log(selectedLevels);

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

    //pick a set of 6 random tricks from here
    console.log(filteredTricks);
    let randomSet = [];
    if (filteredTricks) {
      console.log(filteredTricks.length);
      for (let i = 0; i < 6; i++) {
        randomSet.push(filteredTricks[randomNum(filteredTricks.length + 1)]);
      }
    }

    console.log(randomSet);
    const cleanedSet = new Set(randomSet);
    const freshSet = [...cleanedSet];
    console.log(freshSet);

    //console.log("this is the filtered tricks length:", filteredTricks.length);

    // for (let i = 0; i < 6; i++) {
    //   console.log(randomNum(filterdTricks.length));
    // }
    //console.log(randomSet);
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

// function testSubmit(e) {
//   e.preventDefault();
//   console.log(selectedLevels);
//   //create a fetch call to sanity with the category matching the ones selected

//   let query = groq`
//     {
//      "${selectedLevels[0]}": *[_type == "tricks" && "${selectedLevels[0]}" in tags]{title, slug, tags},
//      "${selectedLevels[1]}": *[_type == "tricks" && "${selectedLevels[1]}" in tags]{title, slug, tags},
//      "${selectedLevels[2]}": *[_type == "tricks" && "${selectedLevels[2]}" in tags]{title, slug, tags},
//     }
//     `;

//   client
//     .fetch(query)
//     .then((data) => {
//       delete data.undefined;
//       let newData = [];
//       Object.entries(data).forEach((el) => newData.push(el));
//       console.log(newData);
//       setTrickData(newData);

//       //setTrickData([data]);
//     })
//     .catch(console.error);
// }

// let theseTricks = [];

//     if (selectedLevels.length === 1) {
//       theseTricks = tricks.tricks.filter(
//         (el) => el.tags[0] === selectedLevels[0]
//       );
//     } else if (selectedLevels.length === 2) {
//       console.log("two were ticked");
//       theseTricks.push(
//         tricks.tricks.filter((el) => el.tags[0] === selectedLevels[0])
//       );
//       theseTricks.push(
//         tricks.tricks.filter((el) => el.tags[0] === selectedLevels[1])
//       );
//     } else {
//       console.log("there were ticked");
//     }

//     console.log(theseTricks);
