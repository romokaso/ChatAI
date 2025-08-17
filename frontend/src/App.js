import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MobileNavbar from './components/MobileNavbar';
import MobileGameCard from './components/MobileGameCard';
import MobileGameRoom from './components/MobileGameRoom';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';
import { 
  mockGames, 
  mockPlayers, 
  mockUser, 
  mockInventory, 
  mockStats 
} from './data/mock';
import { generateAIPlayer } from './data/aiPlayers';
import { 
  Play, 
  Users, 
  Gamepad2, 
  Crown, 
  Trophy,
  Clock,
  Star,
  Gift,
  Bot,
  Zap,
  Sparkles,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

const MobileHomePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('games');
  const [featuredGames, setFeaturedGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [aiPlayersOnline, setAiPlayersOnline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFeaturedGames(mockGames.slice(0, 4));
      
      const aiPlayers = [];
      for (let i = 0; i < 20; i++) {
        aiPlayers.push(generateAIPlayer());
      }
      setAiPlayersOnline(aiPlayers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePlayGame = (game) => {
    toast({
      title: "🎮 Starting Game!",
      description: `Launching ${game.title} with AI players...`,
    });
  };

  const handleEnterGame = (game) => {
    toast({
      title: "🚀 Entering Game Room...",
      description: `Loading ${game.title} with live AI players!`,
    });
    
    setTimeout(() => {
      setCurrentGame(game);
    }, 1500);
  };

  const handleBackToGames = () => {
    setCurrentGame(null);
    toast({
      title: "👋 Left Game Room",
      description: "Back to main lobby!",
    });
  };

  const handleMessagePlayer = (player) => {
    toast({
      title: "💬 Message Sent!",
      description: `Sent message to ${player.username}${player.isAI ? ' (AI)' : ''}`,
    });
  };

  const handleAddFriend = (player) => {
    toast({
      title: "🤝 Friend Request!",
      description: `Sent friend request to ${player.username}${player.isAI ? ' (AI)' : ''}`,
    });
  };

  if (currentGame) {
    return <MobileGameRoom game={currentGame} onBack={handleBackToGames} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800">Loading ROBLOX...</h2>
          <p className="text-gray-600">Connecting to AI players...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <MobileNavbar />
      
      {/* Mobile Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8 px-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to <span className="text-yellow-300">ROBLOX</span>
          </h1>
          <p className="text-sm text-blue-100">
            Play with advanced AI players and enjoy unlimited Robux! 🤖✨
          </p>
          <div className="flex justify-center space-x-3">
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2">
              <Play className="mr-2 h-4 w-4" />
              Start Gaming
            </Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2">
              <Bot className="mr-2 h-4 w-4" />
              Meet AI
            </Button>
          </div>
          
          {/* Mobile Stats */}
          <div className="flex justify-center items-center space-x-6 mt-6 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-xs text-blue-100">Robux</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{aiPlayersOnline.length}+</div>
              <div className="text-xs text-blue-100">AI Online</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs text-blue-100">Gaming</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-2 py-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="games" className="text-xs">
            <Gamepad2 className="h-4 w-4 mr-1" />
            Games
          </TabsTrigger>
          <TabsTrigger value="players" className="text-xs">
            <Bot className="h-4 w-4 mr-1" />
            AI
          </TabsTrigger>
          <TabsTrigger value="profile" className="text-xs">
            <Crown className="h-4 w-4 mr-1" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs">
            <Gift className="h-4 w-4 mr-1" />
            Items
          </TabsTrigger>
        </TabsList>

        {/* Games Tab */}
        <TabsContent value="games" className="space-y-4 mt-4">
          {/* AI Notice */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mx-2">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold">🤖 AI-Powered Games</h3>
                  <p className="text-xs text-blue-100">
                    Smart AI players in every game!
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">∞</div>
                  <div className="text-xs text-blue-100">Robux</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Games */}
          <div className="px-2">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-bold text-gray-900">Featured AI Games</h2>
            </div>
          </div>
          
          <div className="space-y-0">
            {mockGames.map((game) => (
              <MobileGameCard
                key={game.id}
                game={game}
                onPlay={handlePlayGame}
                onEnterGame={handleEnterGame}
              />
            ))}
          </div>
        </TabsContent>

        {/* AI Players Tab */}
        <TabsContent value="players" className="space-y-4 mt-4">
          <Card className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white mx-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">🧠 AI Players</h3>
                  <p className="text-xs text-cyan-100">
                    Smart companions ready to play!
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{aiPlayersOnline.length}</div>
                  <div className="text-xs text-cyan-100">Online</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="px-2 space-y-3">
            {[...mockPlayers, ...aiPlayersOnline.slice(0, 12)].map((player) => (
              <Card key={player.id} className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={player.profileImage} alt={player.username} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {player.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    {player.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                    
                    {player.isAI && (
                      <div className="absolute -top-1 -left-1 bg-blue-500 rounded-full p-1">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-bold text-sm text-gray-900 truncate">{player.displayName}</h3>
                      {player.premium && <Crown className="h-3 w-3 text-yellow-500" />}
                    </div>
                    <p className="text-xs text-gray-600">@{player.username}</p>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      {player.isOnline ? (
                        <Badge className="bg-green-500 text-white text-xs">
                          {player.isAI ? 'AI Online' : 'Online'}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Offline</Badge>
                      )}
                      
                      {player.currentBehavior && (
                        <Badge variant="outline" className="text-xs">
                          {player.currentBehavior}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">Lv.{player.level}</div>
                    {player.robux && (
                      <div className="text-xs text-green-600 font-semibold">
                        {typeof player.robux === 'number' ? player.robux.toLocaleString() : player.robux} R
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => handleMessagePlayer(player)}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {player.isAI ? 'Chat AI' : 'Message'}
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-xs"
                    onClick={() => handleAddFriend(player)}
                  >
                    <Users className="h-3 w-3 mr-1" />
                    {player.isAI ? 'Add AI' : 'Add'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <div className="px-2">
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <img 
                      src={mockUser.profileImage} 
                      alt={mockUser.username}
                      className="w-20 h-20 rounded-full mx-auto border-4 border-purple-200"
                    />
                    <Crown className="absolute top-0 right-1/3 h-6 w-6 text-yellow-500" />
                    <div className="absolute bottom-0 left-1/3 bg-blue-500 rounded-full p-1">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{mockUser.displayName}</h3>
                    <p className="text-gray-600 text-sm">@{mockUser.username}</p>
                    <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      AI Gaming Master
                    </Badge>
                  </div>
                  
                  <div className="flex justify-center items-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">∞</div>
                      <div className="text-xs text-gray-600">Robux</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">{mockUser.level}</div>
                      <div className="text-xs text-gray-600">Level</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold">{Math.floor(mockUser.followers / 1000)}K</div>
                      <div className="text-gray-600 text-xs">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{mockUser.following}</div>
                      <div className="text-gray-600 text-xs">Following</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>AI Gaming Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{mockStats.totalPlayTime}</div>
                    <div className="text-xs text-gray-600">Play Time</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Bot className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{aiPlayersOnline.length + 47}</div>
                    <div className="text-xs text-gray-600">AI Friends</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">∞</div>
                    <div className="text-xs text-gray-600">Robux</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <Trophy className="h-6 w-6 text-red-500 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{mockStats.badgesEarned}</div>
                    <div className="text-xs text-gray-600">Badges</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4 mt-4">
          <div className="px-2 space-y-3">
            {mockInventory.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        <Badge variant={
                          item.rarity === 'Legendary' ? 'default' : 
                          item.rarity === 'Epic' ? 'secondary' : 'outline'
                        } className="text-xs">
                          {item.rarity}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-green-600 font-bold text-sm">∞ Robux</span>
                        <Button size="sm" variant={item.equipped ? "outline" : "default"} className="text-xs">
                          {item.equipped ? "Equipped" : "Equip"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;