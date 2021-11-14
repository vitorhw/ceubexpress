import { Button } from '@chakra-ui/react'

export function PaginationItem({ isCurrent = false, number, onPageChange }) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: 'pink.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.500"
      _hover={{
        bg: 'gray.400'
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}