import {
  Spinner,
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Link
} from "@chakra-ui/react";
import { Dashboard } from "../../../components/Dashboard";
import { RiAddLine } from 'react-icons/ri'
import { useState } from 'react'
import faker from 'faker'
import { Pagination } from '../../../components/Pagination'

export default function Users() {
  const [page, setPage] = useState(1);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  const isLoading = false
  const isFetching = false
  const error = undefined


  // async function handlePrefetchUser(userId) {
  //   await queryClient.prefetchQuery(['user', userId], async () => {
  //     const response = await api.get(`users/${userId}`)

  //     return response.data;
  //   }, {
  //     staleTime: 1000 * 60 * 10 // 10 min
  //   })
  // }

  const users = [...Array(10)].map((_, i) => {
    const name = faker.name.findName();
    return {
      id: i,
      name,
      email: faker.internet.email(name),
      createdAt: faker.date.past().toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' }),
    }
  });

  function handlePageClick(event) {
    console.log(event);
  }

  return (
    <Dashboard >
      <Box flex="1" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuários

            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
          </Heading>
        </Flex>

        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex justify="center">
            <Text>Error</Text>
          </Flex>
        ) : (
          <>
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuário</Th>
                  {isWideVersion && <Th>Registro</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {users.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>

            <Pagination
              totalCountOfRegisters={1000}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}
      </Box>
    </Dashboard>
  );
}