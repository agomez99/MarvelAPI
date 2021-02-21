// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import styles from '@styles/index.module.scss';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Card } from 'tailwind-react-ui'

const HomePage = ({ posts }) => (
  <Layout>
    <div className={styles.HomePage}>
      <h1>Blog Posts</h1>
<Row gutter>
  {posts.slice(0, 10).map((post) => (
        <article key={post.slug}>
        <h2>{post.name}</h2>
        <a href={`/post/${post.slug}`}>Continue Reading</a>

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
      ))}    
</Row>
    </div>

    </Layout>

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
