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
  Text,
} from "@chakra-ui/react";
import { Dashboard } from "../../../components/Dashboard";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../../components/Pagination";
import { useState } from "react";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { getAPIClient } from "../../../services/axios";
import { api } from "../../../services/api";

import Link from "next/link";
import jwt from "jsonwebtoken";

export default function Products() {
  const [page, setPage] = useState(1);
  const take = 10;

  async function getProducts(page) {
    const { data } = await api.get(
      `/product/pagination?take=${take}&skip=${(page - 1) * take}`
    );
    const totalCount = data.productsCount;
    const products = data.products;

    return {
      products,
      totalCount,
    };
  }

  const { data, isLoading, isFetching, error } = useQuery(
    ["products", page],
    () => getProducts(page),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  return (
    <Dashboard>
      <Box flex="1" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Produtos
            {!isLoading && isFetching && (
              <Spinner size="sm" color="gray.500" ml="4" />
            )}
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
                  <Th px={["4", "4", "6"]} width="8">
                    Editar
                  </Th>
                  <Th>Produto</Th>
                  <Th>Criado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.products.map((product) => {
                  return (
                    <Tr key={product.id}>
                      <Td>
                        <Link href={`products/edit/${product.id}`}>
                          <IconButton>
                            <Icon as={RiPencilLine} fontSize="20" />
                          </IconButton>
                        </Link>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" noOfLines={1}>
                            {product.name}
                          </Text>
                          <Text fontSize="sm" color="gray.300">
                            R$
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(product.price)}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        {new Date(product.created_at).toLocaleDateString(
                          "pt-BR",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>

            <Pagination
              totalCountOfRegisters={data.totalCount}
              registerPerPage={take}
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
  const { ["ceubexpress-token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const apiClient = getAPIClient(ctx);
  const json = jwt.decode(token);
  const { email } = json;

  try {
    const { data } = await apiClient.get(`/user/client/${email}`);
    if (data.isUserAdmin === true) {
      return {
        props: {},
      };
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
