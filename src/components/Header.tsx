// components/Header.tsx
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/slices/userSlice";
import { removeUserFromLocalStorage } from "@/lib/auth/utils";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = ({ title }: { title: string }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    removeUserFromLocalStorage();
    navigate("/login");
  };

  return (
    <header className="px-6 py-4 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex bg-transparent [&_svg]:size-6 items-center gap-2 p-1"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback className="text-lg ">
                  {user?.name?.charAt(0) || "H"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="text-secondary " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-primary">
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
