import Head from 'next/head';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Ceubexpress</title>
      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp