const { getTime } = global.utils;

module.exports = {
    config: {
        name: "lg",
        author: "Ꮠ ᎯᏞᎠᏋᎡᎥᏣ-シ︎︎",
        countDown: 5,
        role: 2,
        category: "admin",
        shortDescription: {
            en: "Leave multiple groups by providing their IDs.",
        },
    },

    onStart: async function ({ args, api, event }) {
        if (args.length < 1) {
            return api.sendMessage("Please provide at least one group ID to leave.", event.threadID);
        }

        const groupIds = args;

        for (const groupId of groupIds) {
            if (!/^\d+$/.test(groupId)) {
                api.sendMessage(`Invalid group ID: ${groupId}`, event.threadID);
                continue;
            }

            try {
                await api.removeUserFromGroup(api.getCurrentUserID(), groupId);
                api.sendMessage(`Successfully left group with ID: ${groupId}`, event.threadID);
            } catch (error) {
                console.error(`Failed to leave group with ID: ${groupId}. Error:`, error);
                api.sendMessage(`Failed to leave group with ID: ${groupId}. Please try again later.`, event.threadID);
            }
        }
    },
};
