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
  Flex,
  HStack,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { CartItem } from './CartItem';
import { useState } from 'react';
import { useCart } from "react-use-cart";

export function CartDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { items, cartTotal, isEmpty, totalUniqueItems } = useCart();

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal);


  return (
    <>
      <Flex
        position="relative"
      >
        <IconButton
          variant="unstyled"
          fontSize="1.5rem"
          lineHeight="0"
          onClick={onOpen}
          icon={<Icon as={RiShoppingCart2Line} />} />
        {totalUniqueItems > 0 && <Text
          position="absolute"
          top="0"
          right="0"
          fontSize="10px"
          bgColor="red.400"
          color="white"
          fontWeight="bold"
          h="1rem"
          w="1rem"
          borderRadius="full"
          textAlign="center"
        >
          {totalUniqueItems >= 10 ? "9+" : totalUniqueItems}
        </Text>}
      </Flex>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader fontWeight="semibold">
            Carrinho
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            {isEmpty ? (
              <Text>Nenhum item adicionado :(</Text>
            ) : (
              items.map(product => (
                <CartItem
                  key={product.id}
                  id={product.id}
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
              <Text>Total: {formattedTotal}</Text>
              <Spacer />
              <Button
                disabled={isEmpty}
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