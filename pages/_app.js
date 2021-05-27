import "../styles/globals.css";
import AuthState from "../context/authState";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </>
  );
}

export default MyApp;
