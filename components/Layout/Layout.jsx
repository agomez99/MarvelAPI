import { signOut } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from './Layout.module.scss';
import "tailwindcss/tailwind.css";
import { FillButton } from 'tailwind-react-ui'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Layout = ({ children }) => {
  const [user] = useAuth();
  const router = useRouter()

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <a href="/"> <Image src="/cardverse.png"         
          alt="Picture of the author"
        width={100}
        height={100}/></a>
        </span>
        {user && (
          <span>
            <FillButton
              onClick={() => {
                router.push({
                  pathname: '/create',
                })
              }}>Create</FillButton>
            <FillButton onClick={() => signOut()}>Sign Out</FillButton>
          </span>
        )}
        {!user && (
          <span>
            <FillButton
              onClick={() => {
                router.push({
                  pathname: '/signin',
                })
              }}>Log in</FillButton>
          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
