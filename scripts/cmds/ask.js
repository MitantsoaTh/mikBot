const axios = require('axios');

const Prefixes = [
    'line',
    'hunter',
    'ae'
];

module.exports = {
    config: {
        name: "ask",
        version: 1.0,
        author: "Aesther",
        longDescription: "AI",
        category: "ai",
        guide: {
            en: "{p} questions",
        },
    },
    onStart: async function () {},
    onChat: async function ({ api, event, args, message }) {
        try {
            const prefix = Prefixes.find(p => event.body && event.body.toLowerCase().startsWith(p));
            if (!prefix) {
                return; // Invalid prefix, ignore the command
            }

            const prompt = event.body.substring(prefix.length).trim();
            if (!prompt) {
                await message.reply("𝕯𝖆𝖗𝖐𝖂𝖊𝖇 vous écoute\n\n ");
                api.setMessageReaction('👻', event.messageID);
                return;
            }

            const response = await axios.get(`https://hiroshi-rest-api.replit.app/ai/jailbreak?ask=${encodeURIComponent(prompt)}`);
            const answer = ` ☠️𝕯𝖆𝖗𝖐𝖂𝖊𝖇☠️   :\n──────────── \n${response.data.answer} 👻`;
            api.setMessageReaction('👻', event.messageID);

            await message.reply(answer);

        } catch (error) {
            console.error("Error:", error.message);
        }
    }
};
