import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';

export function CartPopover({ isCartItem }) {
  return(
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <IconButton 
          variant="unstyled" 
          fontSize="1.5rem" 
          lineHeight="0" 
          icon={<Icon as={ RiShoppingCart2Line }/>} 
        />
      </PopoverTrigger>
      <PopoverContent width="14rem">
        <PopoverHeader fontWeight="semibold">
          Carrinho de compras
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          {!isCartItem ? (
            <Text>Nenhum item adicionado :(</Text>
          ) : (
            <Text>Arroz</Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
