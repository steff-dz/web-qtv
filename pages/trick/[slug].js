import { useState, useEffect } from "react";
import client from "../../client";
import groq from "groq";
import NavigationBar from "../../components/NavigationBar";
import BlockContent from "@sanity/block-content-to-react";
import { Wrapper } from "../../components/Wrapper";
import { PageTitle } from "../../components/PageTitle";
import styled from "styled-components";

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  //Try and fetch data

  const query = groq`
    *[_type == 'tricks' && slug.current == '${slug}'][0]{
      title,
      slug,
      body,
      trickVideo,
      mainImage{
        asset->{
          url
        }
      }
    }
  `;

  //try {
  const data = await client.fetch(query);
  //} catch (error) {
  //console.log(error);
  //}

  //console.log(data);
  return {
    revalidate: 60 * 60 * 24,
    props: {
      trick: data,
    },
  };
}

const TrickPage = ({ trick }) => {
  //console.log(trick);
  //console.log(trick.mainImage.asset.url);
  const [thisTrick, setThisTrick] = useState("");

  useEffect(() => {
    if (trick) {
      setThisTrick(trick);
    } else {
      console.log("no trick yet");
    }
  }, [trick]);

  // useEffect(() => {
  //   console.log("this is our state trick:", thisTrick);
  // }, [thisTrick]);

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <main>
          <PageTitle>{trick && trick.title}</PageTitle>
          <SectionBase>
            {thisTrick.mainImage ? (
              <img src={thisTrick.mainImage.asset.url} />
            ) : (
              <img id="skeleton-pic" src="/images/skates.jpeg" />
            )}
            <article>
              <h2>Description:</h2>
              <p>
                {thisTrick && (
                  <BlockContent id="descrip" blocks={thisTrick.body} />
                )}
              </p>
            </article>
          </SectionBase>
        </main>
      </Wrapper>
    </>
  );
};

const SectionBase = styled.section`
  display: flex;
  width: 80%;
  min-height: 60%;
  margin: 0 auto;
  margin-top: 30px;
  background-color: whitesmoke;
  gap: 20px;
  box-shadow: 1px 4px 9px 4px rgba(0, 0, 0, 0.47);

  img {
    width: 40%;
  }

  #skeleton-pic {
    width: 300px;
    opacity: 0.7;
  }

  article {
    padding: ${(props) => props.theme.spacing[5]};
    h2 {
      font-size: ${(props) => props.theme.fontSizes[6]};
      padding: ${(props) => props.theme.spacing[4]};
    }

    p {
      font-size: ${(props) => props.theme.fontSizes[5]};
      padding: 0 ${(props) => props.theme.spacing[3]};
      letter-spacing: 2px;
      line-height: 40px;
    }
  }
`;

export default TrickPage;

// import imageUrlBuilder from "@sanity/image-url";

// const builder = imageUrlBuilder(client);

// function urlFor(source) {
//   return builder.image(source);
// }

// [0]{
//   title,
//   slug,
//   mainImage{
//     asset->{
//       _id,
//       url
//     }
//   },
//   body,
//   'categories': categories[]-> title,

// }
