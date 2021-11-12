import { ProductList } from "../components/ProductList";
import { useState, useEffect, useCallback } from 'react';
import { RiStarLine } from 'react-icons/ri';
import faker from 'faker';
import { Box, Text, Center } from '@chakra-ui/react';

faker.locale = "pt_BR"

function Favourites() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  function getProducts() {
    setLoading(true);
    const prods = [...Array(20)].map((_, i) => ({
      id: i,
      isFavourite: true,
      brand: faker.commerce.department(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image()
    }));

    setLoading(false);
    return prods
  }

  useEffect(() => {
    const response = getProducts();
    setProducts(response);
  }, []);

  return (
    <>
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
      <ProductList products={products} loading={loading} />
    </>
  )
}

export default Favourites
