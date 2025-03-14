import React from "react";
import { Home, Menu, User, Settings, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showProfile?: boolean;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onHomeClick?: () => void;
}

const Header = ({
  title = "CalmCompanion",
  showMenu = true,
  showProfile = true,
  onProfileClick = () => {},
  onSettingsClick = () => {},
  onHomeClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-teal-50 border-b border-teal-100 flex items-center justify-between px-4 md:px-6 shadow-sm">
      <div className="flex items-center">
        {showMenu && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-teal-700"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-teal-50">
              <SheetHeader>
                <SheetTitle className="text-teal-800">Menu</SheetTitle>
                <SheetDescription className="text-teal-600">
                  Access app features and resources
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-start text-teal-700 hover:text-teal-900 hover:bg-teal-100"
                    onClick={onHomeClick}
                  >
                    <Home className="mr-2" size={18} />
                    Home
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-start text-teal-700 hover:text-teal-900 hover:bg-teal-100"
                  >
                    <svg
                      className="mr-2"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    Resources
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-start text-teal-700 hover:text-teal-900 hover:bg-teal-100"
                    onClick={onSettingsClick}
                  >
                    <Settings className="mr-2" size={18} />
                    Settings
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        )}
        <h1 className="text-xl font-semibold text-teal-800">{title}</h1>
      </div>

      {showProfile && (
        <Button
          variant="ghost"
          size="icon"
          className="text-teal-700"
          onClick={onProfileClick}
        >
          <User size={24} />
        </Button>
      )}
    </header>
  );
};

export default Header;
