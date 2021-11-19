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
import { parseCookies } from 'nookies'

import jwt from 'jsonwebtoken'

export default function Users() {
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
      email: faker.internet.email(name),
      createdAt: faker.date.past().toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' }),
    }
  });

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
                  <Th>Usuário</Th>
                  <Th>Registro</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" color="pink.500">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
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

export const getServerSideProps = async (ctx) => {
  const { ['ceubexpress-token']: token } = parseCookies(ctx)
  const json = jwt.decode(token);

  if (!json.role) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}