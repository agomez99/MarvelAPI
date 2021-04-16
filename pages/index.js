// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import styles from '@styles/index.module.scss';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Card } from 'tailwind-react-ui'
import Head from 'next/head';
import Image from 'next/image'

const HomePage = ({ posts }) => (

  <div>
    <Layout>
      <Head>
        <title>Cardverse</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet"></link>
      </Head>
      <div style={{backgroundColor:"rgba(0,0,0,0.5)", width:"100%", display:"flex",justifyContent:"center", alignItems:"center"}}>
      <h1 style={{ color: "white", fontSize: "5.5rem", fontFamily: "Bangers", textAlign: "center" }}>Cardverse</h1>
        <Image src="/cardverse.png"
          alt="Picture of the author"
          width={300}
          height={300} />
      </div>
      <h1 style={{ color: "white", fontSize: "3.5rem", fontFamily: "Bangers", textAlign: "center" }}>Characters</h1>
      <div>
        <Row gutter  >
          <Col className="hdr">
            {posts.slice(0, 100).map((post) => (
              <article key={post.powerStrength}>
                <div className="flip-card">
                  <a href={`/post/${post.slug}`}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <h2 style={{ color: "white", fontSize: "2.3rem", fontFamily: "Bangers" }}>{post.name}</h2>
                        <img src={post.image} alt={post.imageAlt} />
                      </div>
                      <div className="flip-card-back">
                        <h2 style={{ color: "white", fontSize: "2.3rem", fontFamily: "Bangers" }}>{post.name}</h2>
                        <img src={post.image2} alt={post.imageAlt} />
                      </div>
                    </div>
                  </a>
                </div>
              </article>
            ))}
          </Col>
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
