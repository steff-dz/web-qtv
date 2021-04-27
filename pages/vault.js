import client from "../client";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { useState, useEffect } from "react";
import groq from "groq";
import { PageTitle } from "../components/PageTitle";
import { MainWrapper } from "../components/MainWrapper";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const query = groq`
    {
        "tricks": *[_type == 'tricks']{title, slug,
        'categories': categories[]-> title,
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

const Vault = ({ tricks }) => {
  const [tricksData, setTricksData] = useState("");
  const router = useRouter();

  function renderTricks() {
    //console.log(tricksData);
    console.log(tricksData);
    return tricksData.map((el, index) => (
      <li key={index} onClick={() => router.push(`/trick/${el.slug.current}`)}>
        {el.title}
      </li>
    ));
  }

  function filterTricks(e) {
    setTricksData("");
    setTricksData(
      tricks.tricks.filter((el) => el.categories[0] === e.target.innerHTML)
    );
  }

  return (
    <>
      <NavigationBar />
      <MainWrapper>
        <PageTitle>The Vault of Tricks</PageTitle>
        <SectionBase>
          <OptionContainer>
            <h2 onClick={(e) => filterTricks(e)}>Beginner</h2>
            <h2 onClick={(e) => filterTricks(e)}>Intermediate</h2>
            <h2 onClick={(e) => filterTricks(e)}>Advanced</h2>
          </OptionContainer>
          <ContentContainer>
            {tricksData ? (
              <ListBase>{renderTricks()}</ListBase>
            ) : (
              <p>Select a level from above to check out a list of tricks !</p>
            )}
          </ContentContainer>
        </SectionBase>
      </MainWrapper>
    </>
  );
};

const SectionBase = styled.section`
  margin: 0 auto;
  /* border: 1px solid lightgrey; */
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: lightblue; */
`;

const ContentContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  min-height: 60vh;
  background-color: #49aa9c;
  box-shadow: -1px 2px 9px 0px #000000;
  /* overflow: scroll;
  overflow-x: hidden; */
  p {
    padding: 5rem;
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-family: ${(props) => props.theme.textFont};
  }
`;

const OptionContainer = styled.div`
  /* border: 1px solid lightblue; */
  display: flex;
  justify-content: center;
  gap: 30px;

  h2 {
    font-size: ${(props) => props.theme.fontSizes[7]};
    font-family: ${(props) => props.theme.textFont};
    font-weight: 400;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ListBase = styled.ul`
  /* background-color: lightgrey; */

  list-style-position: inside;
  align-self: flex-start;
  padding: 1rem 2rem;

  li {
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-family: ${(props) => props.theme.textFont};
    padding: 0.5rem 0;
    cursor: pointer;
    &:hover {
      font-weight: 800;
    }
  }
`;

export default Vault;

//   const [tricksData, setTricksData] = useState("");

//   useEffect(() => {
//     if (tricks.length) {
//       setTricksData(tricks);
//     } else {
//       console.log("no tricks here yet bro");
//     }
//   }, [tricksData]);
