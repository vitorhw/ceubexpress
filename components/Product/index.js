import { Grid, Flex, Spinner } from '@chakra-ui/react';
import { ProductBox } from './ProductBox';
import Prismic from '@prismicio/client';
import { useState, useEffect, React } from 'react';

export function Product({ product }) {
  const [products, setProductsData] = useState('');

  const Client = Prismic.client(process.env.REACT_APP_PRISMIC_END_POINT, {
    accessToken: process.env.REACT_APP_PRISMIC_ACCESS_TOKEN,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await Client.query(
  //       Prismic.Predicates.at('document.type', 'products')
  //     );
  //     if (response) {
  //       setProductsData(response.results);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (product === null) {
  //   console.log('NULL');
  // }

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
              key={product.data.id}
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
