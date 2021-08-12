import {
  Box,
  Flex,
  HStack,
  useColorMode,
  Icon,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiMoonClearLine } from 'react-icons/ri';
import { LoginModal } from '../LoginModal';
import { CartPopover } from './CartPopover';
import { ProfilePopover } from './ProfilePopover';

export function Header({ setIsLoginModalOpen }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [ isCartItem, setCartItem ] = useState(true);
  const [ isAuthenticated, setIsAuthenticated ] = useState(true);

  const isSmallVersion = useBreakpointValue({
    base: false,
    sm: true,
    lg: false
  });

  return (
    <>
      <Flex as="header" w="100%" pt="8" justify="center" h="10vh">
        <HStack spacing="80">
          {!isSmallVersion && (
            <Box as="button" onClick={toggleColorMode}>
              <Icon as={RiMoonClearLine} fontSize="1.5rem" />
            </Box>
          )}
          <Box as="h1" fontSize="2rem">
            ceubexpress
          </Box>

          <HStack spacing="2">
            {isSmallVersion && (
              <Box as="button" onClick={toggleColorMode}>
                <Icon as={RiMoonClearLine} fontSize="1.5rem" />
              </Box>
            )}
            <CartPopover isCartItem={isCartItem} />
            {isAuthenticated ? (
              <ProfilePopover name={'John Doe'} />
            ) : (
              <Button onClick={setIsLoginModalOpen}>Login</Button>
            )}
          </HStack>
        </HStack>
      </Flex>
    </>
  );
}
