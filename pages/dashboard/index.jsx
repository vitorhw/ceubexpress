import { Dashboard } from '../../components/Dashboard'
import { Box, Text, SimpleGrid } from '@chakra-ui/react'

function index() {
  return (
    <Dashboard>
      <SimpleGrid flex="1" gap="4" minChildWidth="200px" align="flex-start">
        <Box
          p={["6", "8"]}
          bg="gray.900"
          borderRadius={8}
          maxH="170px"
        >
          <Text fontSize="lg" mb="4">Usuários</Text>
          <Box>
            <Text fontSize="4xl">160</Text>
          </Box>

        </Box>
        <Box
          p={["6", "8"]}
          bg="gray.900"
          borderRadius={8}
          maxH="170px"
        >
          <Text fontSize="lg" mb="4">Vendas</Text>
          <Box>
            <Text fontSize="4xl">200</Text>
          </Box>
        </Box>
      </SimpleGrid>

    </Dashboard>
  )
}

export default index
