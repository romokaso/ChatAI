import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Play, Users, Heart, Star } from 'lucide-react';

const GameCard = ({ game, onPlay }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 1000000) + 'M';
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return num.toString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200">
      <div className="relative">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={game.isPlaying ? "default" : "secondary"} className="bg-green-500 text-white">
            {game.isPlaying ? "Playing" : "Play"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center bg-black/70 text-white px-2 py-1 rounded-md text-sm">
            <Users className="h-3 w-3 mr-1" />
            {formatNumber(game.players)}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900 truncate">{game.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{game.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>by {game.creator}</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1 text-red-500" />
                {formatNumber(game.likes)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Badge variant="outline" className="text-xs">
                {game.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Max {game.maxPlayers}
              </Badge>
            </div>
          </div>
          
          <Button 
            onClick={() => onPlay(game)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 transition-colors duration-200"
          >
            <Play className="h-4 w-4 mr-2" />
            {game.isPlaying ? "Continue Playing" : "Play"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;