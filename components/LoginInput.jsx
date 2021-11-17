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
  useToast,
  useBreakpointValue
} from '@chakra-ui/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useState, useContext, useEffect, useCallback } from 'react';
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import {
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import axios from 'axios'


export function LoginInput({ handleLoginClose }) {
  const [show, setShow] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleSubmit, register } = useForm();
  const { signIn, user } = useContext(AuthContext);
  const { executeRecaptcha } = useGoogleReCaptcha();


  const handleClick = () => setShow(!show);

  async function handleSignIn(data) {
    setIsLogging(true);

    const reCaptchaToken = await executeRecaptcha("SignIn");

    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}&response=${reCaptchaToken}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
      });

    console.log(response.data)

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
