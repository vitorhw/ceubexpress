import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  IconButton,
  useColorMode,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useState } from 'react';


export function LoginInput() {
  const [show, setShow] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const {colorMode, toggleColorMode} = useColorMode();

  const handleClick = () => setShow(!show);
  
  function handleLogin() {
    setIsLogging(true)
  }

  return (
    <VStack
      spacing="8"
      align="center"
      alignSelf="center"
      boxSize="50%"
      border={colorMode === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)' } 
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
        <InputRightElement width="3rem">
          <IconButton 
            h="1.75rem" 
            size="sm" 
            icon={<Icon as={show ? RiEyeLine : RiEyeCloseLine} />}
            onClick={handleClick} 
          />
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
