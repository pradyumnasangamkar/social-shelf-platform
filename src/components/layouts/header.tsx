"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navigationLinks } from "./constants";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "./modeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { User, LogOut, Settings, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  const pathName = usePathname();
  const [role, setRole] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  const HandleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("Failed to SignOut !", error);
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        if (session?.user?.email) {
          const res = await axios.post<{ role: string }>("/api/user/get-role", {
            email: session.user.email,
          });
          setRole(res.data.role);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRole();
  }, [session]);

  return (
    // <SectionContainer>
    <header className="sticky top-0 w-full z-40 bg-transparent md:pb-8 md:pt-8 backdrop-blur-md bg-white/30 dark:bg-gray-950/30 shadow-sm">
      <div className="w-full flex items-center justify-between px-8 sm:px-6 lg:px-12">
        <div className="flex-1">
          <Link
            href="/"
            className="text-3xl font-extrabold flex items-center sm:text-xl md:text-2xl"
            aria-label="Social Shelf"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="ml-2">Social Shelf</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center space-x-6 text-base leading-2">
          <div className="hidden space-x-12 sm:flex">
            {navigationLinks.map(({ title, href }) => {
              const active = pathName?.includes(href);
              return (
                <Link
                  prefetch
                  key={title}
                  href={href}
                  className={classNames(
                    "horizontal-underline text-base mx-10",
                    {
                      "horizontal-underline-active": active,
                    }
                  )}
                  aria-label={title}
                >
                  <span className="font-semibold tracking-wide">{title}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-6">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>
                      <UserCircle className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      <UserCircle className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/${role}`}
                    className="flex items-center cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={HandleSignOut}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={classNames("horizontal-underline text-base mx-10", {
                  "horizontal-underline-active":
                    pathName === "/login" || pathName === "/register",
                })}
              >
                Login
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/register">
                  <DropdownMenuItem>Sign Up</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
