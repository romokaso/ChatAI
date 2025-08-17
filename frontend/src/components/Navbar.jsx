import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Bell, Search, Settings, User, LogOut, Crown, Gift } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { mockUser, mockNotifications } from '../data/mock';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white text-2xl font-bold tracking-wider">
              ROBLOX
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search games, people, groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 border-white/20 focus:bg-white focus:border-white/40 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side - User Info & Controls */}
          <div className="flex items-center space-x-4">
            {/* Robux Display */}
            <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full shadow-md">
              <Crown className="h-4 w-4 mr-1" />
              <span className="font-bold text-lg">{mockUser.robux}</span>
              <span className="ml-1 text-xs">Robux</span>
            </div>

            {/* Premium Badge */}
            {mockUser.premium && (
              <Badge variant="secondary" className="bg-yellow-500 text-black font-semibold">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src={mockUser.profileImage} alt={mockUser.username} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {mockUser.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{mockUser.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      @{mockUser.username}
                    </p>
                    <p className="text-xs leading-none text-green-600 font-semibold">
                      Level {mockUser.level} • {mockUser.robux} Robux
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Gift className="mr-2 h-4 w-4" />
                  <span>Inventory</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;