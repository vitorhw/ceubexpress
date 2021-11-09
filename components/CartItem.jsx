import {
  Text,
  VStack,
  Img,
  HStack,
  Spacer,
  IconButton
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

export function CartItem({
  productBrand = 'Error',
  productName = 'Error',
  productPrice = 'Error',
  productImage = 'Error',
}) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(productPrice);

  return (
    <HStack
      maxW="100%"
      align="center"
      border="0.5px solid rgba(196, 196, 196, 0.3)"
      p="2"
      mb="1"
      position="relative"
    >
      <IconButton
        aria-label="excluir"
        icon={<RiDeleteBin7Fill />}
        position="absolute"
        variant="ghost"
        bottom="0"
        right="0"
        size="xs"
      />
      <Img
        src={productImage}
        objectFit="cover"
        boxSize="50px"
      />
      <Spacer />
      <VStack
        align="start"
        spacing="1"
        w="100%"
      >
        <Text fontSize="lg" noOfLines={1}>{productName}</Text>
        <Text fontSize="sm" color="gray.400" noOfLines={1}>{productBrand}</Text>
        <Text fontSize="sm" fontWeight="bold" color="#FF9737">{formattedPrice}</Text>
      </VStack>
    </HStack >
  )
}
