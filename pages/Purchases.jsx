import {
  Box,
  Text,
  VStack,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';

function Purchases() {
  const isSmallVersion = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false
  });

  return (
    <Box
      maxW={isSmallVersion ? '100%' : '1080px'}
      mx="auto"
      my="8"
    >
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
      <VStack
        w="100%"
        align="center"
        justify="space-between"
        px="8"
        py="2"
        border="0.5px solid rgba(196, 196, 196, 0.3)"
        borderRadius="md"
      >
        <Text
          px="3"
          py="1"
          bgColor="red.500"
          borderRadius="md"
          color="white"
        >
          Cancelado
        </Text>
        <Text
          fontWeight="bold"
          fontSize="xl"
        >
          Total: 123,93
        </Text>
        <Text
          fontSize="sm"
          color="gray.600"
        >
          1 de Setembro de 2021
        </Text>

      </VStack>
    </Box>
  )
}

export default Purchases
