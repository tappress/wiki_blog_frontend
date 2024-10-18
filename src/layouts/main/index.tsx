import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMeQuery } from "@/store/api/user-api";
import { getAccessToken } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/lib/enums/app-route";
import {
  Book,
  BookOpen,
  CircleUser,
  Newspaper,
  Search,
  SunMoon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { ThemeContext } from "@/lib/context/theme";

export function MainLayout() {
  const navigate = useNavigate();
  const { data: me } = useGetMeQuery(undefined, {
    skip: getAccessToken() === null,
  });
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 bg-secondary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" className="h-8" />
            </div>
            <nav className="flex space-x-5">
              <Link
                to="/"
                className="hover:text-foreground inline-flex items-center text-muted-foreground"
              >
                <Newspaper strokeWidth={1.5} className="size-5 mr-2" /> Blog
              </Link>

              <Link
                to="/wiki"
                className="hover:text-foreground inline-flex items-center text-muted-foreground"
              >
                <BookOpen strokeWidth={1.5} className="size-5 mr-2" /> Wiki
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8 bg-background" />
              </div>
              <SunMoon
                strokeWidth={1.25}
                onClick={toggleTheme}
                className="cursor-pointer text-muted-foreground hover:text-foreground  size-5"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {me ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none">
                  <CircleUser className="mr-1 size-5" strokeWidth={1.25} />{" "}
                  {me.username}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  {me.is_admin && <DropdownMenuItem>Admin</DropdownMenuItem>}
                  <DropdownMenuItem>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="px-6"
                onClick={() => navigate(AppRoute.SIGN_IN)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="p-4 bg-secondary text-secondary-foreground text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <span>&copy; 2024 Horse Wiki. All rights reserved.</span>
          <nav className="space-x-4">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
