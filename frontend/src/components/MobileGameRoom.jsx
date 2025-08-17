import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Tabs,  TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Settings,
  Menu
} from 'lucide-react';
import { generateAIPlayer, generateAIChatMessage } from '../data/aiPlayers';

const MobileGameRoom = ({ game, onBack }) => {
  const [aiPlayers, setAiPlayers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('game');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const initialPlayers = [];
    const numPlayers = Math.floor(Math.random() * 12) + 8; // 8-19 AI players
    
    for (let i = 0; i < numPlayers; i++) {
      initialPlayers.push(generateAIPlayer());
    }
    
    setAiPlayers(initialPlayers);
    setPlayerCount(numPlayers + 1);

    const initialMessages = [];
    for (let i = 0; i < 5; i++) {
      initialMessages.push(generateAIChatMessage());
    }
    setChatMessages(initialMessages);

    setTimeout(() => setGameStarted(true), 2000);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setChatMessages(prev => [...prev.slice(-15), generateAIChatMessage()]);
      }

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

      if (Math.random() > 0.95) {
        const change = Math.random() > 0.6 ? 1 : -1;
        setPlayerCount(prev => Math.max(5, Math.min(25, prev + change)));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [gameStarted]);

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

    setChatMessages(prev => [...prev.slice(-15), userMessage]);
    setNewMessage('');

    setTimeout(() => {
      if (Math.random() > 0.4) {
        setChatMessages(prev => [...prev.slice(-15), generateAIChatMessage()]);
      }
    }, 1000 + Math.random() * 2000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" onClick={onBack} size="sm" className="text-white hover:bg-white/10 p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold truncate">{game.title}</h1>
            <div className="flex items-center justify-center space-x-3 text-sm">
              <Badge className="bg-green-500 text-white">
                <Users className="h-3 w-3 mr-1" />
                {playerCount}
              </Badge>
              <Badge className="bg-blue-500 text-white">
                <Bot className="h-3 w-3 mr-1" />
                {aiPlayers.length} AI
              </Badge>
              <Badge className="bg-yellow-500 text-black">
                ∞ Robux
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="game" className="text-xs">
            <Gamepad2 className="h-4 w-4 mr-1" />
            Game
          </TabsTrigger>
          <TabsTrigger value="chat" className="text-xs">
            <MessageCircle className="h-4 w-4 mr-1" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="players" className="text-xs">
            <Bot className="h-4 w-4 mr-1" />
            AI Players
          </TabsTrigger>
        </TabsList>

        {/* Game Tab */}
        <TabsContent value="game">
          <div className="p-4">
            {/* Game Screen */}
            <Card className="h-64 mb-4">
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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                        <div className="text-lg font-bold">Loading...</div>
                        <div className="text-xs">Connecting to AI players</div>
                      </div>
                    ) : (
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold mb-2">🎮 Game Active!</div>
                        <div className="text-sm">Playing with {aiPlayers.length} AI</div>
                        <div className="mt-2 flex justify-center space-x-2">
                          <div className="bg-white/20 px-2 py-1 rounded text-xs">
                            Score: {Math.floor(Math.random() * 3000) + 1000}
                          </div>
                          <div className="bg-white/20 px-2 py-1 rounded text-xs">
                            Lv: 99
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Game Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>Live Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Your Score</span>
                    <Badge variant="outline">{Math.floor(Math.random() * 5000) + 2000}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Active</span>
                    <Badge className="bg-blue-500">{aiPlayers.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Game Time</span>
                    <Badge variant="outline">{Math.floor(Math.random() * 30) + 5}m</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Robux</span>
                    <Badge className="bg-green-500 text-white">∞</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat">
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.player.profileImage} alt={msg.player.username} />
                      <AvatarFallback className="text-xs">{msg.player.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-sm">{msg.player.username}</span>
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
            
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  placeholder="Chat with AI players..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* AI Players Tab */}
        <TabsContent value="players">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-3">
              {aiPlayers.map((player) => (
                <Card key={player.id} className="p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
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
                          {player.currentBehavior}
                        </Badge>
                        <span className="text-xs text-gray-500">Lv.{player.level}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{player.score}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileGameRoom;