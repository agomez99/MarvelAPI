import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from '@styles/signin.module.scss';
import {Field, Label, TextInput, FillButton} from 'tailwind-react-ui';
import { Layout } from '@components';

const SignInPage = () => {
  const router = useRouter();
  const {user, userLoading} = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  if (user && typeof window !== 'undefined') {
    router.push('/');
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

    signIn(values.email, values.password).catch((err) => {
      alert(err);
    });
  };

  return (
    <Layout>
    <div className={styles.SignIn}>
      <form onSubmit={handleSubmit}>
        <h1>Please Sign In</h1>
        <Label htmlFor="email">Email</Label>
        <TextInput
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Label htmlFor="password">Password</Label>
        <TextInput
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <FillButton type="submit" >Sign In</FillButton>
        <FillButton onClick={() => router.push('/') }>Home</FillButton>
      </form>
    </div>
    </Layout>
  );
};

export default SignInPage;
