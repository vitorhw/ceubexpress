import { Stack, Box, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'


const sibilingsCount = 1;

function generatePagesArray(from, to) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 2,
  currentPage = 1,
  onPageChange
}) {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - sibilingsCount, currentPage - 1)
    : []

  const nextPages = currentPage - 1 < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + sibilingsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{(currentPage * registerPerPage) - registerPerPage + 1}</strong> - <strong>{(currentPage * registerPerPage)}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction="row" spacing="2">

        {currentPage > (1 + sibilingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + sibilingsCount) &&
              <Text color="gray.300" width="6" textAlign="center">...</Text>}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        {(currentPage + sibilingsCount) < lastPage && (
          <>
            {(currentPage + 1 + sibilingsCount) < lastPage &&
              <Text color="gray.300" width="6" textAlign="center">...</Text>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  )
}