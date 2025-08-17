import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Crown, MessageCircle, UserPlus, Users, Gamepad2 } from 'lucide-react';

const PlayerCard = ({ player, onMessage, onAddFriend }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 1000000) + 'M';
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return num.toString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-gray-200">
              <AvatarImage src={player.profileImage} alt={player.username} />
              <AvatarFallback className="bg-blue-500 text-white text-xl">
                {player.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {/* Online Status */}
            <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white ${
              player.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`} />
            
            {/* Premium Badge */}
            {player.premium && (
              <div className="absolute -top-2 -right-2">
                <Crown className="h-6 w-6 text-yellow-500" />
              </div>
            )}
          </div>
          
          {/* Player Info */}
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg text-gray-900">{player.displayName}</h3>
            <p className="text-sm text-gray-600">@{player.username}</p>
            
            {/* Status */}
            <div className="flex flex-col items-center space-y-1">
              {player.isOnline ? (
                <Badge className="bg-green-500 text-white">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
                    Online
                  </div>
                </Badge>
              ) : (
                <Badge variant="secondary">Offline</Badge>
              )}
              
              {player.game && (
                <div className="flex items-center text-xs text-gray-600">
                  <Gamepad2 className="h-3 w-3 mr-1" />
                  Playing {player.game}
                </div>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center space-x-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-gray-900">Level</div>
              <div className="text-gray-600">{player.level}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">Robux</div>
              <div className="text-green-600 font-semibold">{formatNumber(player.robux)}</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onMessage(player)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              onClick={() => onAddFriend(player)}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Add Friend
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;