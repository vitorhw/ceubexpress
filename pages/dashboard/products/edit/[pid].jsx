import {
  Box,
  Flex,
  Heading,
  Divider,
  SimpleGrid,
  VStack,
  HStack,
  useToast,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { Input } from "../../../../components/Input";
import { Dashboard } from "../../../../components/Dashboard";
import Link from "next/link";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { api } from "../../../../services/api";
import { FileInput } from "../../../../components/FileInput";
import { getAPIClient } from "../../../../services/axios";
import { useState, useRef } from "react";
import { queryClient } from "../../../../services/queryClient";

import jwt from "jsonwebtoken";

const createUserFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve conter no mínimo 3 caracteres")
    .max(30, "Nome deve conter no máximo 60 caractes"),
  price: yup
    .number()
    .required("Preço é obrigatório")
    .min(0, "Preço deve ser maior que R$0,00")
    .max(10000, "Preço deve ser menor que R$10.001"),
  brand: yup
    .string()
    .required("Marca é obrigatório")
    .min(3, "Marca deve conter no mínimo 3 caracteres")
    .max(30, "Marca deve conter no máximo 60 caractes"),
});

export default function Create({ pid, pname, pprice, pbrand }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const toast = useToast();
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(createUserFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: pname,
      price: pprice,
      brand: pbrand,
    },
  });

  const { errors } = methods.formState;

  const handleCreateProduct = async (values) => {
    const formData = new FormData();

    if (!values.image) {
      toast({
        title: "Erro, selecione uma imagem!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    formData.append("image", values.image[0]);
    formData.append("brand", values.brand);
    formData.append("name", values.name);
    formData.append("price", values.price);

    try {
      const response = await api({
        method: "patch",
        url: `/product/${pid}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.id) {
        toast({
          title: "Produto atualizado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        router.push("/dashboard/products");
        queryClient.invalidateQueries("products");
      } else {
        toast({
          title: "Erro ao atualizar produto",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response) {
        toast({
          status: "error",
          description: err.response.data.message,
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await api.delete(`/product/${pid}`);

      if (response) {
        toast({
          title: "Produto excluído com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        queryClient.invalidateQueries("products");
        router.push("/dashboard/products");
      } else {
        toast({
          title: "Erro ao excluir produto",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response) {
        toast({
          status: "error",
          description: err.response.data.message,
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Dashboard>
      <FormProvider {...methods}>
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          p={["6", "8"]}
          onSubmit={methods.handleSubmit(handleCreateProduct)}
        >
          <Heading size="lg" fontWeight="normal">
            Editar produto
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                type="text"
                label="Nome"
                {...methods.register("name")}
                error={errors.name}
              />
              <Input
                name="price"
                type="number"
                label="Preço"
                {...methods.register("price")}
                error={errors.price}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="brand"
                type="text"
                label="Marca"
                {...methods.register("brand")}
                error={errors.brand}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FileInput
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  name="image"
                  label="Imagem"
                />
              </Box>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="red" onClick={() => setIsOpen(true)}>
                Excluir
              </Button>
              <Link href="/dashboard/products" passHref>
                <Button colorScheme="gray">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={methods.formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </FormProvider>

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
              Você realmente deseja excluir esse produto? Essa ação não poderá
              ser revertida.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteProduct} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
      const { data } = await apiClient.get(`/product/${ctx.params.pid}`);

      if (!data) {
        return {
          redirect: {
            destination: "/dashboard/products",
            permanent: false,
          },
        };
      }

      return {
        props: {
          pid: data.id,
          pname: data.name,
          pprice: data.price,
          pbrand: data.brand,
        },
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
