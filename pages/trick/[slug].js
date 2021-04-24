import client from "../../client";
import groq from "groq";

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
    *[_type == 'tricks' && slug.current == '${slug}'][0]
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
  console.log(trick);
  return <h1>This is the Trick Page</h1>;
};

export default TrickPage;
