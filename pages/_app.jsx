import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Header } from "../components/Header";
import { LoginModal } from "../components/LoginModal";
import { useState } from "react"

import { CartProvider } from "react-use-cart";

import theme from '../styles/theme';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function handleLoginClose() {
    setIsLoginModalOpen(false);
  }

  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Head>
          <title>Ceubexpress</title>
        </Head>
        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          handleLoginClose={handleLoginClose}
        />
        <Header setIsLoginModalOpen={setIsLoginModalOpen} />
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
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  );
}

export default MyApp