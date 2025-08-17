import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import EnhancedGameCard from './components/EnhancedGameCard';
import PlayerCard from './components/PlayerCard';
import GameRoom from './components/GameRoom';
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
  mockFriends,
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
  Settings,
  TrendingUp,
  Bot,
  Zap,
  Sparkles,
  MessageCircle
} from 'lucide-react';

const HomePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('games');
  const [featuredGames, setFeaturedGames] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [aiPlayersOnline, setAiPlayersOnline] = useState([]);

  useEffect(() => {
    // Simulate featured games (top 4)
    setFeaturedGames(mockGames.slice(0, 4));
    // Simulate recently played games
    setRecentlyPlayed(mockGames.filter(game => game.isPlaying).slice(0, 2));
    
    // Generate AI players online
    const aiPlayers = [];
    for (let i = 0; i < 15; i++) {
      aiPlayers.push(generateAIPlayer());
    }
    setAiPlayersOnline(aiPlayers);
  }, []);

  const handlePlayGame = (game) => {
    toast({
      title: "🎮 Quick Play Started!",
      description: `Starting ${game.title} with AI players... Loading game world!`,
    });
    
    // Simulate game launch
    setTimeout(() => {
      toast({
        title: "✨ Connected to AI Server!",
        description: `${game.title} is running with smart AI players. Have amazing fun!`,
      });
    }, 2000);
  };

  const handleEnterGame = (game) => {
    toast({
      title: "🚀 Entering Game Room...",
      description: `Loading ${game.title} with live AI players and chat!`,
    });
    
    setTimeout(() => {
      setCurrentGame(game);
    }, 1500);
  };

  const handleBackToGames = () => {
    setCurrentGame(null);
    toast({
      title: "👋 Left Game Room",
      description: "You're back to the main lobby. Your progress was saved!",
    });
  };

  const handleMessagePlayer = (player) => {
    toast({
      title: "💬 Message Sent!",
      description: `Sent a message to ${player.username}${player.isAI ? ' (AI Player)' : ''}`,
    });
  };

  const handleAddFriend = (player) => {
    toast({
      title: "🤝 Friend Request Sent!",
      description: `Sent friend request to ${player.username}${player.isAI ? ' (AI Player)' : ''}`,
    });
  };

  // If in game room, show game room component
  if (currentGame) {
    return <GameRoom game={currentGame} onBack={handleBackToGames} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-tight">
              Welcome to <span className="text-yellow-300">ROBLOX</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Play with advanced AI players, enjoy unlimited Robux, and experience the next generation of gaming! 
              Our AI companions make every game more exciting! 🤖✨
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Start Gaming
              </Button>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3">
                <Bot className="mr-2 h-5 w-5" />
                Meet AI Players
              </Button>
            </div>
            
            {/* Stats Bar */}
            <div className="flex justify-center items-center space-x-8 mt-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm text-blue-100">Your Robux</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{aiPlayersOnline.length}+</div>
                <div className="text-sm text-blue-100">AI Players Online</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">AI Gaming</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
            <TabsTrigger value="games" className="flex items-center space-x-2">
              <Gamepad2 className="h-4 w-4" />
              <span>Games</span>
            </TabsTrigger>
            <TabsTrigger value="players" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>AI Players</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Crown className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center space-x-2">
              <Gift className="h-4 w-4" />
              <span>Inventory</span>
            </TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-8">
            {/* AI-Powered Games Notice */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Bot className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">🤖 AI-Powered Gaming Experience</h3>
                    <p className="text-blue-100">
                      All games feature intelligent AI players that adapt to your playstyle. 
                      Never play alone again - AI companions are always ready to join your adventures!
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">∞ Robux</div>
                    <div className="text-sm text-blue-100">Unlimited Fun</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Games Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-900">Featured AI Games</h2>
                <Badge className="bg-blue-500 text-white">
                  <Bot className="h-3 w-3 mr-1" />
                  Smart AI
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredGames.map((game) => (
                  <EnhancedGameCard
                    key={game.id}
                    game={game}
                    onPlay={handlePlayGame}
                    onEnterGame={handleEnterGame}
                  />
                ))}
              </div>
            </div>

            {/* All Games Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <h2 className="text-3xl font-bold text-gray-900">Popular AI-Enhanced Games</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockGames.map((game) => (
                  <EnhancedGameCard
                    key={game.id}
                    game={game}
                    onPlay={handlePlayGame}
                    onEnterGame={handleEnterGame}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* AI Players Tab */}
          <TabsContent value="players" className="space-y-8">
            <div className="flex items-center space-x-2 mb-6">
              <Bot className="h-6 w-6 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">AI Players Online</h2>
              <Badge className="bg-green-500 text-white">
                {aiPlayersOnline.length} Active
              </Badge>
            </div>
            
            {/* AI Players Info */}
            <Card className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">🧠 Meet Our AI Players</h3>
                    <p className="text-cyan-100 mt-2">
                      These AI players have unique personalities, skills, and gaming styles. 
                      They learn and adapt to create the best gaming experience for you!
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{aiPlayersOnline.length}</div>
                    <div className="text-sm text-cyan-100">AI Friends Ready</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...mockPlayers, ...aiPlayersOnline.slice(0, 9)].map((player) => (
                <Card key={player.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20 border-4 border-gray-200">
                          <AvatarImage src={player.profileImage} alt={player.username} />
                          <AvatarFallback className="bg-blue-500 text-white text-xl">
                            {player.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white ${
                          player.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        
                        {player.isAI && (
                          <div className="absolute -top-2 -left-2 bg-blue-500 rounded-full p-1">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        
                        {player.premium && (
                          <div className="absolute -top-2 -right-2">
                            <Crown className="h-6 w-6 text-yellow-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center space-y-2">
                        <h3 className="font-bold text-lg text-gray-900">{player.displayName}</h3>
                        <p className="text-sm text-gray-600">@{player.username}</p>
                        
                        <div className="flex flex-col items-center space-y-1">
                          {player.isOnline ? (
                            <Badge className="bg-green-500 text-white">
                              <div className="flex items-center">
                                <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
                                {player.isAI ? 'AI Online' : 'Online'}
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

                          {player.isAI && player.currentBehavior && (
                            <Badge variant="outline" className="text-xs">
                              {player.currentBehavior}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-gray-900">Level</div>
                          <div className="text-gray-600">{player.level}</div>
                        </div>
                        {player.robux && (
                          <div className="text-center">
                            <div className="font-bold text-gray-900">Robux</div>
                            <div className="text-green-600 font-semibold">
                              {typeof player.robux === 'number' ? player.robux.toLocaleString() : player.robux}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 w-full">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleMessagePlayer(player)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {player.isAI ? 'Chat with AI' : 'Message'}
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-500 hover:bg-blue-600"
                          onClick={() => handleAddFriend(player)}
                        >
                          <Users className="h-4 w-4 mr-1" />
                          {player.isAI ? 'Add AI Friend' : 'Add Friend'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab - Same as before but with AI stats */}
          <TabsContent value="profile" className="space-y-8">
            <div className="flex items-center space-x-2 mb-6">
              <Crown className="h-6 w-6 text-purple-500" />
              <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
              <Badge className="bg-green-500 text-white">∞ Robux</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <img 
                          src={mockUser.profileImage} 
                          alt={mockUser.username}
                          className="w-32 h-32 rounded-full mx-auto border-4 border-purple-200"
                        />
                        <Crown className="absolute top-0 right-1/4 h-8 w-8 text-yellow-500" />
                        <div className="absolute bottom-0 left-1/4 bg-blue-500 rounded-full p-2">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{mockUser.displayName}</h3>
                        <p className="text-gray-600">@{mockUser.username}</p>
                        <p className="text-sm text-gray-500 mt-2">{mockUser.description}</p>
                        <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          AI Gaming Master
                        </Badge>
                      </div>
                      
                      <div className="flex justify-center items-center space-x-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">∞</div>
                          <div className="text-sm text-gray-600">Robux</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{mockUser.level}</div>
                          <div className="text-sm text-gray-600">Level</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold">{mockUser.followers.toLocaleString()}</div>
                          <div className="text-gray-600">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{mockUser.following}</div>
                          <div className="text-gray-600">Following</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Enhanced Stats with AI */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5" />
                      <span>Your AI Gaming Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.totalPlayTime}</div>
                        <div className="text-sm text-gray-600">Total Play Time</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Bot className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{aiPlayersOnline.length + 47}</div>
                        <div className="text-sm text-gray-600">AI Friends</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Gamepad2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.gamesCreated}</div>
                        <div className="text-sm text-gray-600">Games Created</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">∞</div>
                        <div className="text-sm text-gray-600">Robux Available</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <Trophy className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.badgesEarned}</div>
                        <div className="text-sm text-gray-600">Badges Earned</div>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 rounded-lg">
                        <Sparkles className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">156</div>
                        <div className="text-sm text-gray-600">AI Victories</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Inventory Tab - Same as before */}
          <TabsContent value="inventory" className="space-y-8">
            <div className="flex items-center space-x-2 mb-6">
              <Gift className="h-6 w-6 text-green-500" />
              <h2 className="text-3xl font-bold text-gray-900">Your Inventory</h2>
              <Badge className="bg-purple-500 text-white">Premium Items</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockInventory.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    {item.equipped && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        Equipped
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{item.type}</Badge>
                        <Badge variant={
                          item.rarity === 'Legendary' ? 'default' : 
                          item.rarity === 'Epic' ? 'secondary' : 'outline'
                        }>
                          {item.rarity}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-bold">∞ Robux</span>
                        <Button size="sm" variant={item.equipped ? "outline" : "default"}>
                          {item.equipped ? "Unequip" : "Equip"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;