import { useRouter } from "next/router";
import styles from "@styles/post.module.scss";
import { getPostBySlug } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Card, Button } from "tailwind-react-ui";
import Image from "next/image";
import { HorizontalBar } from "react-chartjs-2";
import { useAuth } from "@contexts/auth";
import { FillButton } from "tailwind-react-ui";
import "tailwindcss/tailwind.css";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
const md5 = require('md5');

const  ts = new Date().getTime();

// const hash = md5(ts+PRIVKEY+PUBKEY);


console.log(hash);
console.log(ts);

const PostPage = ({ post, data }) => {
  const router = useRouter();
  const [user] = useAuth();

let id = '';
if(post.name === "thor"){
  id = "659";
 
 }
 
if(post.name === "loki"){
  id ="414";
  console.log(id);
 
 }

 let [Id, setId] = useState(null)





  fetch("https://www.superheroapi.com/api.php/3913169345411392/"+ id +"/biography", {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  //Then with the data from the response in JSON...
  .then((data) => {
    console.log('Success:', data);
  })
  //Then with the error genereted...
  .catch((error) => {
    console.error('Error:', error);
  });


  if (!post && typeof window !== "undefined") {
    router.push("/404");
    return;
  }

  if (!post) {
    return null;
  }

  const backColor = post.color;

  // const data = {
  //   labels: [
  //     "STRENGTH",
  //     "SPEED",
  //     "AGILITY",
  //     "STAMINA",
  //     "DURABILITY",
  //     "INTELLIGENCE",
  //   ],
  //   datasets: [
  //     {
  //       label: "POWER RATINGS",
  //       backgroundColor: "red",
  //       borderColor: "black",
  //       color: "white",
  //       borderWidth: 3,
  //       data: [
  //         post.powerStrength,
  //         post.powerSpeed,
  //         post.powerAgility,
  //         post.powerStamina,
  //         post.powerDurability,
  //         post.powerIntelligence,
  //       ],
  //       barPercentage: 1.2,
  //     },
  //   ],
  // };



  return (
    
    <Layout >
      <div>
        <Card
          style={{ backgroundColor: "rgb(226, 235, 175)", padding: "10px" }}
        >
          <Row>
            <div
              style={{
                backgroundColor: backColor,
                width: "100%",
                margin: "0px 0px",
                marginBottom: "5%",
              }}
            >
              <h1>First Appearancedata{}</h1>
              <h1
                style={{
                  float: "left",
                  fontSize: "8vw",
                  fontWeight: "bold",
                  color: "white",
                  textTransform: "upperCase",
                }}
              >
                {post.name}
              </h1>

              <div style={{
                textAlign: "right",
                position:"relative" ,
                display:"block",          
                  }}>
                <div style={{height:"100%"}}>
              <Image
                style={{
                  float:"right",
                }}
                layout="intrinsic"
                src="/logo.png"
                alt="Picture of the author"
                layout="intrinsic"

                width={100}
                height={100}/>
                </div>
              <h1
                style={{ fontWeight:"bold",  textAlign: "center", fontSize: "40px", color: "black", position:"absolute", top:"22px",right:"27px" }}>{post.number}

              </h1>
              </div>


              {" "}
              {user && (
                <FillButton style={{ backgroundColor: "green" }}>
                  <a href={`/edit/${post.slug}`}>EDIT </a>
                </FillButton>
              )}
            </div>



          </Row>
          <Row>
            <Col w="full" bg="grey-light" text="center" p="4" >
              <div >
                <img
                  src={post.imageAlt}
                  alt={post.imageAlt}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "26rem",
                  }}
                />
                {/* <img src={post.image2} alt={post.imageAlt} /> */}
              </div>
            </Col>
          </Row>

          {/* <Row>
            <Col w="full" >

              <div style={{ width: "60%", margin: "20px auto" }} className="chart-div">
                <HorizontalBar 
                  data={data}
                  width={500}
                height={100}
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
          </Row> */}
          <Row>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              <p className="bio-p"> {post.bio}</p>
            </div>
          </Row>

          <Row>
            <div
              style={{
                backgroundColor: "rgb(226, 235, 175)",
                padding: "10px",
                marginTop: "10px",
                borderWidth: "2px",
                borderColor: "black",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <p style={{ fontSize: "1.5vh", fontWeight: "bold" }}>
                DID YOU KNOW :
              </p>
              <p> {post.dyn}</p>
            </div>
          </Row>
        </Card>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}

export default PostPage;
