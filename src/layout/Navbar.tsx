import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "react-router";

import React, { useState } from "react";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { role } from "@/constants/role";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMyInfoQuery } from "@/redux/features/user/user.api";
import ZapWalletLoader from "@/utils/ZapWalletLoader";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/faq", label: "Faq", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
];

export default function Navbar() {
  const { data, isLoading } = useMyInfoQuery(undefined);

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [showPendingModal, setShowPendingModal] = useState(false);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };
  if (isLoading) return <ZapWalletLoader />;
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 py-3">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-1 text-[#009689]"
          >
            <Logo />
            <span className="text-3xl font-bold mt-3">ZapWallet</span>
          </Link>
        </div>

        {/* Right side - Navigation and Auth */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <React.Fragment key={index}>
                  {link.role === "PUBLIC" && (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className="text-slate-600 hover:text-[#009689] py-1.5 font-semibold transition-colors"
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                  {link.role === data?.data?.role && (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className="text-slate-600 hover:text-[#009689] py-1.5 font-semibold transition-colors"
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Section */}
          {data?.data?.email ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full hover:bg-[#ffd8af]/20"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/avatars/user.jpg"
                        alt={data.data.email}
                      />
                      <AvatarFallback className="bg-[#009689] text-white font-bold">
                        {data.data.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {(data.data.role === role.super_admin ||
                    data.data.role === role.admin) && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {data.data.role === role.agent && (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        if (
                          data.data.agentInfo?.approvalStatus === "pending" ||
                          data.data.agentInfo?.approvalStatus === "rejected" ||
                          data.data.agentInfo?.approvalStatus === "suspended"
                        ) {
                          setShowPendingModal(true);
                        }
                      }}
                      asChild={
                        data.data.agentInfo?.approvalStatus === "approved"
                      }
                    >
                      {data.data.agentInfo?.approvalStatus === "approved" ? (
                        <span>Dashboard</span>
                      ) : (
                        <Link to="/agent">Dashboard</Link>
                      )}
                    </DropdownMenuItem>
                  )}
                  {data.data.role === role.user && (
                    <DropdownMenuItem asChild>
                      <Link to="/user" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                className="text-sm font-semibold border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white transition-all"
              >
                <Link to="/register">Register</Link>
              </Button>
              <Button
                asChild
                className="text-sm font-semibold bg-[#009689] hover:bg-[#007a6e] text-white transition-all"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden text-[#009689]"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2 md:hidden">
              <div className="flex flex-col gap-2">
                {navigationLinks.map((link, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="ghost"
                    className="justify-start text-slate-600 hover:text-[#009689] hover:bg-[#ffd8af]/20"
                  >
                    <Link to={link.href}>{link.label}</Link>
                  </Button>
                ))}

                {/* Mobile Auth Links */}
                {!data?.data?.email && (
                  <>
                    <Button
                      asChild
                      className="justify-start bg-[#009689] hover:bg-[#007a6e] text-white"
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="justify-start border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white"
                    >
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Dialog open={showPendingModal} onOpenChange={setShowPendingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Account {data?.data?.agentInfo?.approvalStatus}
            </DialogTitle>
            <DialogDescription className="text-center text-lg mt-4">
              Your agent account is currently {data?.data?.agentInfo?.approvalStatus}. Please
             contact support for more information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-center">
              <p className="font-semibold">Status: {data?.data?.agentInfo?.approvalStatus}</p>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <Button
                onClick={() => setShowPendingModal(false)}
                className="bg-[#009689] hover:bg-[#007a6e]"
              >
                <Link to="/contact">Contact Admin</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
