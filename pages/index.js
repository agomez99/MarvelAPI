import styles from "@styles/index.module.scss";
import { getPosts } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Container, Row } from "tailwind-react-ui";
import Head from "next/head";
import Image from "next/image";
import GoogleAnalytics from "./googleAnalytics";

const HomePage = ({ posts }) => (
  <div>
    <Layout className={styles.HomePage}>
      <div>
        <Head>
          <meta property="og:url" content="https://cardverse.vercel.app/" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Cardverse" />
          <meta property="og:description" content="Marvel Cards Series 1" />
          <meta
            property="og:image"
            content="https://i.ibb.co/jRtDHr1/card.png"
          />
          <meta property="fb:app_id" content="134816985125175" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Marvel Cardverse" />
          <meta name="twitter:description" content="Cardverse" />
          <meta
            name="twitter:image"
            content="https://i.ibb.co/jRtDHr1/card.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <title>Cardverse</title>
          <link rel="shortcut icon" href="/cardverse.png" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
        </Head>
        <GoogleAnalytics />
        <div className="banner">
          <h1 className="title">Cardverse</h1>
          <Image
            src="/cardverse.png"
            alt="logo"
            width={300}
            height={300}
            className="logo"
            priority
          />
        </div>
        <div>
          <Row gutter>
            <Col>
            <div className="card-container">
              {posts.sort((a, b) => a.number - b.number).map((post) => (
                <article key={post.number}>
                  <div className="flip-card">
                    <a href={`/characters/${post.slug}`}>
                      <h2 className="cardTitle">{post.name.substring(0, 25)}</h2>
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          <Image
                            src={post.image}
                            alt={post.imageAlt}
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '90%', height: '90%' }}
                            className="cardImage"
                          />
                        </div>
                        <div className="flip-card-back">
                          <Image
                            src={post.image2}
                            alt={post.imageAlt}
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '100%', height: '90%' }}

                          />
                        </div>
                      </div>
                    </a>
                  </div>
                </article>
              ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  </div>
);

export async function getServerSideProps() {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default HomePage;

