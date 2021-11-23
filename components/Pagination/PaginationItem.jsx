import { Button } from "@chakra-ui/react";

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
          cursor: "default",
          bg: "pink.400",
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
      colorScheme="pink"
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
