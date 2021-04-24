import client from "../../client";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { MainWrapper } from "../../components/MainWrapper";
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
    <MainWrapper>
      <PageTitle>{trick && trick.title}</PageTitle>
      <ArticleBase>
        {trick && <img src={trick.mainImage.asset.url} />}
        <h2>Description:</h2>
        <p>{trick && <BlockContent id="descrip" blocks={trick.body} />}</p>
      </ArticleBase>
    </MainWrapper>
  );
};

const ArticleBase = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  gap: 20px;

  h2 {
    font-size: ${(props) => props.theme.fontSizes[8]};
  }

  p {
    font-size: ${(props) => props.theme.fontSizes[7]};
  }

  img {
    width: 500px;
  }
`;

export default TrickPage;

// import imageUrlBuilder from "@sanity/image-url";

// const builder = imageUrlBuilder(client);

// function urlFor(source) {
//   return builder.image(source);
// }
