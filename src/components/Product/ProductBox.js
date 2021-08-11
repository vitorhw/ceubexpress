import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Image,
  Spacer,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  Box,
} from '@chakra-ui/react';
import { RiShoppingCart2Fill, RiStarLine } from 'react-icons/ri'


export function ProductBox() {
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
      <VStack
        alignItems="flex-start"
      >
        <Flex height="180px" overflow="hidden" align="center" p="1rem">
          <Image 
            objectFit="cover"
            src="./images/ipad.png" 
          />
        </Flex>
        <Box height="144px" p="1rem">
          <Box
            color="gray.400"
            letterSpacing="wide"
            fontSize="xs">
            Brand
          </Box>
          <Text 
            fontSize="lg" 
            noOfLines={2}>
              Product NameProduct NameProduct NameProduct NameProduct NameProduct NameProduct NameProduct NameProduct NameProduct NameProduct NameProduct Name
          </Text>
          <HStack
            m="1rem 0"
            fontWeight="bold"
            color="#FF9737"
          >
            <Text fontSize="sm">R$</Text>
            <Text fontSize="2xl">1,200.00</Text>
          </HStack>
        </Box>
        <Spacer />
        <Flex
          _groupHover={{ opacity: 1 }}
          background="#FF9737"
          opacity="0"
          width="100%"
          align="center"
          justify="center"
          p="1rem"
          transition="0.3s ease"
        >
          <Icon
            color="#FFF" 
            fontSize="1.5rem"
            as={RiShoppingCart2Fill} />
        </Flex>
      </VStack>
    </Flex>
  );
}