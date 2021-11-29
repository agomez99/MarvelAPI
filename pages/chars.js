import { getPosts } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Flex, Box } from "tailwind-react-ui";
import Image from "next/image";
import styles from "@styles/chars.module.scss";

const Characters = ({ post }) => {
  if (!post && typeof window !== "undefined") {
    router.push("/404");
    return;
  }

  if (!post) {
    return null;
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  return (
    <div>
      <Layout>
        <div className={styles.CharsPage}>
          <div className={styles.title}>
            <h1>Cardverse</h1>
            <Image src="/cardverse.png" alt="logo" width={300} height={300} />
          </div>
          <h1 className={styles.charindex}>Characters Index</h1>
          <div>
            <Row className={styles.charrow}>
              <Flex style={{ padding: "20px 50px 70px 20px" }}>
                <Box p={4} bg="grey-light" flex={1} text="left">
                  <Col>
                    <div>
                      {post
                        .sort((a, b) => a.number - b.number)
                        .map((post) => (
                          <a
                            href={`/post/${post.slug}`}
                            key={post.number.toString()}
                            className="indexChar"
                          >
                            {post.number} - {post.cardname}
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
};
export async function getServerSideProps(context) {
  const post = await getPosts(context.query.slug);

  return {
    props: {
      post,

    },
  };
}

export default Characters;
