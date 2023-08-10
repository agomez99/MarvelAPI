import { useRouter } from "next/router";
import { getPostBySlug } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Card } from "tailwind-react-ui";
import { useAuth } from "@contexts/auth";
import { FillButton } from "tailwind-react-ui";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import ReactImageFallback from "react-image-fallback";
const ts = new Date().getTime();
import Head from "next/head";
import Image from "next/image";
const APIKEY = process.env.NEXT_PUBLIC_KEY;
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const PostPage = ({ post }) => {
  const router = useRouter();
  const [user] = useAuth();
  const [data, setData] = useState({});
  const [bio, setBio] = useState('');
  const [links, setLinks] = useState([]);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backColor, setBackColor] = useState(post.color);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
 
      setLoading(true);

      const { name, uid, marvelID } = post;

      try {
        const bioResponse = await fetch(`https://www.superheroapi.com/api.php/3913169345411392/${uid}/biography`);
        const bioData = await bioResponse.json();
        setData(bioData);

        if (bioData.error === "invalid id") {
          setData([{ name: "Nope", description: "Invalid ID" }]);
          setBio(post.bio);
          console.log("No superhero api info available");
        }

        const imageResponse = await fetch(`https://www.superheroapi.com/api.php/3913169345411392/${uid}/image`);
        const imageData = await imageResponse.json();

        if (imageData.error !== "invalid id") {
          setBackColor(imageData.url);
        }

        const characterResponse = await fetch(`https://gateway.marvel.com/v1/public/characters?name=${name}&apikey=${APIKEY}`);
        const characterData = await characterResponse.json();

        if (characterData.data.count < 1) {
          console.log("No Marvel api thumbnail image available");
          setImage(`${fallback}`);

        } else {
          setImage(`${characterData.data.results[0].thumbnail.path}.${characterData.data.results[0].thumbnail.extension}`);
        }

        setLinks(characterData.data.results[0].urls);
        if (characterData.data.results[0].urls.length < 3) {
          console.log("Links are missing");
        }

        const comicResponse = await fetch(`https://gateway.marvel.com:/v1/public/characters/${marvelID}/comics?apikey=${APIKEY}`);
        const comicData = await comicResponse.json();

        if (comicData === null) {
          setComics([{ name: "No comics found", description: "No comics found" }]);
        } else {
          setLoading(false);
          setComics(comicData.data.results);
          console.log(comicData.data.results);
        }

        if (characterData.data.results[0].description === "" || imageData.error === "invalid id") {
          console.log("Bio is not in Marvel api");
          setBio(post.bio);
        } else {
          setBio(characterData.data.results[0].description);
        }
      } catch (error) {
        console.log("Looks like there was a problem: \n", error);
      }
    };
    const title = titleCase(post.name) + " - Cardverse";
    setTitle(title);
    fetchData();
  }, [post.name]);


  if (!post && typeof window !== "undefined") {
    router.push("/404");
    return null;
  }

  if (!post) {
    return null;
  }

  const fallback = "https://i.ibb.co/LnPBDY1/icon.png";
  const avatarImage = image ||"https://i.ibb.co/ZGLW03w/loading1.gif";


  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/cardverse.png" />
      </Head>
      <div>
        <Card
          style={{
            backgroundImage: "linear-gradient(white," + backColor + ")",
          }}
        >
          <Row>
            <div className="cardheading" style={{ backgroundColor: backColor }}>
              <h1 className="nameTitle">{post.name}</h1>
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
            <div className="bio-div" style={{ backgroundColor: backColor }}>

                  <Image
                  src={avatarImage}
                  alt={post.name}
                  className="bio-image"
                  width={200}
                  height={200}
                />
              <div className="bio-stats">
                <h1 className="bio-sec">Full Name - </h1>
                <h1>{data["full-name"]}</h1>
                <h1 className="bio-sec">Place Of Birth - </h1>
                <h1> {data["place-of-birth"]} </h1>
                <h1 className="bio-sec">First Appearance</h1>
                <br></br> <p> {data["first-appearance"]} </p>
                <h1 className="bio-sec">Aliasas: </h1>
                <br></br>
                {data.aliases &&
                  data.aliases.map((item) => (
                    <li key={item.toString()} style={{ listStyle: "inside" }}>
                      {item}
                    </li>
                  ))}
              </div>
              <div>
                <p className="bio-p"> {bio}</p>
              </div>
            </div>
            <div className="link-div">
              <p style={{ textAlign: "center" }}>Links</p>

              <ul className="linksdiv">
                {loading && <p className="loading">Loading...</p>} {links.map(({ url, type }, i) => (
                  <li className="links" key={i}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {titleCase(type)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
          <Row>
            <div className="comics-div" style={{ backgroundColor: backColor }}>
              <p className='comic-header'>Comics</p>
              {loading ? (<p className="loading">Loading...</p>):(

              <ul className="comicsdiv">
                {comics.map(({ title, thumbnail }, i) => (
                  <li className="comics" key={i}>
                    <p className="comic-title"> {title}</p>
                    <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} className="comic-image" />

                  </li>
                ))}
              </ul>
              )}
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


  return {
    props: {
      post
    },
  };
}

export default PostPage;
