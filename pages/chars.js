import styles from "@styles/index.module.scss";
import { getPosts } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Flex, Box } from "tailwind-react-ui";
import Image from "next/image";
import GoogleAnalytics from "./googleAnalytics";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@contexts/auth";
import { getPostBySlug } from "@lib/firebase";

const APIKEY = "228a2cac6d893dce20244bdab584d41a";

const Characters = ({ post }) => {


  if (!post && typeof window !== "undefined") {
    router.push("/404");
    return;
  }

  if (!post) {
    return null;
  }

  //Links text first letter to uppercase
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

 

  return (
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
                    {post.sort((a, b) => a.number - b.number).map((post) => (
                    <a href={`/post/${post.slug}`} key={post.number.toString()}  key={post.number.toString()} className="indexChar">
 
                        {post.number} - {post.cardname}
                        {/* {post.number} - {titleCase(post.cardname)} */}
                        <img
                        src={post.imageAlt}
                        alt={post.imageAlt}
                        className="featimglist"
                      />
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
                    }
                    export async function getServerSideProps(context) {
                      const post = await getPosts(context.query.slug);
                      const bio = await getPosts(context.query.slug);
                      const links = await getPosts(context.query.slug);
                    
                      return {
                        props: {
                          post,
                          bio,
                          links,
                        },
                      };
                    }

export default Characters;



