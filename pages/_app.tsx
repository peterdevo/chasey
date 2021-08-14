import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ShoppingCartWrapper } from "../context/ShoppingCartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SHAREKEY,{ locale: 'en'});
function MyApp({ Component, pageProps }) {
  return (
    
    <Provider session={pageProps.session}>
      <Elements stripe={stripePromise}>
      <ShoppingCartWrapper>
        <Component {...pageProps} />
      </ShoppingCartWrapper>
      </Elements>
    </Provider>
  );
}

export default MyApp;
