const { cmd } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    alias: ["sheikh"],
    desc: "menu the bot",
    react: "📜",
    category: "main"
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        let sections = [
            {
                title: "🌟 SHEIKH BOT MENU CATEGORIES",
                rows: [
                    { title: "📥 Download Menu", rowId: "menu_dl" },
                    { title: "🧠 AI Menu", rowId: "menu_ai" },
                    { title: "🎌 Anime Menu", rowId: "menu_anime" },
                    { title: "🔄 Convert Menu", rowId: "menu_convert" },
                    { title: "🎉 Fun Menu", rowId: "menu_fun" },
                    { title: "📌 Main Menu", rowId: "menu_main" },
                    { title: "👥 Group Menu", rowId: "menu_group" },
                    { title: "👑 Owner Menu", rowId: "menu_owner" },
                    { title: "📦 Other Menu", rowId: "menu_other" },
                    { title: "🎭 Reactions Menu", rowId: "menu_react" },
                    { title: "⚠️ Scammer Info", rowId: "menu_scam" },
                    { title: "🖋 Logo Menu", rowId: "menu_logo" }
                ]
            }
        ];

        let listMessage = {
            text: `*👋 Hello ${pushname}!*

I am *SHEIKH BOT*. Please select a menu category from the list below to view available commands.`,
            footer: "🤖 Powered by Sheikh Ali",
            title: "💠 SHEIKH BOT - MAIN MENU",
            buttonText: "📜 Tap to View Menus",
            sections
        };

        await conn.sendMessage(from, listMessage, { quoted: mek });
        
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred.");
    }
});
