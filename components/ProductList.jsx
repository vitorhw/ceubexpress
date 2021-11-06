import { Grid, Flex, Spinner } from '@chakra-ui/react';
import { Product } from './Product';
import Prismic from '@prismicio/client';
import { useState, useEffect } from 'react';
import { Client } from '../services/prismicHelpers'

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const pageSize = 1;


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await Client().query(
        Prismic.Predicates.at('document.type', 'product'),
        {
          orderings: ['publication.title', 'publication.content'],
          pageSize: pageSize,
          after: skip,
        }
      );
      setProducts(...products, ...response.results);
      setSkip(skip + pageSize);
    };

    fetchProducts();
  }, [])

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
            <Product
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
