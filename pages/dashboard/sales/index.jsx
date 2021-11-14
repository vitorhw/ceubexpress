import {
  Spinner,
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from "@chakra-ui/react";
import { Dashboard } from "../../../components/Dashboard";
import { useState } from 'react'
import faker from 'faker'
import { Pagination } from '../../../components/Pagination'

export default function Sales() {
  const [page, setPage] = useState(1);
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
      spent: faker.random.number({ min: 0, max: 1000 }).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      createdAt: faker.date.past().toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' }),
    }
  });

  return (
    <Dashboard >
      <Box flex="1" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Vendas

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
                  <Th>Usuário</Th>
                  <Th>Total</Th>
                  <Th>Data</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" color="pink.500">{user.name}</Text>
                        </Box>
                      </Td>
                      <Td>{user.spent}</Td>
                      <Td>{user.createdAt}</Td>
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