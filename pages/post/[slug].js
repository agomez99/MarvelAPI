import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';
import { getPostBySlug } from '@lib/firebase';
import { Layout } from '@components';
import { Col, Row, Card, Button } from 'tailwind-react-ui'
import Image from 'next/image';
import { HorizontalBar } from 'react-chartjs-2';
import { useAuth } from '@contexts/auth';
import { FillButton } from 'tailwind-react-ui'
import "tailwindcss/tailwind.css";

const PostPage = ({ post }) => {
  const router = useRouter();
  const [user] = useAuth();

  if (!post && typeof window !== 'undefined') {
    router.push('/404');
    return;
  }

  if (!post) {
    return null;
  }

  const data = {

    labels: ['STRENGTH', 'SPEED', 'AGILITY',
      'STAMINA', 'DURABILITY', 'INTELLIGENCE'],
    datasets: [
      {
        label: 'POWER RATINGS',
        backgroundColor: 'red',
        borderColor: 'black',
        color: 'white',
        borderWidth: 3,
        data: [post.powerStrength, post.powerSpeed, post.powerAgility, post.powerStamina, post.powerDurability, post.powerIntelligence],
        barPercentage: 1.2,

      }
    ]
  }

  return (
    <Layout>
      <div>
        <Card style={{ backgroundColor: "rgb(226, 235, 175)", padding: "10px" }}>
          <Row>
            <div style={{ backgroundColor: "rgb(74, 147, 230)", width: "100%", margin: "0px 0px", marginBottom: "5%" }}>
              <h1 style={{ textAlign: "left", fontSize: "8vw", fontWeight: "bold", color: "white", textTransform: "upperCase" }}>{post.name}</h1>
              {user && (

                <FillButton style={{backgroundColor:"green"}}><a href={`/edit/${post.slug}`}>EDIT </a></FillButton>
              )}
            </div>
          </Row>
          <Row>
            <Col w="1/2" bg="grey-light" text="center" p="4" >
              <div style={{ display: "flex" }}>
                <img src={post.image} alt={post.imageAlt} />
                {/* <img src={post.image2} alt={post.imageAlt} /> */}
              </div>

            </Col>
            <Col w="1/2" >

              <div style={{ width: "100%", margin: "20px auto" }}>
                <HorizontalBar style={{ display: "flex" }}
                  data={data}
                  options={{
                    scales: {
                      xAxes: [{
                        ticks: {
                          beginAtZero: true,
                          min: 0,
                          max: 7,
                        }
                      }],
                    },
                    title: {
                      display: true,
                      text: 'POWER RATINGS',
                      fontSize: 40,
                      fontColor: ' black',

                    },
                    legend: {
                      display: true,
                      position: 'bottom',


                    },
                  }
                  }

                />
              </div>
            </Col>
          </Row>
          <Row>
            <div style={{ backgroundColor: "white", padding: "20px" }}>
              <p style={{ fontSize: "1.5vh" }}> {post.bio}</p>
            </div>
          </Row>

          <Row>
            <div style={{ backgroundColor: "rgb(226, 235, 175)", padding: "10px", borderWidth: "2px", borderColor: "black" }}>
              <p style={{ fontSize: "1.5vh", fontWeight: "bold" }}>DID YOU KNOW :</p><p> {post.dyn}</p>
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
