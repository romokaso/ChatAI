local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer

local responses = {
    ru = {
        привет = {"Привет! Как дела?", "Здравствуй! Рад тебя видеть.", "Привет-привет! Чем занимаешься?", "Привет! Надеюсь, у тебя отличный день!", "Добрый день! Что нового?"},
        ["как дела"] = {"У меня всё отлично, спасибо!", "Всё хорошо, а у тебя?", "Живу замечательно!", "Спасибо, что спросил! Всё супер!", "Неплохо, а у тебя как?"},
        ["кто ты"] = {"Я — умный чат-бот на Roblox.", "Я — твой дружелюбный помощник здесь.", "Просто бот, который любит общаться!", "Я тут, чтобы поддержать разговор.", "Твой цифровой друг в Roblox!"},
        пока = {"Пока! Хорошего дня!", "До встречи!", "Буду ждать следующего разговора!", "Пока-пока! Возвращайся скорее!", "До скорого! Не скучай!"},
        ["что ты умеешь"] = {"Я могу отвечать на вопросы и поддерживать беседу.", "Я умный бот, который знает много языков!", "Общение — моя специализация.", "Я помогаю весело проводить время в Roblox."},
        ["помоги"] = {"Чем могу помочь?", "Расскажи, что тебе нужно.", "Я слушаю тебя!", "Задавай вопросы, я постараюсь ответить."},
    },
    en = {
        hello = {"Hello! How are you?", "Hi there!", "Greetings!", "Hey! How’s it going?", "Hello! Nice to meet you!"},
        ["how are you"] = {"I'm doing well, thanks!", "All good here.", "Feeling great!", "Thanks for asking!", "I'm fine, how about you?"},
        ["who are you"] = {"I'm a smart Roblox chat-bot.", "Your friendly assistant here.", "Just a bot who loves to chat!", "I'm here to keep you company.", "Your digital friend on Roblox!"},
        bye = {"Bye! Have a great day!", "See you later!", "Looking forward to our next chat!", "Bye-bye! Come back soon!", "See you! Don’t be a stranger!"},
        ["what can you do"] = {"I can answer questions and chat with you.", "I'm a smart bot who knows many languages!", "Chatting is my specialty.", "I help you have fun in Roblox."},
        help = {"How can I help?", "Tell me what you need.", "I'm listening!", "Ask away, I’ll try to answer."},
    }
}

local function getRandomResponse(tbl)
    return tbl[math.random(#tbl)]
end

local function detectLanguage(msg)
    msg = msg:lower()
    for word in pairs(responses.ru) do
        if msg:find(word) then return "ru" end
    end
    for word in pairs(responses.en) do
        if msg:find(word) then return "en" end
    end
    return "en"
end

local function getResponse(msg)
    local lang = detectLanguage(msg)
    local lowerMsg = msg:lower()
    for key, answers in pairs(responses[lang]) do
        if lowerMsg:find(key) then
            return getRandomResponse(answers)
        end
    end
    return "..."
end

local function playWaveAnimation(character)
    if not character then return end
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return end
    local anim = Instance.new("Animation")
    anim.AnimationId = "rbxassetid://507771019"
    local track = humanoid:LoadAnimation(anim)
    track:Play()
    delay(3, function() track:Stop() end)
end

local function moveToPlayer(targetPlayer)
    if not targetPlayer.Character then return end
    local targetHRP = targetPlayer.Character:FindFirstChild("HumanoidRootPart")
    local botHRP = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
    if not targetHRP or not botHRP then return end
    local tween = TweenService:Create(botHRP, TweenInfo.new(2, Enum.EasingStyle.Linear), {CFrame = targetHRP.CFrame * CFrame.new(0,0,3)})
    tween:Play()
    tween.Completed:Wait()
    playWaveAnimation(player.Character)
end

player:Chat("hello all!")

game:GetService("Players").PlayerChatted:Connect(function(plr, msg)
    if plr == player then return end
    local response = getResponse(msg)
    wait(0.5)
    player:Chat(response)
    moveToPlayer(plr)
end)
