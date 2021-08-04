import { Box, Flex, HStack, useColorMode } from '@chakra-ui/react';
import { RiShoppingCart2Line, RiMoonClearLine } from 'react-icons/ri';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex as="header" w="100%" pt="8" justify="center" h="10vh">
      <HStack spacing="80">
        <Box as="button" onClick={toggleColorMode}>
          <RiMoonClearLine fontSize="2rem" />
          {colorMode === 'light' ? 'Dark' : 'Light'}
        </Box>
        <Box as="h1" fontSize="2rem">
          ceubexpress
        </Box>
        <Box as="button">
          <RiShoppingCart2Line fontSize="2rem" />
        </Box>
      </HStack>
    </Flex>
  );
}
