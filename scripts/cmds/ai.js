const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAIResponse(input, userId, messageID) {
  const services = [
    { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
    { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
    { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
  ];

  let response = "𝓗𝓮𝓵𝓵𝓸, 𝓶𝔂 𝓷𝓪𝓶𝓮 𝓲𝓼 𝓜𝓲𝓴𝓶𝓸𝓷 𝓪𝓷𝓭 𝓘 𝓪𝓶 𝓱𝓮𝓻𝓮 𝓽𝓸 𝓪𝓼𝓼𝓲𝓼𝓽 𝔂𝓸𝓾 𝔀𝓲𝓽𝓱 𝓪𝓷𝔂 𝓺𝓾𝓮𝓼𝓽𝓲𝓸𝓷𝓼 𝓸𝓻 𝓽𝓪𝓼𝓴𝓼 𝔂𝓸𝓾 𝓶𝓪𝔂 𝓱𝓪𝓿𝓮. 𝓗𝓸𝔀 𝓬𝓪𝓷 𝓘 𝓱𝓮𝓵𝓹 𝔂𝓸𝓾 𝓽𝓸𝓭𝓪𝔂?";
  let currentIndex = 0;

  for (let i = 0; i < services.length; i++) {
    const service = services[currentIndex];
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break;
    }
    currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
  }

  return { response, messageID };
}

module.exports = {
  config: {
    name: 'ai',
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage(`♕🐳  𝕞𝔦𝕂๓๏𝐍  😝🐉\n▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️\nPlease provide a question or statement.\n▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️`, event.threadID, event.messageID);
      return;
    }

    const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
    api.sendMessage(`♕🐳  𝕞𝔦𝕂๓๏𝐍  😝🐉\n▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️\n${response}\n▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️`, event.threadID, messageID);
  },
  onChat: async function ({ event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
      message.reply(`♕🐳  𝕞𝔦𝕂๓๏𝐍  😝🐉\n▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️\n${response}\n▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️`, messageID);
    }
  }
};
