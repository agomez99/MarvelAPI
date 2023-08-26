import { useRouter } from "next/router";
import { getPostBySlug } from "@lib/firebase";
import { Layout } from "@components";
import { Col, Row, Card, FillButton } from "tailwind-react-ui";
import { useAuth } from "@contexts/auth";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from '@styles/bio.module.scss'

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
  const [backgroundCover, setBackGroundCover] = useState([]);
  const backgroundImage = comics[backgroundCover] && comics[backgroundCover].thumbnail.path + "." + comics[1].thumbnail.extension;
  //const backgroundImage = comics[0] && comics[0].thumbnail.path + "." + comics[1].thumbnail.extension;

  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false);
  const [backColor, setBackColor] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setBackGroundCover(post.background);
      setLoading(true);
      setBackColor(post.color);
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

        const comicResponse = await fetch(`https://gateway.marvel.com:/v1/public/characters/${marvelID}/comics?limit=50&apikey=${APIKEY}`);
        const comicData = await comicResponse.json();
        console.log(comicData)

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
  }, []);


  if (!post && typeof window !== "undefined") {
    router.push("/404");
    return null;
  }

  if (!post) {
    return null;
  }
  const displayMore = expanded ? comics : comics.slice(0, 9);
  const fallback = "https://i.ibb.co/LnPBDY1/icon.png";
  const avatarImage = image || "https://i.ibb.co/ZGLW03w/loading1.gif";

  return (
    <Layout >
    <div className={styles.BioPage}>

      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/cardverse.png" />
      </Head>
      <div>
        <Card
          className={styles.bioCard}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Row>
            <div className={styles.cardHeading}>
              <h1 className={styles.nameTitle}>{post.name}</h1>
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
                  className={styles.featimg}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <div className={styles.bioDiv} style={{ backgroundColor: backColor }}>
              <Image
                src={avatarImage}
                alt={post.name}
                className={styles.bioImage}
                width={200}
                height={200}
              />

              <div className={styles.bioStats}>
                <p className={styles.bioSec}>Full Name - </p>
                <p className={styles.bioSec}>{data["full-name"]}</p>
                <br></br>
                <p className={styles.bioSec} >Place Of Birth - </p>
                <p className={styles.bioSec} > {data["place-of-birth"]} </p>
                <br></br>
                <h1 className={styles.bioSec}>First Appearance: </h1>
                <br></br>
                <p className={styles.bioSec} > {data["first-appearance"]} </p>
                <br></br>
                <p className={styles.bioSec}>Aliasas: </p>
                <br></br>
                {data.aliases &&
                  data.aliases.map((item) => (
                    <li key={item.toString()}  className={styles.aliasas}>
                      {item}
                    </li>
                  ))}
              </div>
              <div>
                <p className={styles.bioP}> {bio}</p>
              </div>
            </div>

            <div className="link-div">
              <div className="links-header">
                <p >
                  Links
                </p>
              </div>

              <ul className="linksdiv">
                {loading && <p className="loading">Loading...</p>} {links.map(({ url, type }, i) => (
                  <li className="links" key={i}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {type}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
          <Row>
            <div className="comics-div" style={{ backgroundColor: backColor }}>
              <p className='comic-header'>Comics</p>
              {loading ? (<img src="https://i.ibb.co/ZGLW03w/loading1.gif" alt="loading" className="loading" />) : (

                <ul className="comicsdiv">
                  {displayMore.map(({ title, thumbnail, urls }, i) => (
                    <li className="comics" key={i}>
                      <a href={urls[0].url} target="_blank" rel="noopener noreferrer" className="comic-link">
                        <p className="comic-title"> {title}</p>
                        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} className="comic-image" />
                      </a>
                    </li>
                  ))}
                </ul>

              )}
              <div className="more-comics-div">
                <FillButton className="more-comics" type="button" onClick={() => setExpanded(comics)}>
                  {displayMore.length === comics.length ? "No More" : "More Comics"}
                </FillButton>
              </div>
            </div>

          </Row>

          <Row>
            <div className="dyn">
              <p className="dyn-header">
                DID YOU KNOW :
              </p>
              <p> {post.dyn}</p>
            </div>
          </Row>
        </Card>
      </div>
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
