import { useState, useEffect, useContext } from "react";
import { RiStarLine } from "react-icons/ri";
import { Text, Center, Skeleton, Flex, Grid, Spinner } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import { Product } from "../components/Product";
import { getAPIClient } from "../services/axios";

import jwt from "jsonwebtoken";

function Favourites({ favoriteList }) {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  async function retrieveFavourites() {
    if (!user) {
      return;
    }
    const response = await api.get(`/favorites/${user.id}`);
    setFavorites(response.data);
    setLoading(false);
  }

  useEffect(() => {
    retrieveFavourites();
  }, [user]);

  if (loading) {
    return (
      <Center my="8rem">
        <Spinner />
      </Center>
    );
  }

  if (favorites.length === 0) {
    return (
      <Center
        color="gray.400"
        display="flex"
        h="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <RiStarLine />
        <Text ml="2">faça seu primeiro favorito</Text>
      </Center>
    );
  }

  return (
    <Flex w="100%" justify="center" my="4rem">
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
      >
        {favorites.map((favorite) => (
          <Skeleton isLoaded={!loading} key={favorite.product.id}>
            <Product
              id={favorite.product.id}
              isFavourite={favoriteList.includes(favorite.product.id)}
              productBrand={favorite.product.brand}
              productName={favorite.product.name}
              productPrice={favorite.product.price}
              productImage={favorite.product.image}
            />
          </Skeleton>
        ))}
      </Grid>
    </Flex>
  );
}

export default Favourites;

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
  const { sub } = json;
  let data = [];

  try {
    const response = await apiClient.get(`/favorites/${sub}`);
    data = response.data.map((favorite) => {
      return favorite.product.id;
    });
  } catch {
    return {
      props: {
        favoriteList: [],
      },
    };
  }

  return {
    props: {
      favoriteList: data,
    },
  };
};
