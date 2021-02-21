import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';
import { getPostBySlug } from '@lib/firebase';
import { Layout } from '@components';

const PostPage = ({ post }) => {
  const router = useRouter();
 
  if (!post && typeof window !== 'undefined') {
      router.push('/404');
      return;
  }

  if (!post) {
      return null;
  }


  return(
  <Layout>
  <div className={styles.PostPage}>
  <h1>{post.name}</h1>
    <img src={post.image} alt={post.imageAlt} />
    <img src={post.image2} alt={post.imageAlt} />

    <p dangerouslySetInnerHTML={{ __html: post.bio }}></p>
  </div>
  </Layout>
);

}
export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}


export default PostPage;
