import {
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Grid,
  Text,
  Center,
  Box,
  Button,
  Skeleton,
  Spinner
} from "@chakra-ui/react"
import { useState, useEffect, useCallback } from 'react';
import { Product } from '../components/Product'
import { RiMagicFill } from "react-icons/ri";
import { api } from '../services/api'
import { parseCookies } from 'nookies'
import { getAPIClient } from '../services/axios'

import debounce from 'lodash.debounce'
import jwt from 'jsonwebtoken'


function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(100);
  const [skip, setSkip] = useState(0);
  const take = 8;
  let favoriteList = [];

  const handleSearch = useCallback(
    debounce(async (searchQuery, recurrency, skipAmount = 0, oldProducts = []) => {
      await getSearchProducts(searchQuery, recurrency, skipAmount, oldProducts);

    }, 500), [])

  async function getSearchProducts(searchQuery, recurrency = false, skipAmount, oldProducts) {
    setLoading(true);
    if (!recurrency) {
      setSkip(0);
    }

    const response = await api.post(`/product/search?take=${take}&skip=${skipAmount}`, {
      search: searchQuery,
    })
    setSkip(take + skipAmount)
    setTotal(response.data.productsCount)

    let productsFormattedSearch = response.data.products.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        isFavourite: favoriteList.includes(product.id)
      }
    })

    if (recurrency) {
      setProducts([...oldProducts, ...productsFormattedSearch])
    } else {
      setProducts(productsFormattedSearch);
    }


    setLoading(false);
  }

  useEffect(async () => {
    async function getUserFavourites() {
      const { ['ceubexpress-token']: token } = parseCookies();
      const json = jwt.decode(token);
      const { sub } = json;
      let data = [];

      try {
        const response = await api.get(`/favorites/${sub}`)

        data = response.data.map((favorite) => {
          return favorite.product.id
        })

      } catch {
        return []
      }
      return data;

    }

    async function retrieveProducts() {
      await getProducts();
    }

    favoriteList = await getUserFavourites();
    console.log(favoriteList)
    retrieveProducts();
  }, []);

  useEffect(() => {
    setSkip(0)
    if (search.length > 0) {
      handleSearch(search);
    } else {
      getProducts(true);
    }
  }, [search])

  async function getProducts(reset = false) {
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

    if (reset) {
      setProducts(productsFormatted);
    } else {
      setProducts([...products, ...productsFormatted]);
    }

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
      {loading && <Center my="8rem"><Spinner /></Center>}
      <Flex w="100%" justify="center" my="4rem">
        <Grid
          templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
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
                isFavourite={product.isFavourite}
              />
            </Skeleton>
          ))}
        </Grid>
      </Flex>
      {products.length === 0 && !loading &&
        <Text mb="100%" align="center" >Nenhum resultado!</Text>
      }
      <Center>
        <Button
          mb={8}
          onClick={async () => {
            if (search.length > 0) {
              await handleSearch(search, true, skip, products);
            } else {
              await getProducts()
            }
          }
          }
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