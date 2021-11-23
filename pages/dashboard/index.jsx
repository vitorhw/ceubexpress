import { Dashboard } from '../../components/Dashboard'
import { Box, Text, SimpleGrid, useColorMode, Skeleton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { parseCookies } from 'nookies'
import { Counter } from "../../components/Counter"
import { getAPIClient } from '../../services/axios'

import jwt from 'jsonwebtoken'

function index() {
  const { colorMode } = useColorMode();
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function data() {
      const users = await api.get('/user/quantity')
      const purchases = await api.get('/product')

      setStats({
        users: users.data.quantity,
        orders: purchases.data.length,
      })

      setLoading(false)
    }

    data();
  }, [])

  return (
    <Dashboard>
      <SimpleGrid flex="1" gap="4" minChildWidth="200px" align="flex-start">
        <Skeleton isLoaded={!loading}>
          <Box
            p={["6", "8"]}
            bg={colorMode === 'light' ? "gray.100" : "gray.900"}
            borderRadius={8}
            maxH="170px"
          >
            <Text fontSize="lg" mb="4">Usuários</Text>
            <Box>
              <Text fontSize="4xl"><Counter from={0} to={stats.users} /></Text>
            </Box>
          </Box>
        </Skeleton>

        <Skeleton isLoaded={!loading}>
          <Box
            p={["6", "8"]}
            bg={colorMode === 'light' ? "gray.100" : "gray.900"}
            borderRadius={8}
            maxH="170px"
          >
            <Text fontSize="lg" mb="4">Produtos</Text>
            <Box>
              <Text fontSize="4xl"><Counter from={0} to={stats.orders} /></Text>
            </Box>
          </Box>
        </Skeleton>
      </SimpleGrid>
    </Dashboard>
  )
}

export default index

export const getServerSideProps = async (ctx) => {
  const { ['ceubexpress-token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const apiClient = getAPIClient(ctx);
  const json = jwt.decode(token);
  const { email } = json;

  try {
    const { data } = await apiClient.get(`/user/client/${email}`)
    if (data.isUserAdmin === true) {
      return {
        props: {}
      }
    }
    else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
}