import { useRouter } from "next/router";
import { getPostBySlug } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Card, Button } from "tailwind-react-ui";
import Image from "next/image";
import { HorizontalBar } from "react-chartjs-2";
import { useAuth } from "@contexts/auth";
import { FillButton } from "tailwind-react-ui";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import ReactImageFallback from "react-image-fallback";
//const md5 = require('md5');
const ts = new Date().getTime();

//const hash = md5(ts+PRIVKEY+PUBKEY);

//console.log(hash);
//console.log(ts);
const APIKEY = "228a2cac6d893dce20244bdab584d41a";

const PostPage = ({ post }) => {
  const router = useRouter();
  const [user] = useAuth();

  const [data, setData] = useState([]);
  const [bio, setBio] = useState([]);

  const [stat, setStat] = useState([]);

  const getData = () => {
    fetch(
      "https://www.superheroapi.com/api.php/3913169345411392/" +
        post.uid +
        "/biography",

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        if ((response.error = "invalid id")) {
          //return  "Name not Found";
        }
        //console.log(data);
        // Read the response as json.
        return response.json();
      })
      .then(function (myJson) {
        // Do stuff with the JSON
        setData(myJson);
        //console.log(myJson);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
  };

  const getData2 = () => {
    fetch(
      "https://www.superheroapi.com/api.php/3913169345411392/" +
        post.uid +
        "/image",

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        if ((response.error = "invalid id")) {
          setStat(response);
        }
        // Read the response as json.
        return response.json();
      })
      .then(function (myJson) {
        // Do stuff with the JSON
        setStat(myJson);
        //console.log(myJson);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
  };
 

  const getBio = () => {
    const heros = post.name

    fetch(
      "http://gateway.marvel.com/v1/public/characters?name="+heros+"&apikey=" +
        APIKEY,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //console.log(response)
        // Read the response as json.
        return response.json();
      })
      .then(function (myJson) {
        // Do stuff with the JSON
        console.log(myJson);

        setBio(myJson.data.results[0].description);
        if(myJson.data.results[0].description == ""){
          setBio(post.bio);

        console.log("not in api")
        }
      })

      .catch(function (error) {
        console.log("bio not available")
        setBio(post.bio);

        console.log("Looks like there was a problem: \n", error);
      });
  };


  useEffect(() => {
    getData();
    getData2();
    getBio();
  }, []);

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
        <Card style={{ backgroundColor: "rgb(226, 235, 175)" }}>
          <Row>
            <div className="cardheading" style={{ backgroundColor: backColor }}>
              <h1 className="nameTitle">{post.name}</h1>
              <div className="logodiv">
                <div className="logo">
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
                <h1 className="idnum">{post.number}</h1>
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
                  className="featimg"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <div className="bio-div">
              <ReactImageFallback
                src={stat.url}
                fallbackImage="https://i.ibb.co/LnPBDY1/icon.png"
                initialImage="https://i.ibb.co/ZGLW03w/loading1.gif"
                alt={stat.imageAlt}
                className="bio-image"
              />
              <div className="bio-stats">
                <h1 className="bio-sec">Full Name - </h1>
                <h1>{data["full-name"]}</h1>
                <h1 className="bio-sec">First Appearance - </h1>
                <h1> {data["first-appearance"]} </h1>
                <h1 className="bio-sec">Place Of Birth - </h1>
                <h1> {data["place-of-birth"]} </h1>
                <h1 className="bio-sec">Aliasas: </h1>
                <br></br>
                {data.aliases &&
                  data.aliases.map((item) => (
                    <li key={item.toString()} style={{ listStyle: "inside" }}>
                      {item}
                    </li>
                  ))}
              </div>
              <p className="bio-p"> {bio}</p>
            </div>
          </Row>
          <Row>
            <div className="dyn">
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
  const bio = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
      bio,
    },
  };
}

export default PostPage;
