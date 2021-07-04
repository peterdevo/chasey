import "../styles/globals.css";
import { ShoppingCartWrapper } from "../context/ShoppingCartContext";

function MyApp({ Component, pageProps }) {
  return (
    <ShoppingCartWrapper>
      <Component {...pageProps} />
    </ShoppingCartWrapper>
  );
}

export default MyApp;
