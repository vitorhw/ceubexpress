import {
  Box,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiShoppingCart2Line, RiMoonClearLine } from 'react-icons/ri';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { cartItem, isCartItem } = useState(false);

  return (
    <Flex as="header" w="100%" pt="8" justify="center" h="10vh">
      <HStack spacing="80">
        <Box as="button" onClick={toggleColorMode}>
          <RiMoonClearLine fontSize="2rem" />
          {colorMode === 'light' ? 'Escuro' : 'Claro'}
        </Box>
        <Box as="h1" fontSize="2rem">
          ceubexpress
        </Box>

        <Popover isLazy trigger="hover">
          <PopoverTrigger>
            <Button variant="unstyled" fontSize="2rem">
              <RiShoppingCart2Line as="button" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">
              Carrinho de compras
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              {!isCartItem ? (
                <Text>Nenhum item adicionado</Text>
              ) : (
                <Text>Arroz</Text>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
}
