import { Grid, Flex, Skeleton } from '@chakra-ui/react';
import { Product } from './Product';

export function ProductList({ products, loading }) {
  return (
    <Flex w="100%" justify="center" my="4rem">
      <Grid
        templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {products.map(product => (
          <Skeleton isLoaded={!loading}>
            <Product
              key={product.id}
              id={product.id}
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
