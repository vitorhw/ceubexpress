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
} from "@chakra-ui/react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { CartItem } from "./CartItem";
import { useState, useContext } from "react";
import { useCart } from "react-use-cart";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import { useRouter } from "next/router";

export function CartDrawer({ setIsLoginModalOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { items, cartTotal, isEmpty, totalUniqueItems, emptyCart } = useCart();
  const router = useRouter();

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  async function handleBuy() {
    if (!user) {
      setIsLoginModalOpen(true);
      onClose();
    } else {
      setLoading(true);

      let itemToBuy = [];

      items.map((item) => {
        itemToBuy.push(item.id);
      });

      const purchaseResponse = await api.post("/purchase", {
        productOnPurchase: itemToBuy,
        userId: user.id,
      });

      if (purchaseResponse) {
        emptyCart();
        router.push(purchaseResponse.data.success);
      }

      setLoading(false);
    }
  }

  return (
    <>
      <Flex position="relative">
        <IconButton
          variant="unstyled"
          fontSize="1.5rem"
          lineHeight="0"
          onClick={onOpen}
          icon={<Icon as={RiShoppingCart2Line} />}
        />
        {totalUniqueItems > 0 && (
          <Text
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
          </Text>
        )}
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
              <Text>Está meio vazio aqui :(</Text>
            ) : (
              items.map((product) => (
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
                onClick={handleBuy}
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
