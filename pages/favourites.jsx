import { useState, useEffect, useContext } from 'react';
import { RiStarLine } from 'react-icons/ri';
import { Text, Center, Skeleton, Flex, Grid } from '@chakra-ui/react';
import { parseCookies } from 'nookies'
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Product } from '../components/Product';


function Favourites() {
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
    )
  }

  return (
    <Flex w="100%" justify="center" my="4rem">
      <Grid
        templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {favorites.map(favorite => (
          <Skeleton isLoaded={!loading}>
            <Product
              key={favorite.product.id}
              id={favorite.product.id}
              isFavourite={true}
              productBrand={favorite.product.brand}
              productName={favorite.product.name}
              productPrice={favorite.product.price}
              productImage={favorite.product.image}
            />
          </Skeleton>
        ))}
      </Grid>
    </Flex>
  )
}

export default Favourites

export const getServerSideProps = async (ctx) => {
  const { ['ceubexpress-token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}