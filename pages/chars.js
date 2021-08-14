import styles from "@styles/index.module.scss";
import { getPosts } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Flex, Box } from "tailwind-react-ui";
import Head from "next/head";
import Image from "next/image";
import GoogleAnalytics from "./googleAnalytics";


const Characters = ({ posts }) => (
  <div>
    <Layout className={styles.HomePage}>
      <div>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "5.5rem",
              fontFamily: "Bangers",
              textAlign: "center",
              paddingRight: "15px",
            }}
          >
            Cardverse
          </h1>
          <Image src="/cardverse.png" alt="logo" width={300} height={300} />
        </div>
        <h1
          style={{
            marginTop: "5%",
            color: "white",
            fontSize: "3.5rem",
            fontFamily: "Bangers",
            textAlign: "center",
            backgroundColor: "rgba(1,0,0,1)",
          }}
        >
          Characters Index
        </h1>
        <div>
          <Row
            style={{
              color: "white",
              fontFamily: "Bangers",
              textAlign: "left",
              backgroundColor: "rgba(1,0,0,1)",
            }}
          >
            <Flex style={{ padding: "20px 50px 70px 20px" }}>
              <Box p={4} bg="grey-light" flex={1} text="left">
                <Col >
                <div >
                  {/* {posts.sort((a, b) => a.name.localeCompare(b.name)).map((post) => ( */}
                    {posts.sort((a, b) => a.number - b.number).map((post) => (

                    <a href={`/post/${post.slug}`}>
                      <li   key = {post.number} className="indexChar">
                        {post.number}-{post.name}
                      </li>
                    </a>
                  ))}
                  </div>
                </Col>{" "}
              </Box>
            </Flex>
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

export default Characters;



