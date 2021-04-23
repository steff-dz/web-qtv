import client from "../client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import groq from "groq";
import { PageTitle } from "../components/PageTitle";
import { MainWrapper } from "../components/MainWrapper";

export async function getStaticProps() {
  const query = groq`
    {
        "tricks": *[_type == 'tricks']{title,
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

  function renderTricks() {
    //console.log(tricksData);
    return tricksData.map((el, index) => <li key={index}>{el.title}</li>);
  }

  function filterTricks(e) {
    setTricksData("");
    setTricksData(
      tricks.tricks.filter((el) => el.categories[0] === e.target.innerHTML)
    );
  }

  return (
    <MainWrapper>
      <PageTitle>The Vault of Tricks</PageTitle>
      <SectionBase>
        <OptionContainer>
          <h2 onClick={(e) => filterTricks(e)}>Beginner</h2>
          <h2 onClick={(e) => filterTricks(e)}>Intermediate</h2>
          <h2 onClick={(e) => filterTricks(e)}>Advanced</h2>
        </OptionContainer>
        {tricksData ? (
          <ul>{renderTricks()}</ul>
        ) : (
          <p>Select a level to check out a list of tricks.</p>
        )}
      </SectionBase>
    </MainWrapper>
  );
};

const SectionBase = styled.section`
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 20rem;
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-family: ${(props) => props.theme.textFont};
  }
`;

const OptionContainer = styled.div`
  border: 1px solid lightblue;
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

export default Vault;

//   const [tricksData, setTricksData] = useState("");

//   useEffect(() => {
//     if (tricks.length) {
//       setTricksData(tricks);
//     } else {
//       console.log("no tricks here yet bro");
//     }
//   }, [tricksData]);
