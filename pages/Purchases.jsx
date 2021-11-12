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

function Purchases() {
  const isSmallVersion = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false
  });

  return (
    <div>
      Hello
    </div>
  )
}

export default Purchases
