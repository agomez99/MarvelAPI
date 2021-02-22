// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import styles from '@styles/index.module.scss';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Card } from 'tailwind-react-ui'
import Head from 'next/head';
const HomePage = ({ posts }) => (
  <div>
    <Layout>
<Head>
  <title>Cardverse</title>
  <link rel="shortcut icon" href="/favicon.ico" />

</Head>
      <div className={styles.HomePage}>
        <h1>Blog Posts</h1>
        <Row gutter style={{display:"flex", flexDirection:'row'}} >
          {posts.slice(0, 5).map((post) => (
            <Card>
            <article key={post.slug}>
              <a href={`/post/${post.slug}`}>
                <h2>{post.name}</h2></a>
          <img src={post.image} alt={post.imageAlt} />
                {/* <img src={post.image2} alt={post.imageAlt} /> */}

                <div>
                  {/* <p
              dangerouslySetInnerHTML={{
                __html: `${post.bio.substring(0, 200)}...`,
              }}
            >
            </p>*/}
                  {/* <a href={`/post/${post.slug}`}>Continue Reading</a> */}

                  {/* <p>Affiliations: {post.affiliations}</p>  */}
                </div>
              </article>
            </Card>
          ))}
        </Row>
        <Row gutter>
          {posts.slice(5, 10).map((post) => (
            <Card>
              <article key={post.slug}>
              <a href={`/post/${post.slug}`}>
                <h2>{post.name}</h2></a>
          <img src={post.image} alt={post.imageAlt} />
                {/* <img src={post.image2} alt={post.imageAlt} /> */}

                <div>
                  {/* <p
              dangerouslySetInnerHTML={{
                __html: `${post.bio.substring(0, 200)}...`,
              }}
            >
            </p>*/}
                  {/* <a href={`/post/${post.slug}`}>Continue Reading</a> */}

                  {/* <p>Affiliations: {post.affiliations}</p>  */}
                </div>
              </article>
            </Card>
          ))}
        </Row>
        <Row gutter>
          {posts.slice(11, 15).map((post) => (
            <Card>
              <article key={post.slug}>
                <h2>{post.name}</h2>
                <a href={`/post/${post.slug}`}>Continue Reading
          <img src={post.image} alt={post.imageAlt} /></a>
                {/* <img src={post.image2} alt={post.imageAlt} /> */}

                <div>
                  {/* <p
              dangerouslySetInnerHTML={{
                __html: `${post.bio.substring(0, 200)}...`,
              }}
            >
            </p>*/}
                  {/* <a href={`/post/${post.slug}`}>Continue Reading</a> */}

                  {/* <p>Affiliations: {post.affiliations}</p>  */}
                </div>
              </article>
            </Card>
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
