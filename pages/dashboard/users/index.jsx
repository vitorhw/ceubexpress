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
  IconButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Dashboard } from "../../../components/Dashboard";
import { useState } from "react";
import { Pagination } from "../../../components/Pagination";
import { parseCookies } from "nookies";
import { api } from "../../../services/api";
import { RiVipCrown2Fill, RiVipCrown2Line } from "react-icons/ri";
import { useQuery } from "react-query";
import { queryClient } from "../../../services/queryClient";
import { getAPIClient } from "../../../services/axios";

import jwt from "jsonwebtoken";

export default function Users() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const take = 10;
  const delay = (amount = 3000) =>
    new Promise((resolve) => setTimeout(resolve, amount));

  async function getUsers(page) {
    const { data } = await api.get(
      `/user?take=${take}&skip=${(page - 1) * take}`
    );
    const totalCount = data.usersTotal;
    const users = data.users;

    return {
      users,
      totalCount,
    };
  }

  const { data, isLoading, isFetching, error } = useQuery(
    ["users", page],
    () => getUsers(page),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  async function updateRoleset({ id, isUserAdmin }) {
    if (!loading) {
      setLoading(true);
      const response = await api.patch(`/user/${id}`, {
        isUserAdmin: !isUserAdmin,
      });
      if (response) {
        queryClient.invalidateQueries("users");
      }
    }

    await delay();
    setLoading(false);
  }

  return (
    <Dashboard>
      <Box flex="1" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuários
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
                  <Th px={["4", "4", "6"]} width="8">
                    Admin
                  </Th>
                  <Th>Usuário</Th>
                  <Th>Registro</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.users.map((user) => {
                  return (
                    <Tr key={user.id}>
                      <Td>
                        <IconButton
                          onClick={async () => {
                            await updateRoleset(user);
                          }}
                        >
                          <Icon
                            as={
                              user.isUserAdmin
                                ? RiVipCrown2Fill
                                : RiVipCrown2Line
                            }
                            fontSize="20"
                          />
                        </IconButton>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold" color="pink.500">
                            {user.name}
                          </Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        {new Date(user.createdAt).toLocaleDateString("pt-BR", {
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
