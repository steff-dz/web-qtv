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
  console.log(tricks);

  return (
    <MainWrapper>
      <PageTitle>The Vault of Tricks</PageTitle>
    </MainWrapper>
  );
};

export default Vault;

//   const [tricksData, setTricksData] = useState("");

//   useEffect(() => {
//     if (tricks.length) {
//       setTricksData(tricks);
//     } else {
//       console.log("no tricks here yet bro");
//     }
//   }, [tricksData]);
