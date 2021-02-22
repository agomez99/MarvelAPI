import { useState } from 'react';
import { useRouter } from 'next/router';
import { getPostBySlug, updatePost } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';
import styles from '@styles/create.module.scss';

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
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="coverImage">url slug: </label>
            <input
              id="slug"
              type="text"
              value={values.slug}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Cover Image Alt</label>
            <input
              id="image"
              type="text"
              value={values.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image2">Cover Image Alt2</label>
            <input
              id="image2"
              type="text"
              value={values.image2}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              type="text"
              value={values.bio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="dyn">Did You Know?</label>
            <textarea
              id="dyn"
              type="text"
              value={values.dyn}
              onChange={handleChange}
            />
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
