import { Box, Heading, Text, Button } from '@chakra-ui/react';
import Link from 'next/link'

function Error({ statusCode }) {
  return (
    <Box textAlign="center" py={60} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        {statusCode ? statusCode : 'Erro'}
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Ocorreu um erro!
      </Text>
      <Text color={'gray.500'} mb={6}>
        Parece que não conseguimos encontrar o que estava procurando.
      </Text>
      <Link href='/'>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid">
          Voltar
        </Button>
      </Link>
    </Box>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error