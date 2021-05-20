import { AuthProvider } from '@contexts/auth';
import '@styles/global.scss';
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;
