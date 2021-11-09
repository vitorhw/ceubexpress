import {
  Box,
  Flex,
  HStack,
  useColorMode,
  Icon,
  IconButton,
  useBreakpointValue,
  Spacer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiMoonClearLine } from 'react-icons/ri';
import { LoginIcon } from './LoginIcon';
import { CartDrawer } from './CartDrawer';
import { ProfilePopover } from './ProfilePopover';

export function Header({ setIsLoginModalOpen }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isCartItem, setCartItem] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isSmallVersion = useBreakpointValue({
    base: true,
    sm: true,
    lg: false
  });

  return (
    <>
      <Flex as="header" w="100%" pt="8" px={{ sm: "4" }} justify="center" h="10vh">
        <HStack spacing={{ lg: "80" }} w={{ sm: "100%", lg: "auto" }}>
          {!isSmallVersion && (
            <Box as="button" onClick={toggleColorMode}>
              <Icon as={RiMoonClearLine} fontSize="1.5rem" />
            </Box>
          )}
          <Box as="h1" fontSize="2rem">
            ceubexpress
          </Box>
          {isSmallVersion && <Spacer />}
          <HStack spacing="2">
            {isSmallVersion && (
              <Box as="button" onClick={toggleColorMode}>
                <Icon as={RiMoonClearLine} fontSize="1.5rem" />
              </Box>
            )}
            <CartDrawer isCartItem={isCartItem} />
            {isAuthenticated ? (
              <ProfilePopover name={'John Doe'} />
            ) : (
              <IconButton
                fill={colorMode === 'light' ? "gray.800" : "gray.100"}
                lineHeight="0"
                fontSize="1.5rem"
                aria-label="login button"
                isRound="true"
                icon={<LoginIcon transform={'translateY(1px)'} />}
                onClick={setIsLoginModalOpen}
              />
            )}
          </HStack>
        </HStack>
      </Flex>
    </>
  );
}
