import { signOut } from "@lib/firebase";
import { useAuth } from "@contexts/auth";
import styles from "./Layout.module.scss";
import "tailwindcss/tailwind.css";
import { FillButton } from "tailwind-react-ui";
import { useRouter } from "next/router";
import Image from "next/image";

const Layout = ({ children }) => {
  const [user] = useAuth();
  const router = useRouter();

  return (
    <div className={styles.Layout}>
    <div >
  <div className="w-full px-0">
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3">
      <div className="container  mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
          <a href="/">
            {" "}
            <Image
              src="/cardverse.png"
              alt="brandlogo"
              width={130}
              height={130}
            />
        </a>
          
        </div>
        <div className="flex lg:flex-grow items-center" id="example-navbar-info">
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <span>
          <FillButton
            onClick={() => {
              router.push({
                pathname: "/chars",
              });
            }}
          >
            Characters
          </FillButton>
        </span>              
            </li>
            <li className="nav-item">
              {user && (
          <span>
            <FillButton
              style={{ marginRight: "5px" }}
              onClick={() => {
                router.push({
                  pathname: "/create",
                });
              }}
            >
              Create
            </FillButton>
            <FillButton onClick={() => signOut()}>Sign Out</FillButton>
          </span>
        )} 
            </li>
            <li className="nav-item">
              {!user && (
          <span>
            <FillButton
              onClick={() => {
                router.push({
                  pathname: "/signin",
                });
              }}
            >
              Log in
            </FillButton>
          </span>
        )}  
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>
     
      <main>{children}</main>
      <footer>
        <p>powered by agdigital</p>
      </footer>
    </div>
  );
};

export default Layout;
