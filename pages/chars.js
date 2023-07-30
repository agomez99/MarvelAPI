import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Flex } from 'tailwind-react-ui';
import ReactImageFallback from 'react-image-fallback';

import styles from '@styles/chars.module.scss';

export default function Characters({ post }) {

  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  const router = useRouter();
  const fallback = 'https://i.ibb.co/LnPBDY1/icon.png';

  if (!post && typeof window !== 'undefined') {
    router.push('/404');
    return null;
  }

  if (!post) {
    return null;
  }

  const sliceChunk = (chunkSize, arr) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      res.push(arr.slice(i, i + chunkSize));
    }
    return res;
  }

  const postChunks = sliceChunk(50, post.sort((a, b) => a.number - b.number));

  return (
    <Layout>
      <div className={styles.CharsPage}>
        <div className={styles.title}>
          <h1 className={styles.hero}>Cardverse</h1>
          <Image src="/cardverse.png" alt="logo" width={300} height={300} className={styles.logo} />
        </div>
        <h1 className={styles.charindex}>Characters Index</h1>
        <div>
          <Flex style={{ padding: '20px 50px 70px 20px', backgroundColor: 'black' }}>
            {postChunks.map((chunk, index) => (
              <Col w={{ def: 'full', sm: '1/2', md: '1/2', lg: '1/1', xl: '1/1' }} key={`chunk${index}`}>
                <div className={styles.charrow}>
                  {chunk.map((post) => (
                    <a href={`/characters/${post.slug}`} key={post.number.toString()} className="indexChar">
                      <div className="imageDiv">
                        <ReactImageFallback
                          src={post.imageAlt}
                          fallbackImage='https://i.ibb.co/LnPBDY1/icon.png'
                          initialImage="https://i.ibb.co/ZGLW03w/loading1.gif"
                          alt={post.imageAlt}
                          className="featimglist"
                        />
                        <p>{post.cardname}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </Col>
            ))}
          </Flex>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const post = await getPosts(context.query.slug);

  return {
    props: {
      post,
    },
  };
}
