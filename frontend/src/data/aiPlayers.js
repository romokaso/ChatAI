// AI Players data for games
export const aiPlayerNames = [
  "RoboBuilder3000", "AIGamer_Pro", "CyberCraft_99", "SmartBot_Alpha", "MegaMind_Player",
  "TechWizard_AI", "QuantumGamer", "NeuralNet_Master", "BotCommander", "DigiPlayer_X",
  "AutoPlay_King", "AIStrategist", "RoboNinja_007", "CyberElite_Bot", "SmartPlay_AI",
  "CodeWarrior_Bot", "PixelMaster_AI", "GameBot_Supreme", "AI_Champion", "RoboLegend"
];

export const aiPlayerAvatars = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=400&h=400&fit=crop&crop=face", 
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1577702124767-2dd8c4e2a5ab?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=face"
];

export const aiChatMessages = [
  "Hey everyone! Ready to play?",
  "This game is so much fun! 🎮",
  "Anyone want to team up?",
  "I just got a new high score!",
  "Let's build something awesome together!",
  "Who wants to race?",
  "Great game everyone!",
  "I love this server!",
  "Anyone found the secret area yet?",
  "This is my favorite game on Roblox!",
  "Let's complete this challenge together!",
  "Wow, that was an amazing move!",
  "I'm having so much fun here!",
  "Anyone want to explore the map?",
  "Let's see who can jump the highest!",
  "This game has the best graphics!",
  "I just unlocked a new item!",
  "Anyone up for a challenge?",
  "Let's work as a team!",
  "This is the best server ever!"
];

export const aiPlayerBehaviors = [
  "building", "racing", "exploring", "chatting", "competing", 
  "helping", "dancing", "jumping", "collecting", "fighting"
];

export const generateAIPlayer = () => {
  const randomName = aiPlayerNames[Math.floor(Math.random() * aiPlayerNames.length)];
  const randomAvatar = aiPlayerAvatars[Math.floor(Math.random() * aiPlayerAvatars.length)];
  const randomBehavior = aiPlayerBehaviors[Math.floor(Math.random() * aiPlayerBehaviors.length)];
  
  return {
    id: `ai_${Date.now()}_${Math.random()}`,
    username: randomName,
    displayName: randomName,
    profileImage: randomAvatar,
    isOnline: true,
    isAI: true,
    level: Math.floor(Math.random() * 100) + 1,
    currentBehavior: randomBehavior,
    score: Math.floor(Math.random() * 10000),
    joinedAgo: Math.floor(Math.random() * 30) + 1, // minutes ago
    premium: Math.random() > 0.7 // 30% chance of being premium
  };
};

export const generateAIChatMessage = () => {
  const message = aiChatMessages[Math.floor(Math.random() * aiChatMessages.length)];
  const player = generateAIPlayer();
  
  return {
    id: `msg_${Date.now()}_${Math.random()}`,
    player: player,
    message: message,
    timestamp: new Date(),
    type: Math.random() > 0.8 ? 'system' : 'chat' // 20% chance of system message
  };
};