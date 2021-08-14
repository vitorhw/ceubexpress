import { Grid, Flex } from '@chakra-ui/react';
import { ProductBox } from './ProductBox';

export function Product() {
  return (
    <Flex w="100%" justify="center" mt="4rem">
      <Grid
        templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        <ProductBox isFavourite={true} />
        <ProductBox isFavourite={false} />
        <ProductBox isFavourite={false} />
        <ProductBox isFavourite={false} />
        <ProductBox isFavourite={false} />
        <ProductBox isFavourite={true} />
        <ProductBox isFavourite={false} />
      </Grid>
    </Flex>
  );
}
