import {
  Image,
  Spacer,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  Box,
  useToast
} from '@chakra-ui/react';
import { RiShoppingCart2Fill, RiStarLine, RiStarFill } from 'react-icons/ri';
import { useCart } from "react-use-cart";
import { motion } from "framer-motion"

export function Product({
  id,
  isFavourite = true,
  productBrand = 'Error',
  productName = 'Error',
  productPrice = 'Error',
  productImage = 'Error',
}) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(productPrice);
  const { addItem, inCart } = useCart();
  const toast = useToast()

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

  const MotionFlex = motion(Flex)

  return (
    <MotionFlex
      _hover={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px' }}
      direction="column"
      align="center"
      width="240px"
      role="group"
      cursor="pointer"
      onClick={() => handleAddProduct(id)}
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
            as={isFavourite ? RiStarFill : RiStarLine}
            position="absolute"
            top="0.5rem"
            right="0.5rem"
            opacity="0.5"
            color={isFavourite ? 'yellow.400' : 'gray.400'}
            _hover={{ opacity: 1 }}
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
        <VStack alignItems="flex-start" w="100%">
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
    </MotionFlex>
  );
}
