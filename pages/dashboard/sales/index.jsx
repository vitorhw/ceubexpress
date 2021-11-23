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
  Badge,
  Text,
} from "@chakra-ui/react";
import { Dashboard } from "../../../components/Dashboard";
import { useState } from "react";
import { Pagination } from "../../../components/Pagination";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { getAPIClient } from "../../../services/axios";
import { api } from "../../../services/api";

import jwt from "jsonwebtoken";

export default function Sales() {
  const [page, setPage] = useState(1);
  const take = 10;

  async function getSales(page) {
    const { data } = await api.get(
      `/purchase?take=${take}&skip=${(page - 1) * take}`
    );
    const totalCount = data.purchasesCount;
    const sales = data.purchases;

    return {
      sales,
      totalCount,
    };
  }

  const { data, isLoading, isFetching, error } = useQuery(
    ["sales", page],
    () => getSales(page),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  return (
    <Dashboard>
      <Box flex="1" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Vendas
            {!isLoading && isFetching && (
              <Spinner size="sm" color="gray.500" ml="4" />
            )}
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
                  <Th>Comprador</Th>
                  <Th>Total</Th>
                  <Th>Data</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.sales.map((sale) => {
                  return (
                    <Tr key={sale.id}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" color="pink.500">
                            {sale.user.name}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Badge colorScheme={sale.isPaid ? "green" : "red"}>
                            {sale.isPaid ? "Pago" : "Pendente"}
                          </Badge>
                          <Text>
                            R$
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(sale.amount / 100)}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        {new Date(sale.created_at).toLocaleDateString("pt-BR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
