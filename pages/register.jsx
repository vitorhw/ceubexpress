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
} from "@chakra-ui/react";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.umd";
import { parseCookies } from "nookies";
import { api } from "../services/api";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Counter } from "../components/Counter";

import ReactCanvasConfetti from "react-canvas-confetti";
import faker from "faker";
import * as yup from "yup";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const avatars = [...Array(5)].map((_, i) => ({
  id: i,
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
}));

const createUserFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter 6 caracteres no mínimo"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas não conferem"),
});

export default function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
    mode: "onBlur",
  });
  const { errors } = formState;
  const [userCounter, setUserCounter] = useState(0);
  const { signUp } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    async function getUserCount() {
      const response = await api.get("/user/quantity");
      setUserCounter(response.data.quantity);
    }

    getUserCount();
  }, []);

  const handleCreateUser = async (values) => {
    setIsLoading(true);
    const sign = await signUp({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    if (sign === "success") {
      fire();
    }
    setIsLoading(false);
  };

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"5xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            display="inline"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Junte-se a <Counter from={0} to={userCounter} />+ compradores!
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.id}
                  name={avatar.name}
                  src={avatar.avatar}
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={0}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Avatar
              size={useBreakpointValue({ base: "md", md: "lg" })}
              position={"relative"}
              zIndex={0}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, red.400,pink.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            />
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack
            as="form"
            spacing={4}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Input
              placeholder="Nome"
              name="name"
              type="name"
              {...register("name")}
              error={errors.name}
            />
            <Input
              placeholder="Email"
              name="email"
              {...register("email")}
              error={errors.email}
            />
            <Input
              placeholder="Senha"
              type="password"
              name="password"
              {...register("password")}
              error={errors.password}
            />
            <Input
              placeholder="Confirmar senha"
              type="password"
              {...register("password_confirmation")}
              error={errors.password_confirmation}
            />
            <Button
              fontFamily={"heading"}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              type="submit"
              isLoading={isLoading}
            >
              Registrar-se
            </Button>
            <ReactCanvasConfetti
              refConfetti={getInstance}
              style={canvasStyles}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
  const { ["ceubexpress-token"]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
