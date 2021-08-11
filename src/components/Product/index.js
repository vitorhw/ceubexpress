import { Grid, Flex } from '@chakra-ui/react';
import { ProductBox } from './ProductBox';

export function Product() {
  return (
    <Flex w="100%" justify="center" mt="4rem">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
      </Grid>
    </Flex>
  );
}