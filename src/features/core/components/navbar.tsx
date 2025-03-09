'use client';

import Link from 'next/link';
import { Bell, Briefcase, Building2, Menu, Search, User } from 'lucide-react';

import { Button } from '#/features/core/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '#/features/core/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '#/features/core/components/ui/navigation-menu';
import { Input } from '#/features/core/components/ui/input';

const navigationLinks = [
  { name: 'Find Jobs', href: '/jobs', icon: Search },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Saved Jobs', href: '/saved', icon: Briefcase },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

const Navbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-2 text-lg font-semibold"
                  >
                    <link.icon className="h-6 w-6" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">JobSpot</span>
          </Link>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink
                  className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  href={link.href}
                >
                  {link.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <form className="hidden lg:block">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search new job by position..."
                className="w-[200px] pl-8 lg:w-[300px]"
              />
            </div>
          </form>
          {/* {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {user.name}
                    </p>
                    <p className="text-muted-foreground text-xs leading-none">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : ( */}
          <Link href="/auth/signin" passHref>
            <Button className="cursor-pointer">
              <User className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
          {/* )} */}
        </div>
      </div>
    </header>
  );
};

export { Navbar };
