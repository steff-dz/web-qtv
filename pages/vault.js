import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import client from "../client";
import groq from "groq";
import NavigationBar from "../components/NavigationBar";
import { Wrapper } from "../components/Wrapper";
import { PageTitle } from "../components/PageTitle";

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

const Vault = ({ tricks }) => {
  const [tricksData, setTricksData] = useState("");
  const router = useRouter();

  function renderTricks() {
    return tricksData.map((el, index) => (
      <li
        key={index}
        role="listitem"
        aria-label="click to get trick details page"
        tabIndex="0"
        onKeyPress={(e) => handleKeyPress(e, "trick", el)}
        onClick={() => router.push(`/trick/${el.slug.current}`)}
      >
        {el.title}
      </li>
    ));
  }

  function filterTricks(e) {
    setTricksData("");
    setTricksData(
      tricks.tricks.filter((el) => el.tags[0] === e.target.innerHTML)
    );
  }

  const handleKeyPress = (e, type, element) => {
    console.log(type);
    if (e.key === "Enter" && type === "menu") {
      filterTricks(e);
    } else if (e.key === "Enter" && type === "trick") {
      router.push(`/trick/${element.slug.current}`);
    }
  };

  return (
    <Wrapper role="banner">
      <NavigationBar />
      <PageTitle>The Vault of Tricks</PageTitle>
      <main>
        <SectionBase>
          <OptionContainer role="menu">
            <h2
              role="menuitem"
              tabIndex="0"
              onKeyPress={(e) => handleKeyPress(e, "menu")}
              onClick={(e) => filterTricks(e)}
              aria-label="click to filter between trick levels"
            >
              Beginner
            </h2>
            <h2
              role="menuitem"
              tabIndex="0"
              onKeyPress={(e) => handleKeyPress(e, "menu")}
              onClick={(e) => filterTricks(e)}
              aria-label="click to filter between trick levels"
            >
              Intermediate
            </h2>
            <h2
              role="menuitem"
              tabIndex="0"
              onKeyPress={(e) => handleKeyPress(e, "menu")}
              onClick={(e) => filterTricks(e)}
              aria-label="click to filter between trick levels"
            >
              Advanced
            </h2>
          </OptionContainer>
          <ListBase>
            {tricksData ? (
              renderTricks()
            ) : (
              <p>Select a level from above to check out a list of tricks</p>
            )}
          </ListBase>
        </SectionBase>
      </main>
    </Wrapper>
  );
};

const SectionBase = styled.section`
  margin: 0 auto;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListBase = styled.ul`
  list-style: none;
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
    font-size: ${(props) => props.theme.textSize};
    color: ${(props) => props.theme.white};
    @media only screen and (max-width: 530px) {
      text-align: center;
    }
  }

  li {
    font-size: ${(props) => props.theme.textSize};
    color: ${(props) => props.theme.teal};
    font-family: ${(props) => props.theme.textFont};
    cursor: pointer;
    @media only screen and (max-width: 750px) {
      font-size: 2rem;
    }

    :nth-child(even) {
      padding-top: ${(props) => props.theme.spacing[2]};
      @media only screen and (max-width: 750px) {
        padding: 0;
        font-size: 2.3rem;
      }
    }
    :nth-child(odd) {
      color: ${(props) => props.theme.green};
      font-size: ${(props) => props.theme.fontSizes[6]};
      @media only screen and (max-width: 750px) {
        font-size: 2.3rem;
      }
    }
    &:hover {
      color: white;
    }
  }

  @media only screen and (max-width: 750px) {
    padding: 2rem;
    width: 100%;
    li {
      text-align: center;
    }
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[6]};

  h2 {
    font-size: ${(props) => props.theme.fontSizes[6]};
    font-family: ${(props) => props.theme.textFont};
    color: ${(props) => props.theme.black};
    font-weight: 400;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }

  @media only screen and (max-width: 530px) {
    gap: 1rem;
    h2 {
      font-size: 2rem;
    }
  }

  @media only screen and (max-width: 300px) {
    gap: 0.5rem;
  }
`;

export default Vault;
