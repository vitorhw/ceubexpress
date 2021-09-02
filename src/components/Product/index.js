import { Grid, Flex, Spinner } from '@chakra-ui/react';
import { ProductBox } from './ProductBox';
import { React, useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export function Product() {

  const {products} = useContext(AuthContext);

  return (
    <Flex w="100%" justify="center" mt="4rem">
      <Grid
        templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {products === '' ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          products.map((product) => (
            <ProductBox
              isFavourite={true}
              productBrand={product.data.product_brand[0].text}
              productName={product.data.product_name[0].text}
              productPrice={product.data.product_price}
              productImage={product.data.product_image.url}
              productImageAlt={product.data.product_image.alt}
            />
          ))
        )}
      </Grid>
    </Flex>
  );
}
