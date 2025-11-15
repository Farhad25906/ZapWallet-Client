import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMyInfoQuery } from "@/redux/features/user/user.api";
import ZapWalletLoader from "@/utils/ZapWalletLoader";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData, isLoading } = useMyInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };
  if (isLoading) return <ZapWalletLoader />;

  return (
    <Sidebar {...props} className="border-r-2 border-[#009689]">
      {/* Header with Logo */}
      <SidebarHeader className="items-center py-6 px-4 bg-gradient-to-br from-[#009689]/5 to-[#ffd8af]/5">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-1 text-[#009689]"
          >
            <Logo />
            <span className="text-3xl font-bold mt-3">ZapWallet</span>
          </Link>
        </div>

        {/* User Role Badge */}
        {userData?.data?.role && (
          <Badge className="mt-3 bg-[#009689] hover:bg-[#007a6e] text-white font-semibold capitalize px-3 py-1">
            {userData.data.role}
          </Badge>
        )}
      </SidebarHeader>

      <Separator className="bg-[#ffd8af]/30" />

      {/* Navigation Content */}
      <SidebarContent className="px-2 py-4">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-[#009689] font-bold text-xs uppercase tracking-wider px-3 py-2">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((menuItem) => (
                  <SidebarMenuItem key={menuItem.title}>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-[#009689] hover:text-white transition-all duration-200 font-semibold text-slate-700 rounded-lg mx-2 data-[active=true]:bg-[#009689] data-[active=true]:text-white"
                    >
                      <Link
                        to={menuItem.url}
                        className="flex items-center gap-3 px-3 py-2"
                      >
                        {menuItem.icon && (
                          <span className="flex-shrink-0">{menuItem.icon}</span>
                        )}
                        <span>{menuItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* <SidebarRail className="bg-[#009689] w-1" /> */}
    </Sidebar>
  );
}
