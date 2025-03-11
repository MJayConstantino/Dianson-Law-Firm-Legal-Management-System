"use client";

import { Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 bg-[#2D336B] text-white flex items-center justify-between px-4 md:px-8 z-20">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-[#1B1E4B] dark:hover:bg-gray-800" />
        <div className="text-xl md:text-2xl font-bold">
          {!isMobile && <div>Dianson Law Office</div>}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {!isMobile && (
          <div className="relative w-80">
            <Input
              placeholder="Search"
              className="h-10 bg-white dark:bg-gray-800 text-[#1B1E4B] dark:text-white pl-10 rounded-md"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1E4B] dark:text-gray-400" />
          </div>
        )}

        {!isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#1B1E4B] dark:bg-gray-700 text-white hover:bg-[#2D336B]/90 dark:hover:bg-gray-600 gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden md:inline">Create New</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New Matter</DropdownMenuItem>
              <DropdownMenuItem>New Task</DropdownMenuItem>
              <DropdownMenuItem>New Document</DropdownMenuItem>
              <DropdownMenuItem>New Event</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt={"User"}
                />
                <AvatarFallback className="text-black dark:text-white">
                  {"U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{"User Email"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            {isMobile && <DropdownMenuItem>Search</DropdownMenuItem>}
            {isMobile && <DropdownMenuItem>Create New</DropdownMenuItem>}
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
