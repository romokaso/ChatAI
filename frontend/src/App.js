import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import PlayerCard from './components/PlayerCard';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
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
  TrendingUp
} from 'lucide-react';

const HomePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('games');
  const [featuredGames, setFeaturedGames] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    // Simulate featured games (top 4)
    setFeaturedGames(mockGames.slice(0, 4));
    // Simulate recently played games
    setRecentlyPlayed(mockGames.filter(game => game.isPlaying).slice(0, 2));
  }, []);

  const handlePlayGame = (game) => {
    toast({
      title: "Launching Game!",
      description: `Starting ${game.title}... Get ready to play!`,
    });
    
    // Simulate game launch
    setTimeout(() => {
      toast({
        title: "Game Launched!",
        description: `${game.title} is now running. Have fun!`,
      });
    }, 2000);
  };

  const handleMessagePlayer = (player) => {
    toast({
      title: "Message Sent!",
      description: `Sent a message to ${player.username}`,
    });
  };

  const handleAddFriend = (player) => {
    toast({
      title: "Friend Request Sent!",
      description: `Sent friend request to ${player.username}`,
    });
  };

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
              Unleash your creativity, play amazing games, and connect with millions of players worldwide. 
              Your adventure starts here!
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Start Playing
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 font-bold px-8 py-3">
                <Users className="mr-2 h-5 w-5" />
                Find Friends
              </Button>
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
              <Users className="h-4 w-4" />
              <span>Players</span>
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
            {/* Featured Games Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Star className="h-6 w-6 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-900">Featured Games</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onPlay={handlePlayGame}
                  />
                ))}
              </div>
            </div>

            {/* All Games Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <h2 className="text-3xl font-bold text-gray-900">Popular Games</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onPlay={handlePlayGame}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players" className="space-y-8">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="h-6 w-6 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">Players Online</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onMessage={handleMessagePlayer}
                  onAddFriend={handleAddFriend}
                />
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="flex items-center space-x-2 mb-6">
              <Crown className="h-6 w-6 text-purple-500" />
              <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
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
                        {mockUser.premium && (
                          <Crown className="absolute top-0 right-1/4 h-8 w-8 text-yellow-500" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{mockUser.displayName}</h3>
                        <p className="text-gray-600">@{mockUser.username}</p>
                        <p className="text-sm text-gray-500 mt-2">{mockUser.description}</p>
                      </div>
                      
                      <div className="flex justify-center items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{mockUser.robux}</div>
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
              
              {/* Stats */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5" />
                      <span>Your Stats</span>
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
                        <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.favoritesCreated}</div>
                        <div className="text-sm text-gray-600">Favorites</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Gamepad2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.gamesCreated}</div>
                        <div className="text-sm text-gray-600">Games Created</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Users className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.totalVisits.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Profile Visits</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <Trophy className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.badgesEarned}</div>
                        <div className="text-sm text-gray-600">Badges Earned</div>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 rounded-lg">
                        <Gift className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                        <div className="text-xl font-bold text-gray-900">{mockStats.placesBuilt}</div>
                        <div className="text-sm text-gray-600">Places Built</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-8">
            <div className="flex items-center space-x-2 mb-6">
              <Gift className="h-6 w-6 text-green-500" />
              <h2 className="text-3xl font-bold text-gray-900">Your Inventory</h2>
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
                        <span className="text-green-600 font-bold">{item.price.toLocaleString()} R$</span>
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