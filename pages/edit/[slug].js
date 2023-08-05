import { useState } from 'react';
import { useRouter } from 'next/router';
import { getPostBySlug, updatePost } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';
import styles from '@styles/edit.module.scss';
import { TextInput, Button } from 'tailwind-react-ui'

const EditPage = ({ post }) => {
  const router = useRouter();
  const [user, userLoading] = useAuth();
  const [values, setValues] = useState(post);
  const [isLoading, setIsLoading] = useState(false);

  if (userLoading) {
    return null;
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }

  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setValues({ ...values, [id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let missingValues = [];
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    setIsLoading(true);
    updatePost(values)
      .then(() => {
        setIsLoading(false);
        router.push(`/characters/${post.slug}`);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div className={styles.EditPage}>
        <form onSubmit={handleSubmit}>
          <h1 style={{textAlign:"center", fontSize:"20px"}} id="editH1">Edit For :</h1>
          <h1 style={{textAlign:"center", fontSize:"20px", color:"purple", textTransform:"uppercase"}} id="postH1"> {post.name}</h1>

          <div>
          <label htmlFor="number">#</label>
          <TextInput
            id="number"
            type="text"
            value={values.number}
            onChange={handleChange}
          />
        </div>
          <div>
            <label htmlFor="name">Name: </label>
            <TextInput
              id="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name on Card: </label>
            <TextInput
              id="cardname"
              type="text"
              value={values.cardname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="slug">url slug: </label>
            <TextInput
              id="slug"
              type="text"
              value={values.slug}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Cover Image Alt</label>
            <TextInput
              id="image"
              type="text"
              value={values.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image2">Cover Image Alt2</label>
            <TextInput
              id="image2"
              type="text"
              value={values.image2}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="imageAlt">feature image</label>
            <TextInput
              id="imageAlt"
              type="text"
              value={values.imageAlt}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="color">Background Color</label>
            <TextInput
              id="color"
              type="text"
              value={values.color}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="color">UID</label>
            <TextInput
              id="uid"
              type="text"
              value={values.uid}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="dyn">Marvel Character ID #</label>
            <TextInput className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4"      
              id="marvelID"
              type="text"
              value={values.marvelID || ''}
              onChange={handleChange}
            />
          </div>
        <div>
          <div>
          <label htmlFor="bio">Bio</label>
          <textarea className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4"      
              id="bio"
              type="text"
              value={values.bio}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="dyn">Did You Know?</label>
            <textarea className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4"      
              id="dyn"
              type="text"
              value={values.dyn}
              onChange={handleChange}
            />
          </div>
        
          </div>
          <div style={{paddingBottom:"10px"}}>
          <Button style={{backgroundColor:"green", marginBottom:"15px"}} type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
          </div>
        </form>
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

export default EditPage;
