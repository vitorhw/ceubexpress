import { Flex } from '@chakra-ui/react'
import { DashHeader } from './DashHeader'
import { Sidebar } from './Sidebar'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'


export function Dashboard({ children }) {
  return (

    <SidebarDrawerProvider>
      <Flex direction="column" minH="100vh">
        <DashHeader />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          {children}
        </Flex>
      </Flex>
    </SidebarDrawerProvider>
  )
}

