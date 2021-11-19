import {
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Grid,
  Center,
  Button,
  Skeleton
} from "@chakra-ui/react"
import { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '../components/Product'
import { RiMagicFill } from "react-icons/ri";
import { api } from '../services/api'
import { parseCookies } from 'nookies'
import { getAPIClient } from '../services/axios'

import debounce from 'lodash.debounce'
import jwt from 'jsonwebtoken'


function Home({ favoriteList }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(100);
  const [skip, setSkip] = useState(0);
  const take = 100;

  const handleSearch = useCallback(
    debounce(async () => {
      const res = await getSearchProducts();
    }, 500), [])

  async function getSearchProducts() {
    setLoading(true);
    setSkip(0);
    const response = await api.post(`/product/search?take=${take}&skip=${skip}`, {
      search,
    })

    console.log(response)
    console.log(search)
  }

  useEffect(() => {
    async function retrieveProducts() {
      await getProducts();
    }

    retrieveProducts()
  }, []);

  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search])

  async function getProducts() {
    setLoading(true);
    const response = await api.get(`/product/pagination?take=${take}&skip=${skip}`)
    setTotal(response.data.productsCount);
    let productsFormatted = response.data.products.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        isFavourite: favoriteList.includes(product.id)
      }
    })

    setProducts([...products, ...productsFormatted]);
    setSkip(skip + take);
    setLoading(false);
  }

  return (
    <>
      <InputGroup
        w="80%"
        maxW="400px"
        justify="center"
        m="auto"
        mt="4rem"
      >
        <InputRightElement
          children={<RiMagicFill color="gray.300" />}
          pointerEvents="none"
        />
        <Input
          placeholder="Busca"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
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
                productBrand={product.brand}
                productName={product.name}
                productPrice={product.price}
                productImage={product.image}
              />
            </Skeleton>
          ))}
        </Grid>
      </Flex>
      <Center>
        <Button
          mb={8}
          onClick={async () => await getProducts()}
          isLoading={loading}
          disabled={skip >= total}
        >
          Carregar mais
        </Button>
      </Center>
    </>
  )
}

export default Home

export const getServerSideProps = async (ctx) => {
  const { ['ceubexpress-token']: token } = parseCookies(ctx)
  const apiClient = getAPIClient(ctx);


  if (!token) {
    return {
      props: {
        favoriteList: [],
      }
    }
  }

  const json = jwt.decode(token);
  const { sub } = json;
  let data = [];

  const response = await apiClient.get(`/favorites/${sub}`)
  data = response.data.map((favorite) => {
    return favorite.product.id
  })

  return {
    props: {
      favoriteList: data,
    }
  }
}