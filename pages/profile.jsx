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
  VStack,
  Stack,
  Heading,
  Box,
  useColorModeValue
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

function profile() {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  const name = "John Doe"

  return (
    <>
      <Center py="6" mt="12">
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
            name={name}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            test@email.com
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            Você fez um total de 0 compras e é membro desde 20 de Dezembro de 2021
          </Text>

          <Stack mt={8} direction={'row'} justify="center">
            <Button colorScheme="red" onClick={() => setIsOpen(true)}>
              Excluir conta
            </Button>
          </Stack>
        </Box>
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
              <Button colorScheme="red" onClick={onClose} ml={3}>
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
