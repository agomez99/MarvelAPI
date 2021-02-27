import { useState } from 'react';
import { useRouter } from 'next/router';
import { getPostBySlug, updatePost } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';
import styles from '@styles/create.module.scss';
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
        router.push(`/post/${post.slug}`);
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
          <h1>Edit For : {post.slug}</h1>

          <div>
          <label htmlFor="id">ID#</label>
          <TextInput
            id="id"
            type="text"
            value={values.id}
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
          <label htmlFor="coverImageAlt">Strength</label>
          <TextInput
            id="powerStrength"
            type="text"
            value={values.powerStrength}
            onChange={handleChange}
          />
        </div>       
         <div>
          <label htmlFor="powerSpeed">Speed</label>
          <TextInput
            id="powerSpeed"
            type="text"
            value={values.powerSpeed}
            onChange={handleChange}
          />
        </div>        <div>
          <label htmlFor="powerAgility">Agility</label>
          <TextInput
            id="powerAgility"
            type="text"
            value={values.powerAgility}
            onChange={handleChange}
          />
        </div>        <div>
          <label htmlFor="powerStamina">Stamina</label>
          <TextInput
            id="powerStamina"
            type="text"
            value={values.powerStamina}
            onChange={handleChange}
          />
        </div>        <div>
          <label htmlFor="powerDurability">Durability</label>
          <TextInput
            id="powerDurability"
            type="text"
            value={values.powerDurability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="powerIntelligence">Intelligence</label>
          <TextInput
            id="powerIntelligence"
            type="text"
            value={values.powerIntelligence}
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
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
