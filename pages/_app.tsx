import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ShoppingCartWrapper } from "../context/ShoppingCartContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ShoppingCartWrapper>
        <Component {...pageProps} />
      </ShoppingCartWrapper>
    </Provider>
  );
}

export default MyApp;
