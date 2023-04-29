import { getPosts } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Flex } from "tailwind-react-ui";
import Image from "next/image";
import styles from "@styles/chars.module.scss";
import router from "next/router";

export default function Characters({ post }) {

  function titleCase(str) { 
    const splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  if (!post && typeof window !== "undefined") {
    router.push("/404");
    return null;
  }

  if (!post) {
    return null;
  }

  const sliceChunk = (chunkSize, arr) => {
    const res = [];
    for (let i=0; i<arr.length; i+=chunkSize) {
      res.push(arr.slice(i, i+chunkSize));
    }
    return res;
  }

  const postChunks = sliceChunk(50, post.sort((a,b) => a.number - b.number));

  return (
    <Layout>
      <div className={styles.CharsPage}>
        <div className={styles.title}>
          <h1>Cardverse</h1>
          <Image src="/cardverse.png" alt="logo" width={300} height={300} />
        </div>
        <h1 className={styles.charindex}>Characters Index</h1>
          <div>
              <Flex style={{ padding: "20px 50px 70px 20px", backgroundColor:"black" }}>
                {postChunks.map((chunk, index) => (
                  <Col w="1/2" key={`chunk${index}`}>
                    <div className={styles.charrow}>
                      {chunk.map((post) => (
                        <a
                          href={`/post/${post.slug}`}
                          key={post.number.toString()}
                          className="indexChar"
                        >
                          <div className="imageDiv">
                            <img
                              src={post.imageAlt}
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
