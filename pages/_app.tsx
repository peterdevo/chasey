import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ShoppingCartWrapper } from "../context/ShoppingCartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useRouter} from "next/router";
import { useEffect,useState } from "react";
import NProgress from "nprogress"
import Loader from "../components/reused/Loader";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SHAREKEY,{ locale: 'en'});
function MyApp({ Component, pageProps }) {
const [isLoading,setIsLoading]=useState(false)
  const router=useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start()
      setIsLoading(true)
    }
    const handleStop = () => {
      NProgress.done()
      setIsLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  return (
    <>
    {isLoading&&<Loader/>}
    <Provider session={pageProps.session}>
      <Elements stripe={stripePromise}>
      <ShoppingCartWrapper>
        <Component {...pageProps} />
      </ShoppingCartWrapper>
      </Elements>
    </Provider>
    </>
  );
}

export default MyApp;
