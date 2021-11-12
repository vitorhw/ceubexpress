import { Center, Text, Avatar } from '@chakra-ui/react'

function profile() {
  const name = "John Doe"

  return (
    <Center
      display="flex"
      flexDirection="row"
      h="50vh"
      w="100%"
    >
      <Avatar size="lg" name={name} mr="8" />
      <Text fontSize="xl">
        {name}
      </Text>
    </Center>
  )
}

export default profile
