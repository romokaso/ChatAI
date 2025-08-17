import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Bell, Search, Menu, X, Crown, Gift, User, Settings, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { mockUser, mockNotifications } from '../data/mock';

const MobileNavbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg border-b sticky top-0 z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-white text-xl font-bold tracking-wider">
              ROBLOX
            </div>
            <Badge className="bg-green-500 text-white text-xs">
              <Crown className="h-3 w-3 mr-1" />
              ∞
            </Badge>
          </div>

          {/* Right Side - Mobile Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10 p-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-red-500">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* User Profile */}
                  <div className="flex items-center space-x-3 p-4 border-b">
                    <Avatar className="h-12 w-12 border-2 border-purple-200">
                      <AvatarImage src={mockUser.profileImage} alt={mockUser.username} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {mockUser.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{mockUser.displayName}</h3>
                      <p className="text-sm text-gray-600">@{mockUser.username}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-green-500 text-white">
                          <Crown className="h-3 w-3 mr-1" />
                          ∞ Robux
                        </Badge>
                        <Badge variant="outline">Lv.{mockUser.level}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 py-4">
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Gift className="h-4 w-4 mr-3" />
                        Inventory
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Button>
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="p-4 border-t">
                    <Button variant="outline" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search games, AI players..."
                className="w-full pl-10 pr-4 py-2 bg-white/90 border border-white/20 rounded-lg focus:bg-white focus:border-white/40 transition-all duration-200"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNavbar;