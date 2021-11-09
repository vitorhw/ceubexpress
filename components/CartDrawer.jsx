import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Text,
  Icon,
  Button,
  HStack,
  useDisclosure,
  Spacer
} from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { CartItem } from './CartItem';
import { useState, useEffect } from 'react';
import faker from 'faker'

export function CartDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const prods = [...Array(20)].map((_, i) => ({
      id: i,
      isFavourite: faker.random.boolean(),
      brand: faker.commerce.department(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image()
    }));

    setProducts(prods);
  }, []);

  return (
    <>
      <IconButton
        variant="unstyled"
        fontSize="1.5rem"
        lineHeight="0"
        onClick={onOpen}
        icon={<Icon as={RiShoppingCart2Line} />}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader fontWeight="semibold">
            Carrinho de compras
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            {!products ? (
              <Text>Nenhum item adicionado :(</Text>
            ) : (
              products.map(product => (
                <CartItem
                  key={product.id}
                  productBrand={product.brand}
                  productName={product.name}
                  productPrice={product.price}
                  productImage={product.image}
                />
              ))
            )}
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Text>Total: R$ 0,00</Text>
              <Spacer />
              <Button
                colorScheme="pink"
                variant="solid"
                isLoading={loading}
              >
                Pagar agora
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
