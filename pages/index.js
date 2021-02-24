// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import styles from '@styles/index.module.scss';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Card } from 'tailwind-react-ui'
import Head from 'next/head';
import "tailwindcss/tailwind.css";

const HomePage = ({ posts }) => (

  <div>
    <Layout>
      <Head>
        <title >Cardverse</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet"></link>
      </Head>
              <h1 style={{ color: "black", fontSize: "3.5rem", fontFamily:"Bangers" }}>Characters</h1>

      <div className="hdr">
        <Row gutter  >
          {posts.slice(0, 100).map((post) => (

              <article key={post.slug}>

            <a href={`/post/${post.slug}`}>
              <h2 style={{ color: "white", fontSize: "2.3rem", fontFamily:"Bangers" }}>{post.name}</h2>
            </a>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={post.image} alt={post.imageAlt} />
                    </div>
                    <div className="flip-card-back">
                      <img src={post.image2} alt={post.imageAlt} />
                    </div>
                  </div>
                </div>
              </article>

          ))}
        </Row>
      </div>

    </Layout>
  </div>

);
// This is for fetching data every time the page is visited. We do this
// so that we don't have to redploy the site every time we add a blog post.
// You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;
