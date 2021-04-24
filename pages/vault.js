import client from "../client";
import styled from "styled-components";
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
    <MainWrapper>
      <PageTitle>The Vault of Tricks</PageTitle>
      <SectionBase>
        <OptionContainer>
          <h2 onClick={(e) => filterTricks(e)}>Beginner</h2>
          <h2 onClick={(e) => filterTricks(e)}>Intermediate</h2>
          <h2 onClick={(e) => filterTricks(e)}>Advanced</h2>
        </OptionContainer>
        {tricksData ? (
          <ListBase>{renderTricks()}</ListBase>
        ) : (
          <p>Select a level to check out a list of tricks.</p>
        )}
      </SectionBase>
    </MainWrapper>
  );
};

const SectionBase = styled.section`
  margin: 0 auto;
  /* border: 1px solid lightgrey; */
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: lightblue; */

  p {
    margin-top: 20rem;
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
  margin-top: 2rem;
  list-style-position: inside;
  align-self: flex-start;

  li {
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-family: ${(props) => props.theme.textFont};
    padding: 0.5rem 0;
    cursor: pointer;
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
