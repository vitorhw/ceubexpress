import { Box, Flex, HStack, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { RiMoonClearLine } from 'react-icons/ri';
import { CartPopover } from './cartPopover';
import { ProfilePopover } from './profilePopover';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { cartItem, isCartItem } = useState(false);
  // TODO: BIND LOGIN STATE WITH NEXT-AUTH
  const { isLoggedIn, setIsLoggedIn } = useState(true);

  return (
    <Flex as="header" w="100%" pt="8" justify="center" h="10vh">
      <HStack spacing="80">
        <Box as="button" onClick={toggleColorMode}>
          <RiMoonClearLine fontSize="1.5rem" />
        </Box>
        <Box as="h1" fontSize="2rem">
          ceubexpress
        </Box>

        <HStack spacing="2">
          <CartPopover isCartItem={isCartItem} />
          { isLoggedIn ? <ProfilePopover name={"John Doe"} /> : <p>Login</p>}
        </HStack>

      </HStack>
    </Flex>
  );
}
