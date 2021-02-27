import { useState } from 'react';
import {useRouter} from 'next/router';
import styles from '@styles/create.module.scss';
import { createPost } from '@lib/firebase'; // this is new
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';
import { TextInput, Button } from 'tailwind-react-ui'

const CreatePage = () => {
  const router = useRouter(); // this is new

  const [formValues, setFormValues] = useState({
    id:'',
    affiliations: '',
    bio: '',
    image: '',
    image2:'',
    imageAlt:'',
    name: '',
    slug: ' ',
    powerStrength:' ',
    powerSpeed: ' ' ,
    powerAgility: ' ',
    powerStamina: ' ',
    powerDurability: ' ',
    powerIntelligence: ' ',
  });
  const [isLoading, setIsLoading] = useState(false); // this is new
  const [user, userLoading] = useAuth();
  console.log(user, userLoading);
  if (userLoading) {
    return null;
  }
   
  if (!user && typeof window !== 'undefined') {
    router.push('/404');
    return null;
  }
  /*
  This is the function we're passing to each control so we can capture
  the value in it and store it in our `formValues` variable.
  */
  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setFormValues({ ...formValues, [id]: newValue });
  };

  /*
  This function is passed to the <form> and specifies what happens when
  the form is submitted. For now, we're going to log our `formValues`
  to verify that they are being managed correctly.
  
  Side note: we do not need to set an `onClick` for the <button> at the
  end of the form because it has type="submit". This allows us to click
  to submit the form or press the Enter key to submit it.
  */
 const handleSubmit = (e) => {
  // This prevents the default functionality of submitting a form
  e.preventDefault();

  // Check if there are any missing values.
  let missingValues = [];
  Object.entries(formValues).forEach(([key, value]) => {
    if (!value) {
      missingValues.push(key);
    }
  });

  // Alert and prevent the post from being created if there are missing values.
  if (missingValues.length > 1) {
    alert(`You're missing these fields: ${missingValues.join(', ')}`);
    return;
  }

  // Update the isLoading state.
  setIsLoading(true);

  // Start the attempt to create a new post.
  createPost(formValues)
    .then(() => {
      // Update the isLoading state and navigate to the home page.
      setIsLoading(false);
      router.push('/');
    })
    .catch((err) => {
      // Alert the error and update the isLoading state.
      alert(err);
      setIsLoading(false);
    });
};

  return (
    <Layout>
    <div className={styles.CreatePage}>
      <form onSubmit={handleSubmit}>
        <h1>Create a new post</h1>
        <div>
          <label htmlFor="id">ID#</label>
          <TextInput
            id="id"
            type="number"
            value={formValues.idnum}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <TextInput
            id="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <TextInput
            id="slug"
            type="text"
            value={formValues.slug}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Cover Image URL</label>
          <TextInput
            id="image"
            type="text"
            value={formValues.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image2">Cover2 Image URL</label>
          <TextInput
            id="image2"
            type="text"
            value={formValues.image2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imageAlt">Cover Image Alt</label>
          <TextInput
            id="imageAlt"
            type="text"
            value={formValues.coverimageAlt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="powerStrength">Strength</label>
          <TextInput
            id="powerStrength"
            type="text"
            value={formValues.powerStrength}
            onChange={handleChange}
          />
        </div>        <div>
          <label htmlFor="powerSpeed">Speed</label>
          <TextInput
            id="powerSpeed"
            type="text"
            value={formValues.powerSpeed}
            onChange={handleChange}
          />
        </div>        <div>
          <label htmlFor="powerAgility">Agility</label>
          <TextInput
            id="powerAgility"
            type="text"
            value={formValues.powerAgility}
            onChange={handleChange}
          />
        </div>        <div>
          <label htmlFor="powerStamina">Stamina</label>
          <TextInput
            id="powerStamina"
            type="text"
            value={formValues.powerStamina}
            onChange={handleChange}
          />
        </div>        <div>
          <label htmlFor="powerDurability">Durability</label>
          <TextInput
            id="powerDurability"
            type="text"
            value={formValues.powerDurability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="powerIntelligence">Intelligence</label>
          <TextInput
            id="powerIntelligence"
            type="text"
            value={formValues.powerIntelligence}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Bio</label>
          <textarea className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4"
            id="bio"
            value={formValues.bio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
    </Layout>
  );
};

export default CreatePage;
