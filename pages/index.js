// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import styles from '@styles/index.module.scss';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Card } from 'tailwind-react-ui';
import Head from 'next/head';
import Image from 'next/image';
import GoogleAnalytics from "./googleAnalytics"

const HomePage = ({ posts }) => (

  <div>
    <Layout>
      <Head>
        <title>Cardverse</title>
        <link rel="shortcut icon" href="/cardverse.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet"></link>
        <meta property="og:url" content="https://cardverse.vercel.app/"/>
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Cardverse"/>
        <meta property="og:description"
          content="Marvel Cards Series 1"
        />
        <meta property="og:image" content="https://i.ibb.co/jRtDHr1/card.png"/>
      
        <meta property="fb:app_id" content="134816985125175" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Marvel Cardverse"/>
        <meta name="twitter:description" content="Cardverse"/>
        <meta name="twitter:image" content="https://i.ibb.co/jRtDHr1/card.png"/>
        <meta name="twitter:card" content="summary_large_image"/>

      </Head>
      <GoogleAnalytics />

      <div style={{backgroundColor:"rgba(0,0,0,0.5)", width:"100%", display:"flex",justifyContent:"center", alignItems:"center"}}>
      <h1 style={{ color: "white", fontSize: "5.5rem", fontFamily: "Bangers", textAlign: "center", paddingRight:"15px" }}>Cardverse</h1>
        <Image src="/cardverse.png"
          alt="Picture of the author"
          width={300}
          height={300} />
      </div>
      <h1 style={{marginTop:"5%", color: "white", fontSize: "3.5rem", fontFamily: "Bangers", textAlign: "center", backgroundColor:"rgba(0,0,0,0.5)",  }}>Characters</h1>
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
