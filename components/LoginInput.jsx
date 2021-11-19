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
  useBreakpointValue
} from '@chakra-ui/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'

import Router from 'next/router'
import Link from 'next/link'


export function LoginInput({ handleLoginClose }) {
  const [show, setShow] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const { colorMode } = useColorMode();
  const { handleSubmit, register } = useForm();
  const { signIn, user } = useContext(AuthContext);

  const handleClick = () => setShow(!show);

  async function handleSignIn(data) {
    setIsLogging(true);
    await signIn(data);
    setIsLogging(false);
  }


  useEffect(() => {
    if (user) {
      Router.reload()
    }
  }, [user])

  const isSmallVersion = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false
  });

  return (
    <VStack
      spacing="8"
      align="center"
      as="form"
      onSubmit={handleSubmit(handleSignIn)}
      alignSelf="center"
      boxSize={isSmallVersion ? "100%" : "50%"}
      border={colorMode === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)'}
      p="6"
      rounded="md"
    >
      <Text fontSize="1.5rem">Entrar</Text>
      <InputGroup>
        <Input
          type="email"
          placeholder="Email"
          name='password'
          {...register('email')}
        />
      </InputGroup>

      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Senha"
          name='password'
          {...register('password')}
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


      <Button
        isLoading={isLogging}
        loadingText="Entrando"
        type="submit"
      >
        Login
      </Button>

      <Box as="HStack" align="center">
        <Text>Não possui cadastro?</Text>
        <Link href="register">
          <Button variant="link" color="#66b3ff" onClick={handleLoginClose}>
            Clique aqui!
          </Button>
        </Link>
      </Box>
    </VStack>
  );
}
