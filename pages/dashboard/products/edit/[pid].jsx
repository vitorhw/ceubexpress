import {
  Box,
  Flex,
  Heading,
  Divider,
  SimpleGrid,
  VStack,
  HStack,
  Button
} from "@chakra-ui/react";
import { Input } from "../../../../components/Input";
import { Dashboard } from "../../../../components/Dashboard";
import Link from 'next/link'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone';
import { useMemo } from 'react';

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(6, 'Nome deve conter no mínimo 6 caracteres').max(30, 'Nome deve conter no máximo 60 caractes'),
  price: yup.number().required('Preço é obrigatório').min(0, 'Preço deve ser maior que R$0,00').max(10000, 'Preço deve ser menor que R$10.001'),
})

export default function Edit() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })
  const { acceptedFiles, getRootProps, fileRejections, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });
  const { errors } = formState

  const files = acceptedFiles.map(file => (
    <p>{file.path}</p>
  ));

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
    color: '#bdbdbd',
    height: '200px',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const style = useMemo(() => ({
    ...baseStyle
  }));

  const handleCreateUser = async (values) => {
    // await createUser.mutateAsync(values)
    console.log('success')

    // router.push('/dashboard/users')
  }

  return (
    <Dashboard>
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        p={["6", "8"]}
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Heading size="lg" fontWeight="normal">Editar produto</Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              name="name"
              type="name"
              label="Nome"
              {...register('name')}
              error={errors.name}
            />
            <Input
              name="email"
              type="number"
              label="Preço"
              {...register('price')}
              error={errors.price}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Box {...getRootProps({ style })}>
              <input
                {...getInputProps()}
              />
              <p>Arraste uma imagem até aqui ou clique para selecionar um arquivo.</p>
              <p>{files}</p>
            </Box>
          </SimpleGrid>

        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/dashboard/products" passHref>
              <Button colorScheme="whiteAlpha">Cancelar</Button>
            </Link>
            <Button
              type="submit"
              colorScheme="pink"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </HStack>

        </Flex>

      </Box>
    </Dashboard >
  );
}