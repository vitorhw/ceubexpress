import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react"
import { Header } from "../components/Header";
import { LoginModal } from "../components/LoginModal";
import { useState } from "react"
import { Footer } from "../components/Footer";
import { useRouter } from "next/router"
import { AuthProvider } from "../contexts/AuthContext"
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { CartProvider } from "react-use-cart";

import theme from '../styles/theme';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  function handleLoginClose() {
    setIsLoginModalOpen(false);
  }

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          >
            <Head>
              <title>Ceubexpress</title>
            </Head>
            <LoginModal
              isLoginModalOpen={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
              handleLoginClose={handleLoginClose}
            />
            {!router.pathname.startsWith('/dashboard') &&
              <Header setIsLoginModalOpen={setIsLoginModalOpen} />
            }
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
            />
            <Box minH="100vh">
              <Component {...pageProps} />
            </Box>
            <Footer />
          </GoogleReCaptchaProvider>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp