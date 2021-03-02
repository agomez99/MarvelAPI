import { signOut } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from './Layout.module.scss';
import "tailwindcss/tailwind.css";
import { FillButton } from 'tailwind-react-ui'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const [user] = useAuth();
  const router = useRouter()

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <a href="/">home</a>
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
      <nav>
        {user && (
          <span>
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
    </div>
  );
};

export default Layout;
