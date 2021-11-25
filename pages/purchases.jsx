import {
  Box,
  Text,
  Center,
  Flex,
  HStack,
  Spinner,
  Icon,
  Button,
  Image,
  Link as ChakraLink,
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import { RiShoppingCart2Line, RiExternalLinkLine } from "react-icons/ri";
import { useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { parseCookies } from "nookies";
import { AuthContext } from "../contexts/AuthContext";

import Router from "next/router";

function Purchases() {
  const isSmallVersion = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });
  const [purchases, setPurchases] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  async function retrievePurchases() {
    if (!user) {
      return;
    }
    const response = await api.get(`/purchase/${user.id}`);
    setPurchases(response.data);
    setLoading(false);
  }

  useEffect(() => {
    retrievePurchases();
  }, [user]);

  if (loading) {
    return (
      <Center my="8rem">
        <Spinner />
      </Center>
    );
  }

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
    );
  }
  return (
    <Box maxW={isSmallVersion ? "100%" : "1080px"} mx="auto" my="8">
      {purchases.map((purchase) => (
        <Skeleton isLoaded={!loading} key={purchase.id}>
          <Flex
            w="100%"
            align="center"
            justify="space-between"
            px="8"
            py="8"
            border="0.5px solid rgba(196, 196, 196, 0.3)"
            borderRadius="md"
            mb={4}
            flexDirection={isSmallVersion ? "column" : "row"}
          >
            <Box>
              {purchase.productOnPurchase.map((productItem) => (
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
                  ></Image>
                  <Box>
                    <Text fontSize="xl">{productItem.product.name}</Text>
                    <Text fontWeight="light">
                      {productItem.product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </Box>
            <Box>
              {purchase.isPaid ? (
                <Box align="center" mb={4}>
                  <Text
                    px="3"
                    py="0.5rem"
                    bgColor="green.300"
                    borderRadius="md"
                    color="white"
                    textAlign="center"
                    fontWeight="bold"
                    mt={isSmallVersion ? 4 : 0}
                    mb={2}
                  >
                    Pago
                  </Text>
                  <ChakraLink
                    href={purchase.receipt_url}
                    isExternal
                    display="inline-block"
                    lineHeight="0"
                  >
                    Recibo <Icon as={RiExternalLinkLine} my="-0.5" mx="1px" />
                  </ChakraLink>
                </Box>
              ) : purchase.isPurchaseExpired ? (
                <Text
                  px="3"
                  py="0.5rem"
                  bgColor="red.300"
                  borderRadius="md"
                  color="white"
                  textAlign="center"
                  fontWeight="bold"
                  mb={4}
                  mt={isSmallVersion ? 4 : 0}
                >
                  Cancelado
                </Text>
              ) : (
                <Button
                  px="3"
                  py="1"
                  w="100%"
                  borderRadius="md"
                  textAlign="center"
                  colorScheme="blue"
                  mb={4}
                  mt={isSmallVersion ? 4 : 0}
                  isLoading={fetching}
                  onClick={() => {
                    setFetching(true);
                    Router.push(purchase.purchase_url);
                  }}
                >
                  Finalizar Compra
                </Button>
              )}

              <Text fontWeight="bold" fontSize="xl" textAlign="center">
                {(purchase.amount / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {new Date(purchase.created_at).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Box>
          </Flex>
        </Skeleton>
      ))}
    </Box>
  );
}

export default Purchases;

export const getServerSideProps = async (ctx) => {
  const { ["ceubexpress-token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
