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
//const md5 = require('md5');

const ts = new Date().getTime();

//const hash = md5(ts+PRIVKEY+PUBKEY);

//console.log(hash);
console.log(ts);

const PostPage = ({ post}) => {
  const router = useRouter();
  const [user] = useAuth();


  const [data, setData]= useState([]);
  const getData=()=>{
    fetch("https://www.superheroapi.com/api.php/3913169345411392/" + post.uid +"/biography",
    
    {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }



console.log(data)


  useEffect(()=>{
    getData()
  },[])


  // fetch(
  //   "https://www.superheroapi.com/api.php/3913169345411392/" +
  //     id +
  //     "/biography",
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }
  // )
  //   .then((response) => response.json())
  //   //Then with the data from the response in JSON...
  //   .then((data) => {
  //     console.log("Full Name: " + data["full-name"]);
  //     console.log("First Appearance: " + data["first-appearance"]);
  //     console.log("Place of Birth: " + data["place-of-birth"]);

  //   })
  //   //Then with the error genereted...
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  if (!post && typeof window !== "undefined") {
    router.push("/404");
    return;
  }

  if (!post) {
    return null;
  }

  const backColor = post.color;

  

  return (
    <Layout>
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
              <div
                style={{
                  textAlign: "right",
                  position: "relative",
                  display: "block",
                }}
              >
                <div style={{ height: "100%" }}>
                  <Image
                    style={{
                      float: "right",
                    }}
                    layout="intrinsic"
                    src="/logo.png"
                    alt="Picture of the author"
                    layout="intrinsic"
                    width={100}
                    height={100}
                  />
                </div>
                <h1
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "40px",
                    color: "black",
                    position: "absolute",
                    top: "22px",
                    right: "27px",
                  }}
                >
                  {post.number}
                </h1>
              </div>{" "}
              {user && (
                <FillButton style={{ backgroundColor: "green" }}>
                  <a href={`/edit/${post.slug}`}>EDIT </a>
                </FillButton>
              )}
            </div>
          </Row>
          <Row>
            <Col w="full" bg="grey-light" text="center" p="4">
              <div>
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
              </div>

            </Col>
          </Row>

           <Row>
            <Col w="full" >
            <div style={{alignItems:"center", marginLeft:"10%", marginBottom:"5%"}}>
      <h1 style={{color:"black", fontSize:"1.5rem", fontWeight:"bold", float:"left"}}>Full Name - </h1><h1 style={{color:"black", fontSize:"1.5rem"}}>{data["full-name"]}</h1>
      <h1 style={{color:"black", fontSize:"1.5rem",fontWeight:"bold", float:"left"}}>First Appearance -  </h1><h1 style={{color:"black", fontSize:"1.5rem"}}>  {data["first-appearance"]}</h1>
      <h1 style={{color:"black",fontSize:"1.5rem",fontWeight:"bold", float:"left"}}>Place Of Birth -  </h1><h1 style={{color:"black", fontSize:"1.5rem"}}> {data["place-of-birth"]}</h1>
      <h1 style={{color:"black", fontSize:"1.5rem",fontWeight:"bold", float:"left"}}>Aliasas:  </h1><br></br><br></br>
      {/* <h1 style={{color:"black", fontSize:"1.5rem"}}>{data.aliases} </h1> */}
      <div style={{ fontSize:"1.5rem"}}>
      {data.aliases && data.aliases.map((item) => (       
              <li style={{listStyle:"inside"}}>{item}</li>
         ))}
         </div>
              </div>
            </Col>
          </Row> 
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
