import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as yup from 'yup'
import { Input } from "../components/Input";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import faker from 'faker';

const avatars = [...Array(5)].map((_, i) => ({
  id: i,
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
}))

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(6, 'Nome deve ter no mínimo 6 caracteres'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  password: yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter 6 caracteres no mínimo'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas não conferem')
})

export default function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState


  const handleCreateUser = async (values) => {
    console.log(values)
  }


  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'5xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Junte-se a 30 compradores!
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.id}
                  name={avatar.name}
                  src={avatar.avatar}
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={0}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Avatar
              size={useBreakpointValue({ base: 'md', md: 'lg' })}
              position={'relative'}
              zIndex={0}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, red.400,pink.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            />
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack as="form" spacing={4} onSubmit={handleSubmit(handleCreateUser)}>
            <Input
              placeholder="Nome"
              name="name"
              type="name"
              {...register('name')}
              error={errors.name}
            />
            <Input
              placeholder="Email"
              name="email"
              {...register('email')}
              error={errors.email}
            />
            <Input
              placeholder="Senha"
              type="password"
              name="password"
              {...register('password')}
              error={errors.password}
            />
            <Input
              placeholder="Confirmar senha"
              type="password"
              {...register('password_confirmation')}
              error={errors.password_confirmation}
            />
            <Button
              fontFamily={'heading'}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              type="submit"
              isLoading={formState.isSubmitting}
            >
              Registrar-se
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box >
  );
}
