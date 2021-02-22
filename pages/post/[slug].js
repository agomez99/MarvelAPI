import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';
import { getPostBySlug } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Card } from 'tailwind-react-ui'
import Image from 'next/image';
const PostPage = ({ post }) => {
  const router = useRouter();
 
  if (!post && typeof window !== 'undefined') {
      router.push('/404');
      return;
  }

  if (!post) {
      return null;
  }


  return(
  <Layout>
    <div className={styles.PostPage}>
    <Card style={{backgroundColor:"rgb(226, 235, 175)", padding:"10px"}}>
    <Row>
        <div style={{backgroundColor:"rgb(74, 147, 230)", width:"100%",margin:"0px 0px", marginBottom:"5%"}}>
      <h1 style={{textAlign:"left", fontSize:"8vh", fontWeight:"bold", color:"white", textTransform:"upperCase"}}>{post.name}</h1>
      </div>
      </Row>
      <Row>
        <Col w="1/4" bg="grey-light" text="center" p="4">
            {/* <img src={post.image} alt={post.imageAlt} /> */}
            <img src={post.image2} alt={post.imageAlt}  />

        </Col>
        <Col  w="1/2">
        <Image
          src="/chart.png"
        alt="Picture of the author"
        width={500}
        height={500}></Image>
        </Col>
      </Row>
      <Row>
      <div  style={{backgroundColor:"white", padding:"20px"}}>
        <p style={{fontSize:"1.5vh"}}> {post.bio }</p>
      </div>
      </Row>

      <Row>
      <div  style={{backgroundColor:"rgb(226, 235, 175)", padding:"10px", borderWidth:"2px",borderColor:"black"}}>
        <p style={{fontSize:"1.5vh", fontWeight:"bold"}}>DID YOU KNOW :</p><p> {post.dyn}</p>
      </div>
      </Row>
      </Card>
</div>
  </Layout>
);

}
export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}


export default PostPage;
