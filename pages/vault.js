import client from "../client";
import groq from "groq";
import { useState, useEffect } from "react";

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
  //   const [tricksData, setTricksData] = useState("");

  //   useEffect(() => {
  //     if (tricks.length) {
  //       setTricksData(tricks);
  //     } else {
  //       console.log("no tricks here yet bro");
  //     }
  //   }, [tricksData]);

  return (
    <div>
      <h1>The Vault</h1>
    </div>
  );
};

export default Vault;
