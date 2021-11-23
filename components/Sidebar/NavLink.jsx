import { Text, Link as ChakraLink, Icon } from '@chakra-ui/react'
import { ActiveLink } from '../ActiveLink'

export function NavLink({ icon, children, href, ...rest }) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" {...rest}>
        <Icon as={icon} fontSize="20" my="auto" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}