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
  Button,
  Icon
} from '@chakra-ui/react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import Link from 'next/link'

export function ProfilePopover({ name }) {
  return (
    <Popover isLazy trigger="click" >
      <PopoverTrigger>
        <Avatar size="sm" as="button" name={name} />
      </PopoverTrigger>
      <PopoverContent width="8rem">
        <PopoverHeader fontWeight="semibold">
          <Link href='/profile'>
            <Button colorScheme="gray" variant="link">{name}</Button>
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
          <Link href='/dashboard'>
            <Button colorScheme="gray" variant="ghost" w="100%">Dashboard</Button>
          </Link>
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
            >
              Sair
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
