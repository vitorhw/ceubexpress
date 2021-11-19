import {
  Box,
  Text,
  Center,
  Flex,
  HStack,
  Image,
  useBreakpointValue,
  Skeleton,
} from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { useState, useEffect, useContext } from 'react'
import { api } from '../services/api';
import { parseCookies } from 'nookies'
import { AuthContext } from '../contexts/AuthContext';

function Purchases() {
  const isSmallVersion = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false
  });
  const [purchases, setPurchases] = useState([])
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  async function retrievePurchases() {
    if (!user) {
      return;
    }
    const response = await api.get(`/purchase/${user.id}`);
    setPurchases(response.data);
    console.log(response.data)
    setLoading(false);
  }

  useEffect(() => {
    retrievePurchases();
  }, [user]);


  if (purchases.length === 0) {
    return (
      <Center
        color="gray.400"
        display="flex"
        h="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <RiShoppingCart2Line />
        <Text ml="2">faça sua primeira compra</Text>
      </Center>
    )
  }
  return (
    <Box
      maxW={isSmallVersion ? '100%' : '1080px'}
      mx="auto"
      my="8"
    >

      {purchases.map(purchase => (
        <Skeleton isLoaded={!loading}>
          <Flex
            w="100%"
            align="center"
            justify="space-between"
            px="8"
            py="2"
            border="0.5px solid rgba(196, 196, 196, 0.3)"
            borderRadius="md"
            mb={4}
            flexDirection={isSmallVersion ? "column" : "row"}
          >
            <Box>
              {purchase.productOnPurchase.map(productItem => (
                <HStack
                  key={productItem.product.id}
                  w="100%"
                  px="3"
                  py="1"
                  borderRadius="md"
                >
                  <Image
                    boxSize="30px"
                    objectFit="cover"
                    src={productItem.product.image}
                    mr="4"
                  >
                  </Image>
                  <Box>
                    <Text fontSize="xl">{productItem.product.name}</Text>
                    <Text>{productItem.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                  </Box>
                </HStack>
              ))}

            </Box>
            <Box>
              <Text
                px="3"
                py="1"
                bgColor={purchase.isPaid ? "green.300" : "yellow.600"}
                borderRadius="md"
                color="white"
                textAlign='center'
                mb={4}
                mt={isSmallVersion ? 4 : 0}
              >
                {purchase.isPaid ? "Pago" : "Pendente"}
              </Text>
              <Text
                fontWeight="bold"
                fontSize="xl"
                textAlign="center"
              >
                {(purchase.amount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
              <Text
                fontSize="sm"
                color="gray.600"
              >
                {new Date(purchase.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </Box>
          </Flex>
        </Skeleton>
      ))}
    </Box>
  )
}

export default Purchases

export const getServerSideProps = async (ctx) => {
  const { ['ceubexpress-token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
