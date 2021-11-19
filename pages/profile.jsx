import {
  Center,
  Text,
  Avatar,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Stack,
  Heading,
  Box,
  Skeleton,
  useColorModeValue
} from '@chakra-ui/react'
import { useRef, useState, useContext, useEffect } from 'react'
import { parseCookies } from 'nookies'
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';


function profile() {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  const { user } = useContext(AuthContext)
  const [userInformation, setUserInformation] = useState({
    name: '',
    email: '',
    purchase: [],
    createdAt: new Date().toString(),
  })
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    async function userInfo() {
      if (!user) {
        return
      }
      const response = await api.get(`/user/client/${user.email}`)
      setUserInformation(response.data)
      setIsLoading(false)
    }

    userInfo();
  }, [user])

  return (
    <>

      <Center py="6" mt="12">
        <Skeleton isLoaded={!loading}>
          <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Avatar
              size={'xl'}
              mb={4}
              pos={'relative'}
              name={userInformation.name}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {userInformation.name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              {userInformation.email}
            </Text>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
              Você fez um total de {userInformation.purchase.length} compras e é membro desde {new Date(userInformation.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>

            <Stack mt={8} direction={'row'} justify="center">
              <Button colorScheme="red" onClick={() => setIsOpen(true)}>
                Excluir conta
              </Button>
            </Stack>
          </Box>
        </Skeleton>
      </Center>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Atenção
            </AlertDialogHeader>

            <AlertDialogBody>
              Você realmente deseja excluir sua conta? Essa ação não poderá ser revertida.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={onClose} disabled ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default profile

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

  return {
    props: {}
  }
}