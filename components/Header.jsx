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
import { useContext } from 'react';
import { RiMoonClearLine } from 'react-icons/ri';
import { LoginIcon } from './LoginIcon';
import { CartDrawer } from './CartDrawer';
import { ProfilePopover } from './ProfilePopover';
import { AuthContext } from '../contexts/AuthContext';
import Link from 'next/link';

export function Header({ setIsLoginModalOpen }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const isSmallVersion = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false
  });

  return (
    <>
      <Flex as="header" w="100%" pt="8" px={{ base: "4" }} justify="center" h="10vh">
        <HStack spacing={{ lg: "80" }} w={{ base: "100%", lg: "auto" }}>
          {!isSmallVersion && (
            <Box as="button" onClick={toggleColorMode}>
              <Icon as={RiMoonClearLine} fontSize="1.5rem" />
            </Box>
          )}
          <Link href="/">
            <Box as="h1" fontSize="2rem" cursor="pointer">
              {isSmallVersion ? "ex" : "ceubexpress"}
            </Box>
          </Link>
          {isSmallVersion && <Spacer />}
          <HStack spacing="2">
            {isSmallVersion && (
              <Box as="button" onClick={toggleColorMode}>
                <Icon as={RiMoonClearLine} fontSize="1.5rem" />
              </Box>
            )}
            <CartDrawer setIsLoginModalOpen={setIsLoginModalOpen} />
            {isAuthenticated ? (
              <ProfilePopover name={user.name} />
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
