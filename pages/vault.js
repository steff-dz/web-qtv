import client from "../client";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import { useState, useEffect } from "react";
import groq from "groq";
import { PageTitle } from "../components/PageTitle";
import { Wrapper } from "../components/Wrapper";
import { useRouter } from "next/router";

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
  console.log(data);

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
    return tricksData.map((el, index) => (
      <h3 key={index} onClick={() => router.push(`/trick/${el.slug.current}`)}>
        {el.title}
      </h3>
    ));
  }

  function filterTricks(e) {
    setTricksData("");
    setTricksData(
      tricks.tricks.filter((el) => el.tags[0] === e.target.innerHTML)
    );
  }

  return (
    <>
      <NavigationBar />-
      <Wrapper>
        <main>
          <PageTitle>The Vault of Tricks</PageTitle>
          <SectionBase>
            <OptionContainer>
              <h2 onClick={(e) => filterTricks(e)}>Beginner</h2>
              <h2 onClick={(e) => filterTricks(e)}>Intermediate</h2>
              <h2 onClick={(e) => filterTricks(e)}>Advanced</h2>
            </OptionContainer>
            <ArticleBase>
              {tricksData ? (
                renderTricks()
              ) : (
                <p>Select a level from above to check out a list of tricks</p>
              )}
            </ArticleBase>
          </SectionBase>
        </main>
      </Wrapper>
    </>
  );
};

const SectionBase = styled.section`
  margin: 0 auto;
  margin-top: ${(props) => props.theme.spacing[5]};
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArticleBase = styled.article`
  margin-top: ${(props) => props.theme.spacing[5]};
  background-color: rgb(14, 17, 17, 0.2);
  border-radius: 15px;
  padding: ${(props) => props.theme.spacing[6]};
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing[5]};
  justify-content: center;

  p {
    font-size: ${(props) => props.theme.fontSizes[6]};
    color: ${(props) => props.theme.white};
  }

  h3 {
    font-size: 4rem;
    color: ${(props) => props.theme.teal};
    font-family: ${(props) => props.theme.textFont};
    cursor: pointer;

    :nth-child(even) {
      padding-top: ${(props) => props.theme.spacing[2]};
    }
    :nth-child(odd) {
      color: ${(props) => props.theme.green};
      font-size: 5rem;
    }
    &:hover {
      font-weight: 100;
    }
  }
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[6]};

  h2 {
    font-size: ${(props) => props.theme.fontSizes[7]};
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.black};
    font-weight: 400;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Vault;
