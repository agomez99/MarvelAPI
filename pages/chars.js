import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Flex } from 'tailwind-react-ui';
import ReactImageFallback from 'react-image-fallback';

import styles from '@styles/chars.module.scss';

export default function Characters({ post }) {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (!post && typeof window !== 'undefined') {
      router.push('/404');
    }
  }, [post, router]);

  if (!post) {
    return null;
  }
  function titleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }




  const sortAlphabetically = (post) => post.sort((a, b) => a.name.localeCompare(b.name));

  const sliceChunk = (chunkSize, arr) => {
    const filteredPosts = arr.filter(post =>
      post.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const res = [];
    for (let i = 0; i < filteredPosts.length; i += chunkSize) {
      res.push(filteredPosts.slice(i, i + chunkSize));
    }
    return res;
  };

  const postChunks = sliceChunk(40, sortAlphabetically(post));
  const filteredChunks = sliceChunk(40, sortAlphabetically(post));

  return (
    <Layout>
      <div className={styles.CharsPage}>
        <div className={styles.title}>
          <h1 className={styles.hero}>Cardverse</h1>
          <Image src="/cardverse.png" alt="logo" width={300} height={300} className={styles.logo} />
        </div>

        <div>
          <h1 className={styles.charindex}>Characters Index</h1>

          <div className={styles.searchbarDiv} style={{ backgroundColor: 'black' }}>
                        <input
                className={styles.searchbar}
                type="text"
                placeholder="Search Characters"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />         
           </div>


          <Flex style={{  backgroundColor: 'black' }} className="flexdisplay">

          {filteredChunks.map((chunk, index) => (
              <Col w={{ def: 'full', sm: '1/1', md: '1/2', lg: '1/1', xl: '1/1' }} key={`chunk${index}`}>
                {chunk.map((post) => (
                  <a href={`/characters/${post.slug}`} key={post.number.toString()} className="indexChar">
                  <p className={styles.charname}>{titleCase(post.name)}</p>

                    <div className="imageDiv">
                      <ReactImageFallback
                        src={post.imageAlt}
                        fallbackImage='https://i.ibb.co/LnPBDY1/icon.png'
                        initialImage="https://i.ibb.co/ZGLW03w/loading1.gif"
                        alt={post.imageAlt}
                        className={styles.imglist}
                      />
                    </div>

                  </a>
                ))}
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

