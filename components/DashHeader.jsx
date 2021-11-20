import { useSidebarDrawer } from '../contexts/SidebarDrawerContext'
import { RiMenuLine, RiArrowDropRightLine } from 'react-icons/ri'
import {
  Flex,
  useBreakpointValue,
  IconButton,
  Icon,
  Button,
  Text
} from '@chakra-ui/react'
import Link from 'next/link'

export function DashHeader() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          display="flex"
          mr="2"
        >
        </IconButton>
      )}
      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
        lineHeight="0"
      >
        ex
        <Text as="span" ml="1" color="pink.500">.</Text>
        <Text as="span" ml="1" color="pink.500">dash</Text>
      </Text>
      <Flex align="center" ml="auto">
        <Link href="/">
          <Button
            rightIcon={<RiArrowDropRightLine />}
            colorScheme="teal"
            variant="outline"
          >
            Loja
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}