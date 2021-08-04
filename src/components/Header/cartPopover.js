import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';

export function CartPopover({ isCartItem }) {
  return(
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <Button variant="unstyled" fontSize="1.5rem">
          <RiShoppingCart2Line as="button" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">
          Carrinho de compras
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {!isCartItem ? (
            <Text>Nenhum item adicionado</Text>
          ) : (
            <Text>Arroz</Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}