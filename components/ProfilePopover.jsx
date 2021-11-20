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
  Button
} from '@chakra-ui/react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

import Link from 'next/link'


export function ProfilePopover() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Popover isLazy trigger="click" >
      <PopoverTrigger>
        <Avatar size="sm" as="button" color="gray.100" name={user.name} />
      </PopoverTrigger>
      <PopoverContent width="8rem">
        <PopoverHeader fontWeight="semibold">
          <Link href='/profile'>
            <Button colorScheme="gray" variant="link">{user.name}</Button>
          </Link>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          <Link href='/purchases'>
            <Button colorScheme="gray" variant="ghost" w="100%">Compras</Button>
          </Link>
          <Link href='/favourites'>
            <Button colorScheme="gray" variant="ghost" w="100%">Favoritos</Button>
          </Link>
          {user.isUserAdmin &&
            <Link href='/dashboard'>
              <Button colorScheme="gray" variant="ghost" w="100%">Dashboard</Button>
            </Link>
          }
        </PopoverBody>
        <PopoverFooter>
          <Flex
            justify="space-between"
            align="center"
          >
            <Button
              colorScheme="gray"
              variant="link"
              rightIcon={<RiLogoutBoxRLine />}
              w="100%"
              onClick={signOut}
            >
              Sair
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
