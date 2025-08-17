import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Users, 
  MessageCircle, 
  Send, 
  Trophy, 
  Zap, 
  Bot,
  Crown,
  Star,
  Gamepad2,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { generateAIPlayer, generateAIChatMessage } from '../data/aiPlayers';

const GameRoom = ({ game, onBack }) => {
  const [aiPlayers, setAiPlayers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Initialize AI players
    const initialPlayers = [];
    const numPlayers = Math.floor(Math.random() * 15) + 8; // 8-22 AI players
    
    for (let i = 0; i < numPlayers; i++) {
      initialPlayers.push(generateAIPlayer());
    }
    
    setAiPlayers(initialPlayers);
    setPlayerCount(numPlayers + 1); // +1 for human player

    // Add initial chat messages
    const initialMessages = [];
    for (let i = 0; i < 5; i++) {
      initialMessages.push(generateAIChatMessage());
    }
    setChatMessages(initialMessages);

    // Start game simulation
    setTimeout(() => setGameStarted(true), 2000);
  }, []);

  // Simulate AI player activities
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      // Random AI chat messages
      if (Math.random() > 0.7) {
        setChatMessages(prev => [...prev.slice(-19), generateAIChatMessage()]);
      }

      // Random AI player behavior changes
      setAiPlayers(prev => prev.map(player => {
        if (Math.random() > 0.9) {
          const behaviors = ["building", "racing", "exploring", "chatting", "competing"];
          return {
            ...player,
            currentBehavior: behaviors[Math.floor(Math.random() * behaviors.length)],
            score: player.score + Math.floor(Math.random() * 100)
          };
        }
        return player;
      }));

      // Simulate players joining/leaving
      if (Math.random() > 0.95) {
        const change = Math.random() > 0.6 ? 1 : -1;
        setPlayerCount(prev => Math.max(5, Math.min(30, prev + change)));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      player: {
        username: "SuperGamer2025",
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616c5da2fb2?w=400&h=400&fit=crop&crop=face",
        isAI: false,
        premium: true
      },
      message: newMessage,
      timestamp: new Date(),
      type: 'chat'
    };

    setChatMessages(prev => [...prev.slice(-19), userMessage]);
    setNewMessage('');

    // AI response simulation
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setChatMessages(prev => [...prev.slice(-19), generateAIChatMessage()]);
      }
    }, 1000 + Math.random() * 3000);
  };

  const getBehaviorColor = (behavior) => {
    const colors = {
      building: 'bg-yellow-500',
      racing: 'bg-red-500',
      exploring: 'bg-green-500',
      chatting: 'bg-blue-500',
      competing: 'bg-purple-500',
      helping: 'bg-pink-500',
      dancing: 'bg-indigo-500',
      jumping: 'bg-orange-500',
      collecting: 'bg-teal-500',
      fighting: 'bg-gray-500'
    };
    return colors[behavior] || 'bg-gray-500';
  };

  const formatBehavior = (behavior) => {
    return behavior.charAt(0).toUpperCase() + behavior.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Games</span>
          </Button>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500 text-white">
              <Users className="h-3 w-3 mr-1" />
              {playerCount} Players
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
        
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{game.title}</CardTitle>
                <p className="text-blue-100 mt-2">{game.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm">Robux</div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Game Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Game Screen */}
          <Card className="h-96">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg overflow-hidden">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  {!gameStarted ? (
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                      <div className="text-xl font-bold">Loading Game...</div>
                      <div className="text-sm">Connecting to server with AI players</div>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold mb-2">🎮 Game Active!</div>
                      <div className="text-lg">Playing with {aiPlayers.length} AI players</div>
                      <div className="mt-4 flex justify-center space-x-4">
                        <div className="bg-white/20 px-3 py-1 rounded">
                          Score: {Math.floor(Math.random() * 5000) + 1000}
                        </div>
                        <div className="bg-white/20 px-3 py-1 rounded">
                          Level: 99
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Players List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-500" />
                <span>AI Players in Game ({aiPlayers.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {aiPlayers.map((player) => (
                    <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={player.profileImage} alt={player.username} />
                        <AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-sm truncate">{player.username}</span>
                          <Bot className="h-3 w-3 text-blue-500" />
                          {player.premium && <Crown className="h-3 w-3 text-yellow-500" />}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge size="sm" className={`text-xs ${getBehaviorColor(player.currentBehavior)} text-white`}>
                            {formatBehavior(player.currentBehavior)}
                          </Badge>
                          <span className="text-xs text-gray-500">Lv.{player.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat & Players Panel */}
        <div className="space-y-6">
          {/* Live Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Live Chat</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={msg.player.profileImage} alt={msg.player.username} />
                        <AvatarFallback className="text-xs">{msg.player.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-xs">{msg.player.username}</span>
                          {msg.player.isAI && <Bot className="h-3 w-3 text-blue-500" />}
                          {msg.player.premium && <Crown className="h-3 w-3 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-gray-700 break-words">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Game Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Live Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Your Score</span>
                  <Badge variant="outline">{Math.floor(Math.random() * 5000) + 2000}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Players Active</span>
                  <Badge className="bg-blue-500">{aiPlayers.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Game Time</span>
                  <Badge variant="outline">{Math.floor(Math.random() * 30) + 5}m</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Your Robux</span>
                  <Badge className="bg-green-500 text-white">∞</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-1" />
                  Boost
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Star className="h-4 w-4 mr-1" />
                  Rate
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Users className="h-4 w-4 mr-1" />
                  Invite
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Gamepad2 className="h-4 w-4 mr-1" />
                  Controls
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;