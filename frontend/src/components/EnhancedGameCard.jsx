import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Play, Users, Heart, Star, Bot, Zap } from 'lucide-react';
import { generateAIPlayer } from '../data/aiPlayers';

const EnhancedGameCard = ({ game, onPlay, onEnterGame }) => {
  const [liveAIPlayers, setLiveAIPlayers] = useState([]);
  const [livePlayerCount, setLivePlayerCount] = useState(game.players);

  useEffect(() => {
    // Generate live AI players for this game
    const aiPlayers = [];
    const numAI = Math.floor(Math.random() * 8) + 3; // 3-10 AI players
    
    for (let i = 0; i < numAI; i++) {
      aiPlayers.push(generateAIPlayer());
    }
    
    setLiveAIPlayers(aiPlayers);

    // Simulate live player count changes
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 20) - 10; // -10 to +10 change
      setLivePlayerCount(prev => Math.max(100, prev + change));
    }, 5000);

    return () => clearInterval(interval);
  }, [game.players]);

  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 1000000) + 'M';
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return num.toString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200 group">
      <div className="relative">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={game.isPlaying ? "default" : "secondary"} className="bg-green-500 text-white">
            {game.isPlaying ? "Playing" : "Play"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 flex space-x-2">
          <div className="flex items-center bg-black/70 text-white px-2 py-1 rounded-md text-sm">
            <Users className="h-3 w-3 mr-1" />
            {formatNumber(livePlayerCount)}
          </div>
          <div className="flex items-center bg-blue-600/80 text-white px-2 py-1 rounded-md text-sm">
            <Bot className="h-3 w-3 mr-1" />
            {liveAIPlayers.length} AI
          </div>
        </div>
        
        {/* Live AI Players Preview */}
        <div className="absolute bottom-2 right-2">
          <div className="flex -space-x-1">
            {liveAIPlayers.slice(0, 3).map((player, index) => (
              <Avatar key={player.id} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={player.profileImage} alt={player.username} />
                <AvatarFallback className="text-xs">{player.username.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {liveAIPlayers.length > 3 && (
              <div className="h-6 w-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center text-xs text-white font-bold">
                +{liveAIPlayers.length - 3}
              </div>
            )}
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
          
          {/* AI Players Mini List */}
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-700">Live AI Players</span>
              <Badge variant="outline" size="sm" className="text-xs">
                <Bot className="h-3 w-3 mr-1" />
                {liveAIPlayers.length} Active
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {liveAIPlayers.slice(0, 4).map((player) => (
                <span key={player.id} className="text-xs bg-white px-2 py-1 rounded text-gray-600 truncate max-w-20">
                  {player.username}
                </span>
              ))}
              {liveAIPlayers.length > 4 && (
                <span className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-600">
                  +{liveAIPlayers.length - 4} more
                </span>
              )}
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
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => onPlay(game)}
              variant="outline"
              className="w-full text-sm"
            >
              <Play className="h-3 w-3 mr-1" />
              Quick Play
            </Button>
            <Button 
              onClick={() => onEnterGame(game)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-colors duration-200"
            >
              <Zap className="h-3 w-3 mr-1" />
              Enter Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameCard;