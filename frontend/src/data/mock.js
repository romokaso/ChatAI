// Mock data for Roblox clone
export const mockUser = {
  id: "123456789",
  username: "SuperGamer2025",
  displayName: "SuperGamer2025",
  robux: "∞",
  profileImage: "https://images.unsplash.com/photo-1494790108755-2616c5da2fb2?w=400&h=400&fit=crop&crop=face",
  premium: true,
  level: 99,
  joinDate: "2020-01-15",
  description: "Pro gamer with infinite Robux! 🎮",
  followers: 1234567,
  following: 999
};

export const mockPlayers = [
  {
    id: "player1",
    username: "EpicBuilder99",
    displayName: "EpicBuilder99",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    isOnline: true,
    game: "Build a Boat for Treasure",
    robux: 50000,
    level: 45,
    premium: true
  },
  {
    id: "player2",
    username: "SpeedRunner42",
    displayName: "SpeedRunner42", 
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    isOnline: true,
    game: "Natural Disaster Survival",
    robux: 25000,
    level: 67,
    premium: false
  },
  {
    id: "player3",
    username: "MasterCraft",
    displayName: "MasterCraft",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    isOnline: false,
    game: null,
    robux: 75000,
    level: 89,
    premium: true
  }
];

export const mockGames = [
  {
    id: "game1",
    title: "Adopt Me!",
    description: "Raise and dress up cute pets, decorate your house, and play with friends!",
    thumbnail: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=300&fit=crop",
    creator: "DreamCraft",
    players: 125000,
    likes: 890000,
    isPlaying: false,
    category: "Social",
    maxPlayers: 48,
    genre: "Pet Simulation"
  },
  {
    id: "game2", 
    title: "Brookhaven RP",
    description: "Welcome to Brookhaven, where you can be whoever you want to be!",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
    creator: "Wolfpaq",
    players: 89000,
    likes: 750000,
    isPlaying: true,
    category: "Roleplay",
    maxPlayers: 12,
    genre: "Life Simulation"
  },
  {
    id: "game3",
    title: "Tower of Hell",
    description: "Climb the tower of hell and reach the top! Don't fall!",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    creator: "YXCeptional",
    players: 45000,
    likes: 650000,
    isPlaying: false,
    category: "Obby",
    maxPlayers: 20,
    genre: "Platformer"
  },
  {
    id: "game4",
    title: "Murder Mystery 2",
    description: "Use your detective skills to expose the murderer!",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    creator: "Nikilis",
    players: 62000,
    likes: 580000,
    isPlaying: false,
    category: "Mystery",
    maxPlayers: 12,
    genre: "Mystery"
  },
  {
    id: "game5",
    title: "Jailbreak",
    description: "Team up with friends to escape prison or stop prisoners as police!",
    thumbnail: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=300&fit=crop",
    creator: "Badimo",
    players: 38000,
    likes: 920000,
    isPlaying: false,
    category: "Action",
    maxPlayers: 30,
    genre: "Action Adventure"
  },
  {
    id: "game6",
    title: "Build a Boat for Treasure",
    description: "Build your boat and sail to find the legendary treasure!",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    creator: "Chillz Studios",
    players: 28000,
    likes: 480000,
    isPlaying: false,
    category: "Building",
    maxPlayers: 8,
    genre: "Adventure"
  }
];

export const mockInventory = [
  {
    id: "item1",
    name: "Golden Crown",
    type: "Hat",
    rarity: "Legendary",
    price: 10000,
    owned: true,
    equipped: true,
    image: "https://images.unsplash.com/photo-1594736797933-d0301ba2fe65?w=200&h=200&fit=crop"
  },
  {
    id: "item2", 
    name: "Dragon Wings",
    type: "Back Accessory",
    rarity: "Epic",
    price: 5000,
    owned: true,
    equipped: false,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop"
  },
  {
    id: "item3",
    name: "Super Speed Coil",
    type: "Gear",
    rarity: "Rare",
    price: 2500,
    owned: true,
    equipped: true,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop"
  }
];

export const mockFriends = [
  {
    id: "friend1",
    username: "BestFriendEver",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616c5da2fb2?w=100&h=100&fit=crop&crop=face",
    isOnline: true,
    game: "Adopt Me!",
    lastSeen: new Date()
  },
  {
    id: "friend2",
    username: "CoolGameBuddy",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    isOnline: false,
    game: null,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
];

export const mockNotifications = [
  {
    id: "notif1",
    type: "friend_request",
    message: "EpicBuilder99 sent you a friend request",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false
  },
  {
    id: "notif2",
    type: "robux_earned",
    message: "You earned 1000 Robux from your game!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false
  },
  {
    id: "notif3",
    type: "game_update",
    message: "Brookhaven RP has a new update!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
];

export const mockStats = {
  totalPlayTime: "2,847 hours",
  favoritesCreated: 156,
  gamesCreated: 12,
  totalVisits: 450000,
  placesBuilt: 89,
  badgesEarned: 234
};