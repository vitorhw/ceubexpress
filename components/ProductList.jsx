import { Grid, Flex, Skeleton } from '@chakra-ui/react';
import { Product } from './Product';
import { useState, useEffect } from 'react';

export function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);

  return (
    <Flex w="100%" justify="center" mt="4rem">
      <Grid
        templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {products.map((product) => (
          <Skeleton isLoaded={!loading}>
            <Product
              isFavourite={true}
              productBrand={products.productBrand}
              productName={products.productName}
              productPrice={products.productPrice}
              productImage={products.productImage}
            />
          </Skeleton>
        ))}
      </Grid>
    </Flex>
  );
}
