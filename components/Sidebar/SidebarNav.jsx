import { Stack } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiBarcodeBoxLine,
  RiShoppingBasket2Line,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href="/dashboard/users">
          Usuários
        </NavLink>
      </NavSection>
      <NavSection title="PRODUTOS">
        <NavLink icon={RiBarcodeBoxLine} href="/dashboard/products">
          Produtos
        </NavLink>
        <NavLink icon={RiShoppingBasket2Line} href="/dashboard/sales">
          Vendas
        </NavLink>
      </NavSection>
    </Stack>
  );
}
