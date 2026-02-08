//C:\Users\UDAYN\Downloads\BookShareApp\components\header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Menu,
  User,
  Settings,
  LogOut,
  Plus,
  Search,
  Home,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useSession } from "@/app/context/SessionContext";
import Swal from "sweetalert2";
import { Lock } from "lucide-react";

export function Header() {
  const { user, logout, loading } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const handleProtectedRoute = (href: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to access this feature.",
        variant: "destructive",
      });
      router.push("/login");
    } else {
      router.push(href);
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home, protected: false },
    {
      name: "Buy Books",
      href: user
        ? user.isAdmin
          ? "/dashboard/admin"
          : "/dashboard/user"
        : "/login", // fallback if user is not logged in
      icon: Search,
      protected: true,
    },
    { name: "Sell Books", href: "/sell", icon: Plus, protected: true },
    ...(user
      ? [
          {
            name: user.isAdmin ? "Admin Dashboard" : "Dashboard",
            href: user.isAdmin ? "/dashboard/admin" : "/dashboard/user",
            icon: User,
            protected: true,
          },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/30 dark:bg-black/40 border-b border-purple-700/30 shadow-[0_4px_30px_rgba(128,90,213,0.3)]">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-purple-500" />
            <span className="text-3xl font-semibold tracking-tight text-white">
              BookShareApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navItems.map(
              ({ name, href, icon: Icon, protected: isProtected }) => (
                <button
                  key={name}
                  onClick={() =>
                    isProtected ? handleProtectedRoute(href) : router.push(href)
                  }
                  // className="group relative flex items-center gap-2 px-5 py-2 text-base md:text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 border border-purple-600 hover:shadow-[0_4px_30px_rgba(128,90,213,0.4)] active:translate-y-[1px] transition-all duration-300 ease-in-out backdrop-blur-sm before:absolute before:inset-0 before:border before:border-purple-400 before:rounded-xl before:animate-border-glow before:z-[-1]"

                  className="
relative isolate overflow-hidden
flex items-center gap-2 px-5 py-2
text-base md:text-lg font-semibold text-white
rounded-xl
bg-gradient-to-r from-purple-600 to-purple-800
border border-purple-500/40

transition-colors duration-200
hover:from-purple-500 hover:to-purple-700
hover:shadow-lg hover:shadow-purple-700/30

active:scale-[0.97]

focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-purple-400
"
                >
                  <Icon className="w-6 h-6 text-purple-300 group-hover:text-purple-100 transition-transform group-hover:scale-105" />
                  <span>{name}</span>
                </button>
              ),
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-11 w-11 ring-2 ring-purple-600 ring-offset-2 ring-offset-black hover:scale-105 transition-transform cursor-pointer">
                    <AvatarFallback className="bg-purple-600 text-white text-xl font-semibold">
                      {user.fullName?.[0]?.toUpperCase() ||
                        user.name?.[0]?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-60 bg-slate-900 border border-purple-700/50 shadow-xl"
                  align="end"
                >
                  <div className="p-3 space-y-1">
                    <p className="text-white font-semibold">
                      {user.fullName || user.name}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-purple-700/30" />

                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        user.isAdmin ? "/dashboard/admin" : "/dashboard/user"
                      }
                      className="flex items-center gap-2 text-white hover:text-purple-300"
                    >
                      <User className="w-5 h-5" />
                      {user.isAdmin ? "Admin Dashboard" : "Dashboard"}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile/edit"
                      className="flex items-center gap-2 text-white hover:text-purple-300"
                    >
                      <Settings className="w-5 h-5" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/forgot-password"
                      className="flex items-center gap-2 text-white hover:text-purple-300"
                    >
                      <Lock className="w-5 h-5" />
                      Reset Password
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-purple-700/30" />

                  <DropdownMenuItem
                    onClick={async () => {
                      const result = await Swal.fire({
                        title: "Are you sure?",
                        text: "Do you really want to logout?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, logout",
                      });

                      if (result.isConfirmed) {
                        handleLogout();
                      }
                    }}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !loading ? (
              <div className="hidden md:flex gap-3">
                <Link href="/login">
                  <Button
                    className="px-5 py-2 text-lg font-semibold text-white
bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl
hover:from-purple-500 hover:to-purple-700
active:translate-y-[1px]
transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className="px-5 py-2 text-lg font-semibold text-white
bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl
hover:from-purple-500 hover:to-purple-700
hover:shadow-[0_0_25px_rgba(128,90,213,0.6)]
transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : null}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-7 h-7" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-900 border-l border-purple-700/40"
              >
                <div className="mt-10 flex flex-col gap-4">
                  {navItems.map(
                    ({ name, href, icon: Icon, protected: isProtected }) => (
                      <button
                        key={name}
                        onClick={() => {
                          setIsOpen(false);
                          isProtected
                            ? handleProtectedRoute(href)
                            : router.push(href);
                        }}
                        // className="group relative flex items-center gap-3 px-4 py-3 text-base md:text-lg font-semibold text-white rounded-xl border transition-all duration-300 ease-in-out backdrop-blur-md bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 border-purple-700 hover:shadow-[0_4px_30px_rgba(128,90,213,0.4)] active:translate-y-[1px] before:absolute before:inset-0 before:rounded-xl before:border before:border-purple-400 before:animate-border-glow before:z-[-1]"

                        className={`group relative flex items-center gap-3 px-4 py-3
text-base md:text-lg font-semibold text-white rounded-xl border
transition-colors duration-200
hover:shadow-lg hover:shadow-purple-700/30
active:scale-[0.97]
focus-visible:ring-2 focus-visible:ring-purple-400
overflow-hidden isolate`}
                      >
                        <Icon className="w-6 h-6" />
                        <span>{name}</span>
                      </button>
                    ),
                  )}

                  {user ? (
                    <div className="mt-4 space-y-2">
                      <Link
                        href={
                          user.isAdmin ? "/dashboard/admin" : "/dashboard/user"
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="w-full flex gap-2 justify-start text-white text-lg bg-purple-700/30 hover:bg-purple-600/40 border border-purple-600 rounded-xl">
                          <User className="w-5 h-5" />
                          {user.isAdmin ? "Admin Dashboard" : "Dashboard"}
                        </Button>
                      </Link>
                      <Link
                        href="/profile/edit"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="w-full flex gap-2 justify-start text-white text-lg bg-purple-700/30 hover:bg-purple-600/40 border border-purple-600 rounded-xl">
                          <Settings className="w-5 h-5" />
                          Settings
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full flex gap-2 justify-start text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-600/20 border border-red-400/30 rounded-xl text-lg"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </Button>
                    </div>
                  ) : !loading ? (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full text-white mt-2 bg-gradient-to-r from-purple-600 to-purple-800 border border-purple-700 rounded-xl text-lg">
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full text-white mt-2 bg-gradient-to-r from-purple-600 to-purple-800 border border-purple-700 rounded-xl text-lg">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
