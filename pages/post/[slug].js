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
const ts = new Date().getTime();


const APIKEY = process.env.NEXT_PUBLIC_KEY;

const PostPage = ({ post }) => {
  const router = useRouter();
  const [user] = useAuth();

  const [data, setData] = useState([]);
  const [bio, setBio] = useState([]);
  const[links, setLinks] = useState([]);
  const [stat, setStat] = useState([]);
  const [image, setImage] = useState([]);
  const getData = () => {
    const heros = post.name

    Promise.all([
      fetch("https://www.superheroapi.com/api.php/3913169345411392/" + post.uid + "/biography"),
      fetch("https://www.superheroapi.com/api.php/3913169345411392/" + post.uid + "/image"),
      fetch("https://gateway.marvel.com/v1/public/characters?name="+ heros + "&apikey=" + APIKEY)
      
    ])      .then(function (responses) {
      return Promise.all(responses.map(function (response) {
            // Read the response as json.
            return response.json();

          }))

        }).then(function (data) {
            // Do stuff with the JSON
            console.log(data)
            
            setData(data[0]);
            if(data[0].error == 'invalid id'){
              setData( [{ 
                "name": "Nope",
                "description": "Invalid ID"
                }] );
                console.log(data)
              console.log("No superhero api info available")
            }
            setStat(data[1])
            if(data[1].error == 'invalid id'){
            }
            if(data[2].data.count < 1){
              setImage(data[1].url)
              console.log("No Marvel api thumbnail image available")
            }
            setImage(data[2].data.results[0].thumbnail.path + '.' +  data[2].data.results[0].thumbnail.extension)

            setLinks(data[2].data.results[0].urls);
            if(data[2].data.results[0].urls.length < 3){
              console.log("Links are missing")
              }

            setBio(data[2].data.results[0].description);
            if(data[2].data.results[0].description == ""){
              setBio(post.bio);
              console.log("Bio is not in Marvel api")
              }

          })
          .catch(function (error) {
            console.log("Looks like there was a problem: \n", error);
          });
  };

  useEffect(() => {
    getData();
  }, []);

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
  const backColor = post.color;
  const imageUrl = image;
  const fallback = "https://i.ibb.co/LnPBDY1/icon.png";
  //const fallback = {data[2].data.results[0].thumbnail.path;
  return (
    <Layout>
      <div>
        <Card  style={{ backgroundImage:"linear-gradient(white,"+backColor +")"}}>
          <Row>
            <div className="cardheading" style={{ backgroundColor: backColor }}>
              <h1 className="nameTitle">{post.name}</h1>
              {/* <h1 className="nameTitle">{post.cardname}</h1> */}

              <div className="logodiv">
                <div className="logo">
                  <img
                    className="marvel-lg"
                    style={{
                      float: "right",
                    }}
                    src="/logo.png"
                    alt="Marvel logo"
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
            <div className="bio-div"  style={{ backgroundColor: backColor }} >
              <ReactImageFallback
                src={imageUrl}
                fallbackImage={fallback}
                initialImage="https://i.ibb.co/ZGLW03w/loading1.gif"
                alt={stat.imageAlt}
                className="bio-image"
              />
              <div className="bio-stats">
                <h1 className="bio-sec">Full Name - </h1>
                <h1>{data["full-name"]}</h1>
                <h1 className="bio-sec">Place Of Birth - </h1>
                <h1> {data["place-of-birth"]} </h1>
                <h1 className="bio-sec">First Appearance</h1><br></br> <p> {data["first-appearance"]} </p>

                <h1 className="bio-sec">Aliasas: </h1>
                <br></br>
                {data.aliases &&
                  data.aliases.map((item) => (
                    <li key={item.toString()} style={{ listStyle: "inside" }}>
                      {item}
                    </li>
                  ))}
              </div>
              <div >
                  <p className="bio-p"> {bio}</p>
                  </div>
            </div>
            <div className="link-div">
            <p style={{textAlign:"center"}}>Links</p>

            <ul className="linksdiv">
                { links.map(({ url, type }, i) => <li className="links" key={ i }><a   href={ url } target="_blank" rel="noopener noreferrer">{ titleCase(type) }</a></li>) }
              </ul>    
      </div>
          </Row>
          <Row>
 
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
  const links = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
      bio,
      links,
    },
  };
}

export default PostPage;
