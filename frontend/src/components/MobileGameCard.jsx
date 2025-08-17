import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Play, Users, Heart, Bot, Zap, Crown } from 'lucide-react';
import { generateAIPlayer } from '../data/aiPlayers';

const MobileGameCard = ({ game, onPlay, onEnterGame }) => {
  const [liveAIPlayers, setLiveAIPlayers] = useState([]);
  const [livePlayerCount, setLivePlayerCount] = useState(game.players);

  useEffect(() => {
    const aiPlayers = [];
    const numAI = Math.floor(Math.random() * 8) + 5; // 5-12 AI players
    
    for (let i = 0; i < numAI; i++) {
      aiPlayers.push(generateAIPlayer());
    }
    
    setLiveAIPlayers(aiPlayers);

    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 20) - 10;
      setLivePlayerCount(prev => Math.max(50, prev + change));
    }, 8000);

    return () => clearInterval(interval);
  }, [game.players]);

  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 1000000) + 'M';
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return num.toString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 mx-2 mb-4">
      <div className="relative">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={game.isPlaying ? "default" : "secondary"} className="bg-green-500 text-white text-xs">
            {game.isPlaying ? "Playing" : "Play"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 flex space-x-2">
          <div className="flex items-center bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            <Users className="h-3 w-3 mr-1" />
            {formatNumber(livePlayerCount)}
          </div>
          <div className="flex items-center bg-blue-600/80 text-white px-2 py-1 rounded-md text-xs">
            <Bot className="h-3 w-3 mr-1" />
            {liveAIPlayers.length}
          </div>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-base text-gray-900 truncate">{game.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-2">{game.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>by {game.creator}</span>
            <div className="flex items-center">
              <Heart className="h-3 w-3 mr-1 text-red-500" />
              {formatNumber(game.likes)}
            </div>
          </div>
          
          {/* AI Players Preview - Mobile Optimized */}
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-700 flex items-center">
                <Bot className="h-3 w-3 mr-1" />
                AI Players ({liveAIPlayers.length})
              </span>
            </div>
            <div className="flex -space-x-1">
              {liveAIPlayers.slice(0, 6).map((player, index) => (
                <div key={player.id} className="relative">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={player.profileImage} alt={player.username} />
                    <AvatarFallback className="text-xs bg-blue-500 text-white">
                      {player.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {player.premium && (
                    <Crown className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />
                  )}
                </div>
              ))}
              {liveAIPlayers.length > 6 && (
                <div className="h-6 w-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center text-xs text-white font-bold">
                  +{liveAIPlayers.length - 6}
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => onPlay(game)}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              <Play className="h-3 w-3 mr-1" />
              Quick Play
            </Button>
            <Button 
              onClick={() => onEnterGame(game)}
              size="sm"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs"
            >
              <Zap className="h-3 w-3 mr-1" />
              Join AI Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileGameCard;