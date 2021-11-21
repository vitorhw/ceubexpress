import {
  Image,
  Spacer,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  Box,
  useToast,
} from '@chakra-ui/react';
import { RiShoppingCart2Fill, RiStarLine, RiStarFill } from 'react-icons/ri';
import { useCart } from "react-use-cart";
import { motion } from "framer-motion"
import { api } from '../services/api'
import { AuthContext } from '../contexts/AuthContext';
import { useState, useContext } from 'react'



export function Product({
  id,
  isFavourite = false,
  productBrand = 'Erro',
  productName = 'Erro',
  productPrice = 'Erro',
  productImage = 'Erro',
}) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(productPrice);
  const { addItem, inCart } = useCart();
  const toast = useToast()
  const { user } = useContext(AuthContext)
  const [favourite, setFavourite] = useState(isFavourite)
  const [loading, setLoading] = useState(false)
  const delay = (amount = 3000) => new Promise(resolve => setTimeout(resolve, amount))

  async function handleFavourite() {
    if (!user) {
      toast({
        title: 'Você precisa estar logado para favoritar um produto',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    setLoading(true)
    if (favourite) {
      const response = await api.delete(`/favorites/${id}`)
      console.log(response)
      if (response) {
        setFavourite(false)
      }
    } else {
      const response = await api.post(`/favorites/`, {
        productId: id,
        userId: user.id
      })
      console.log(response)
      if (response) {
        setFavourite(true)
      }
    }
    await delay()
    setLoading(false)
  }

  function handleAddProduct(productId) {
    if (inCart(String(productId))) {
      toast({
        title: 'Produto já adicionado',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    addItem({
      id: String(productId),
      price: productPrice,
      image: productImage,
      name: productName,
      brand: productBrand,
    });
    toast({
      title: 'Produto adicionado ao carrinho',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }

  const FlexMotion = motion(Flex)

  return (
    <FlexMotion
      _hover={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px' }}
      direction="column"
      align="center"
      width="240px"
      cursor="pointer"
      whileTap={{ scale: 0.95 }}
    >
      <VStack
        border="0.5px solid rgba(196, 196, 196, 0.3)"
        w={{ base: "100%", lg: "240px" }}
        alignItems="flex-start"
      >
        <VStack
          position="relative"
          w="100%"
        >
          <Icon
            as={favourite ? RiStarFill : RiStarLine}
            position="absolute"
            top="0.5rem"
            right="0.5rem"
            opacity="0.5"
            color={favourite ? 'yellow.400' : 'gray.400'}
            _hover={{ opacity: 1 }}
            onClick={async () => !loading && await handleFavourite()}
            disabled={loading}
            whileTap={{ scale: 4 }}
            transition={{ duration: 0.5 }}
          />
          <Image
            objectFit="cover"
            overflow="hidden"
            h="140px"
            maxW={{ lg: "240px" }}
            src={productImage}
            alt="produto"
          />
        </VStack>
        <VStack
          alignItems="flex-start"
          w="100%"
          role="group"
          onClick={() => handleAddProduct(id)}
        >
          <Box h="98px" p="1rem">
            <Box color="gray.400" noOfLines={1} letterSpacing="wide" fontSize="xs">
              {productBrand}
            </Box>
            <Text fontSize="lg" noOfLines={2} mt={2}>
              {productName}
            </Text>
          </Box>
          <Spacer />
          <HStack p="1rem" fontWeight="bold" color="#FF9737">
            <Text fontSize="sm">R$</Text>
            <Text fontSize="2xl">{formattedPrice}</Text>
          </HStack>
          <Flex
            _groupHover={{ opacity: 1, width: '100%' }}
            opacity={{ base: 1, lg: 0 }}
            h="100%"
            maxH="48px"
            width={{ base: "100%", lg: "0px" }}
            background="#FF9737"
            align="center"
            justify="center"
            p="1rem"
            transition="width 0.3s ease"
          >
            <Icon
              color="white"
              fontSize="1.5rem"
              as={RiShoppingCart2Fill}
            />
          </Flex>
        </VStack>
      </VStack>
    </FlexMotion>
  );
}
