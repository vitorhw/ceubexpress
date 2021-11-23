import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react"
import { Header } from "../components/Header";
import { LoginModal } from "../components/LoginModal";
import { useState } from "react"
import { Footer } from "../components/Footer";
import { useRouter } from "next/router"
import { AuthProvider } from "../contexts/AuthContext"
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { CartProvider } from "react-use-cart";

import Head from 'next/head'
import Router from 'next/router'
import theme from '../styles/theme';
import NProgress from 'nprogress'


function MyApp({ Component, pageProps }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  function handleLoginClose() {
    setIsLoginModalOpen(false)
  }

  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  return (
    <ChakraProvider theme={theme}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <Head>
                <link rel="shortcut icon" href="/favicon.png" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <title>ceubexpress</title>
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
              <Box minH="100vh">
                <Component {...pageProps} />
              </Box>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleReCaptchaProvider>
    </ChakraProvider>
  );
}

export default MyApp