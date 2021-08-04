import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverTrigger,
  Avatar,
  Icon
} from '@chakra-ui/react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export function ProfilePopover({ name }){
  return(
    <Popover isLazy trigger="click" >
      <PopoverTrigger>
        <Avatar size="sm" name={name} />
      </PopoverTrigger>
      <PopoverContent width="100%">
        <PopoverHeader fontWeight="semibold">
          { name }
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          <p>Conta</p>
          <p>Suporte</p>
        </PopoverBody>
        <PopoverFooter fontWeight="italic">
          <Icon as={RiLogoutBoxRLine} /> Sair
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}