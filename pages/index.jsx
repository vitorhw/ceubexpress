import { ProductList } from "../components/ProductList";
import { useState, useEffect, useCallback } from 'react';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { RiMagicFill } from "react-icons/ri";
import faker from 'faker';
import debounce from 'lodash.debounce'

faker.locale = "pt_BR"

function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = useCallback(
    debounce(async () => {
      const res = await getProducts();
      setProducts(res);
    }, 500), [])

  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search])

  function getProducts() {
    setLoading(true);
    const prods = [...Array(20)].map((_, i) => ({
      id: i,
      isFavourite: faker.random.boolean(),
      brand: faker.commerce.department(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image()
    }));

    setLoading(false);
    return prods
  }

  useEffect(() => {
    const response = getProducts();
    setProducts(response);
  }, []);

  return (
    <>
      <InputGroup
        w="100%"
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
          onChange={handleChange}
          value={search}
        />
      </InputGroup>
      <ProductList products={products} loading={loading} />
    </>
  )
}

export default Home
