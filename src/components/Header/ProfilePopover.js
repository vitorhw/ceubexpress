import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverTrigger,
  Avatar,
  Flex,
  Icon
} from '@chakra-ui/react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export function ProfilePopover({ name }) {
  return(
    <Popover isLazy trigger="click" >
      <PopoverTrigger>
        <Avatar size="sm" as="button" name={name} />
      </PopoverTrigger>
      <PopoverContent width="8rem">
        <PopoverHeader fontWeight="semibold">{name}</PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          <p>Conta</p>
          <p>Favoritos</p>
          <p>Sobre</p>
        </PopoverBody>
        <PopoverFooter>
          <Flex 
            justify="space-between"
            align="center"
          > 
            <a>Sair</a>
            <Icon as={RiLogoutBoxRLine} />
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
