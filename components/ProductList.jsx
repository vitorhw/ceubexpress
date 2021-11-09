import { Grid, Flex, Skeleton } from '@chakra-ui/react';
import { Product } from './Product';
import { useState, useEffect } from 'react';
import faker from 'faker';

faker.locale = "pt_BR"

export function ProductList() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const prods = [...Array(20)].map((_, i) => ({
      id: i,
      isFavourite: faker.random.boolean(),
      brand: faker.commerce.department(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image()
    }));

    setProducts(prods);
  }, []);

  return (
    <Flex w="100%" justify="center" mt="4rem">
      <Grid
        templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {products.map(product => (
          <Skeleton isLoaded={!loading}>
            <Product
              key={product.id}
              isFavourite={product.isFavourite}
              productBrand={product.brand}
              productName={product.name}
              productPrice={product.price}
              productImage={product.image}
            />
          </Skeleton>
        ))}
      </Grid>
    </Flex>
  );
}
