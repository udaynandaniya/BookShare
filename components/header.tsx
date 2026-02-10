


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
  Lock,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useSession } from "@/app/context/SessionContext";
import Swal from "sweetalert2";

export function Header() {
  const { user, logout, loading } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  /* ---------- Navigation ---------- */
  const go = (href: string) => {
    router.prefetch(href);
    router.push(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out",
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
      router.push("/login");
    } else {
      go(href);
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
        : "/login",
      icon: Search,
      protected: true,
    },
    { name: "Sell Books", href: "/sell", icon: Plus, protected: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/85 border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 py-2">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-purple-500" />
            <span className="text-xl md:text-2xl font-semibold text-white">
              BookShareApp
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-3 items-center">
            {navItems.map(({ name, href, icon: Icon, protected: isProtected }) => (
              <button
                key={name}
                onClick={() =>
                  isProtected ? handleProtectedRoute(href) : go(href)
                }
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
              >
                <Icon className="w-4 h-4" />
                {name}
              </button>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            <ThemeToggle />
            <LanguageToggle />

            {/* DESKTOP AUTH */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarFallback className="bg-purple-600 text-white">
                        {user.fullName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 bg-neutral-900 border border-white/10">
                    <div className="p-3">
                      <p className="text-white font-semibold">
                        {user.fullName || user.name}
                      </p>
                      <p className="text-xs text-neutral-400">{user.email}</p>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href={user.isAdmin ? "/dashboard/admin" : "/dashboard/user"}>
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/profile/edit">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/forgot-password">
                        <Lock className="w-4 h-4 mr-2" />
                        Reset Password
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Logout?",
                          icon: "warning",
                          showCancelButton: true,
                        });
                        if (result.isConfirmed) handleLogout();
                      }}
                      className="text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  {loading ? (
                    <span className="text-neutral-400 text-sm">Loading...</span>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button className="bg-white/10 hover:bg-white/20">Login</Button>
                      </Link>
                      <Link href="/signup">
                        <Button className="bg-purple-600 hover:bg-purple-500">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* MOBILE MENU */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-neutral-950 border-l border-white/10">

                {/* NAV LINKS */}
                <div className="mt-8 flex flex-col gap-3">
                  {navItems.map(({ name, href, icon: Icon, protected: isProtected }) => (
                    <button
                      key={name}
                      onClick={() => {
                        setIsOpen(false);
                        isProtected ? handleProtectedRoute(href) : go(href);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-white rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                    >
                      <Icon className="w-5 h-5" />
                      {name}
                    </button>
                  ))}
                </div>

                {/* AUTH SECTION MOBILE */}
                <div className="mt-6 border-t border-white/10 pt-6 flex flex-col gap-3">

                  {loading ? (
                    <span className="text-neutral-400 text-sm px-2">
                      Loading account...
                    </span>
                  ) : user ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-purple-600 text-white">
                            {user.fullName?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {user.fullName || user.name}
                          </p>
                          <p className="text-xs text-neutral-400">{user.email}</p>
                        </div>
                      </div>

                      <Link href="/profile/edit" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-start gap-2 bg-white/5 hover:bg-white/10">
                          <Settings className="w-4 h-4" />
                          Settings
                        </Button>
                      </Link>

                      <Link href="/forgot-password" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-start gap-2 bg-white/5 hover:bg-white/10">
                          <Lock className="w-4 h-4" />
                          Reset Password
                        </Button>
                      </Link>

                      <Button
                        onClick={async () => {
                          setIsOpen(false);
                          const result = await Swal.fire({
                            title: "Logout?",
                            icon: "warning",
                            showCancelButton: true,
                          });
                          if (result.isConfirmed) handleLogout();
                        }}
                        className="w-full justify-start gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-white/10 hover:bg-white/20">
                          Login
                        </Button>
                      </Link>

                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-purple-600 hover:bg-purple-500">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </div>
    </header>
  );
}
