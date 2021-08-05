import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

export function LoginInput() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [isLogging, setIsLogging] = useState(false);
  
  function handleLogin() {
    setIsLogging(true)
  }

  return (
    <VStack
      spacing="8"
      align="center"
      alignSelf="center"
      boxSize="50%"
      boxShadow="xs"
      p="6"
      rounded="md"
    >
      <Text fontSize="1.5rem">Entrar</Text>
      <InputGroup>
        <Input type="text" placeholder="Usuário" />
      </InputGroup>

      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Senha"
        />
        <InputRightElement width="5.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Esconder' : 'Mostrar'}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button onClick={handleLogin} isLoading={isLogging} loadingText="Logando">
        Login
      </Button>

      <Box as="HStack" align="center">
        <Text>Não possui cadastro?</Text>
        <Box as="button" variant="unstyled" color="#66b3ff">
          Clique aqui!
        </Box>
      </Box>
    </VStack>
  );
}
