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
  PopoverFooter,
  PopoverTrigger,
  Text,
  useColorMode,
  Avatar,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiShoppingCart2Line, RiMoonClearLine, RiLogoutBoxRLine } from 'react-icons/ri';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { cartItem, isCartItem } = useState(false);
  // TODO: BIND STATE WITH NEXT AUTH
  const { isLoggedIn, setIsLoggedIn } = useState(true);

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

        <HStack spacing="2">
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

          { 
          // TODO: LOGIN MODAL
          isLoggedIn ? <p>TODO</p> 
          : (
              <Popover isLazy trigger="click" >
              <PopoverTrigger>
                <Avatar size="sm" name="John Doe" />
              </PopoverTrigger>
              <PopoverContent width="100%">
                <PopoverHeader fontWeight="semibold">
                  John Doe
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                  <p>Conta</p>
                  <p>Suporte</p>
                </PopoverBody>
                <PopoverFooter fontWeight="italic">
                  <RiLogoutBoxRLine />
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            )}

        </HStack>
      </HStack>
    </Flex>
  );
}
