import {
  Image,
  Spacer,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  Box,
} from '@chakra-ui/react';
import { RiShoppingCart2Fill, RiStarLine, RiStarFill } from 'react-icons/ri';

export function Product({
  isFavourite = true,
  productBrand = 'Error',
  productName = 'Error',
  productPrice = 'Error',
  productImage = 'Error',
}) {
  return (
    <Flex
      _hover={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px' }}
      direction="column"
      width="240px"
      height="400px"
      border="0.5px solid rgba(196, 196, 196, 0.3)"
      overflow="hidden"
      role="group"
      cursor="pointer"
    >
      <VStack alignItems="flex-start" position="relative">
        <Icon
          as={isFavourite ? RiStarFill : RiStarLine}
          position="absolute"
          top="0.5rem"
          right="0.5rem"
          opacity="0.5"
          color={isFavourite ? 'yellow.400' : 'gray.400'}
          _hover={{ opacity: 1 }}
        />
        <Flex height="180px" overflow="hidden" align="center" p="1rem">
          <Image
            objectFit="cover"
            src={productImage}
            alt="produto"
          />
        </Flex>
        <Box height="144px" p="1rem">
          <Box color="gray.400" letterSpacing="wide" fontSize="xs">
            {productBrand}
          </Box>
          <Text fontSize="lg" noOfLines={2} mt={4}>
            {productName}
          </Text>
          <HStack m="1rem 0" fontWeight="bold" color="#FF9737">
            <Text fontSize="sm">R$</Text>
            <Text fontSize="2xl">{productPrice}</Text>
          </HStack>
        </Box>
        <Spacer />
        <Flex
          _groupHover={{ opacity: 1, width: '100%' }}
          opacity="0"
          background="#FF9737"
          width="0px"
          align="center"
          justify="center"
          p="1rem"
          transition="width 0.3s ease"
        >
          <Icon
            color="white"
            fontSize="1.5rem"
            transform="translateY(-25%)"
            as={RiShoppingCart2Fill}
          />
        </Flex>
      </VStack>
    </Flex>
  );
}
