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
  IconButton,
  Tbody,
  Td,
  Text
} from "@chakra-ui/react";
import { Dashboard } from "../../../components/Dashboard";
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Pagination } from "../../../components/Pagination";
import { useState } from 'react'
import faker from 'faker'
import Link from 'next/link'
import { parseCookies } from 'nookies'

import jwt from 'jsonwebtoken'

export default function Products() {
  const [page, setPage] = useState(1);
  const isLoading = false
  const isFetching = false
  const error = undefined

  const products = [...Array(10)].map((_, i) => {
    const name = faker.commerce.product();
    return {
      id: i,
      name,
      price: faker.random.number({ min: 0, max: 1000 }).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      createdAt: faker.date.past().toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' }),
    }
  });

  return (
    <Dashboard>

      <Box flex="1" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Produtos

            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
          </Heading>

          <Link href="/dashboard/products/create">
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              cursor="pointer"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Novo
            </Button>
          </Link>


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
                  <Th px={["4", "4", "6"]} width="8">Editar</Th>
                  <Th>Produto</Th>
                  <Th>Criado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map(product => {
                  return (
                    <Tr key={product.id}>
                      <Td>
                        <Link href="products/edit/1">
                          <IconButton>
                            <Icon as={RiPencilLine} fontSize="20" />
                          </IconButton>
                        </Link>

                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" noOfLines={1}>{product.name}</Text>
                          <Text fontSize="sm" color="gray.300">{product.price}</Text>
                        </Box>
                      </Td>
                      <Td>{product.createdAt}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>

            <Pagination
              totalCountOfRegisters={100}
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