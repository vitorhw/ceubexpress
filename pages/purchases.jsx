import {
  Box,
  Text,
  Center,
  Flex,
  HStack,
  Image,
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
  const products = [
    {
      id: '1',
      name: 'Product 1',
      price: '$100',
      image: 'https://picsum.photos/200',
    },
    {
      id: '2',
      name: 'Product 2',
      price: 'R$100,00',
      image: 'https://picsum.photos/200',
    },
    {
      id: '3',
      name: 'Product 2',
      price: '$100',
      image: 'https://picsum.photos/200',
    }
  ];
  const purchases = [
    {
      id: '1',
      status: 'Pendente',
      date: '20 de Outubro de 2021',
      total: 'R$100,00'
    },
    {
      id: '2',
      status: 'Completo',
      date: '20 de Outubro de 2021',
      total: 'R$100,00'
    },
    {
      id: '1',
      status: 'Cancelado',
      date: '20 de Outubro de 2021',
      total: 'R$100,00'
    }
  ]

  return (
    <Box
      maxW={isSmallVersion ? '100%' : '1080px'}
      mx="auto"
      my="8"
    >
      {/* <Center
        color="gray.400"
        display="flex"
        h="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <RiShoppingCart2Line />
        <Text ml="2">faça sua primeira compra</Text>
      </Center> */}
      {purchases.map(purchase => (
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
            {products.map(product => (
              <HStack
                key={product.id}
                w="100%"
                px="3"
                py="1"
                borderRadius="md"
              >
                <Image
                  boxSize="30px"
                  objectFit="cover"
                  src={product.image}
                  mr="4"
                >
                </Image>
                <Box>
                  <Text fontSize="xl">{product.name}</Text>
                  <Text>{product.price}</Text>
                </Box>
              </HStack>
            ))}

          </Box>
          <Box>
            <Text
              px="3"
              py="1"
              bgColor={purchase.status === 'Pendente' ? 'yellow.500' : (purchase.status === 'Completo' ? 'green.500' : 'red.500')}
              borderRadius="md"
              color="white"
              mb={4}
              mt={isSmallVersion ? 4 : 0}
            >
              {purchase.status}
            </Text>
            <Text
              fontWeight="bold"
              fontSize="xl"
            >
              {purchase.total}
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
            >
              {purchase.date}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default Purchases
