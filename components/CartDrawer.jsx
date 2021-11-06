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
  useDisclosure
} from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';

export function CartDrawer({ isCartItem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {!isCartItem ? (
              <Text>Nenhum item adicionado :(</Text>
            ) : (
              <Text>Arroz</Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Text>Total: R$ 0,00</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
