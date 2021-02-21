import { signOut } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from './Layout.module.scss';
import "tailwindcss/tailwind.css";
import { FillButton } from 'tailwind-react-ui'

const Layout = ({ children }) => {
  const [user] = useAuth();

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <a href="/">home</a>
        </span>
        {user && (
          <span>
            <FillButton  onClick={() => signOut()}>Sign Out</FillButton>
          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
