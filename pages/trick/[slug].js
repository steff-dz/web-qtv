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
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      'categories': categories[]-> title,

    }
  `;

  const data = await client.fetch(query);
  //console.log(data);
  return {
    revalidate: 60 * 60 * 24,
    props: {
      trick: data,
    },
  };
}

const TrickPage = ({ trick }) => {
  //console.log(trick.mainImage.asset.url);

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <main>
          <PageTitle>{trick && trick.title}</PageTitle>
          <SectionBase>
            {trick.mainImage ? (
              <img src={trick.mainImage.asset.url} />
            ) : (
              "no picture here"
            )}
            <article>
              <h2>Description:</h2>
              <p>
                {trick && <BlockContent id="descrip" blocks={trick.body} />}
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
  /* flex-direction: column;
  align-items: flex-start; */
  width: 80%;
  min-height: 60%;
  margin: 0 auto;
  /* border: 1px solid white; */
  margin-top: 30px;
  background-color: whitesmoke;
  gap: 20px;
  box-shadow: 1px 4px 9px 4px rgba(0, 0, 0, 0.47);
  article {
    /* border: 1px solid red; */
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes[7]};
    padding: 1rem 0;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes[6]};
    padding: 0 1rem;
    letter-spacing: 2px;
    line-height: 40px;
  }

  img {
    width: 40%;
  }
`;

export default TrickPage;

// import imageUrlBuilder from "@sanity/image-url";

// const builder = imageUrlBuilder(client);

// function urlFor(source) {
//   return builder.image(source);
// }
