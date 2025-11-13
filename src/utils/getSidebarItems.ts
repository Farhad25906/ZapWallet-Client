import { role } from "@/constants/role";
import { adminSidebarItems } from "@/router/adminSidebarItems";
import { agentSidebarItems } from "@/router/agentSidebarItems";
import { userSidebarItems } from "@/router/userSidebarItems";

import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.super_admin:
      return [...adminSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    case role.agent:
      return [...agentSidebarItems];
    default:
      return [];
  }
};
