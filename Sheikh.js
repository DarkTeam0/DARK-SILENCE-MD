const config = require('../config')
const { cmd, commands } = require('../command')
const os = require("os")
const { runtime } = require('../lib/functions')

let currentPage = {};
let mekMap = {};
let pages = [
  [
    { id: 'menu_dl', displayText: '📥 Download Menu' },
    { id: 'menu_ai', displayText: '🤖 AI Menu' },
    { id: 'menu_anime', displayText: '🎌 Anime Menu' },
  ],
  [
    { id: 'menu_convert', displayText: '🔄 Convert Menu' },
    { id: 'menu_fun', displayText: '🎉 Fun Menu' },
    { id: 'menu_main', displayText: '🏠 Main Menu' },
  ],
  [
    { id: 'menu_group', displayText: '👥 Group Menu' },
    { id: 'menu_owner', displayText: '👑 Owner Menu' },
    { id: 'menu_other', displayText: '📦 Other Menu' },
  ],
  [
    { id: 'menu_reaction', displayText: '😊 Reactions Menu' },
    { id: 'menu_scammer', displayText: '⚠️ Scammer Info' },
    { id: 'menu_logo', displayText: '🖼️ Logo Menu' },
  ]
];

const buildButtonMessage = (page, from) => {
  const buttons = pages[page].map(b => ({ buttonId: b.id, buttonText: { displayText: b.displayText }, type: 1 }));
  if (page > 0) {
    buttons.push({ buttonId: 'prev_page', buttonText: { displayText: '⬅️ Previous' }, type: 1 });
  }
  if (page < pages.length - 1) {
    buttons.push({ buttonId: 'next_page', buttonText: { displayText: '➡️ Next' }, type: 1 });
  }
  return {
    image: { url: "https://i.ibb.co/YdSKMhv/6767.jpg" },
    caption: `*Hello!* *Runtime:* ${runtime(process.uptime())} *RAM Use:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB *Choose an option below:*`,
    footer: '𒁂𓄂❥.𝑺𝑯𝑬𝑰𝑲𝑯 𝑨𝑳𝑰 🔥༽༼࿐ ♡••²⁴⁰²',
    buttons,
    headerType: 4
  };
};

conn.ev.on('messages.upsert', async ({ messages }) => {
  try {
    const msg = messages[0];
    if (!msg.message || !msg.message.buttonsResponseMessage) return;
    const btnId = msg.message.buttonsResponseMessage.selectedButtonId;
    const from = msg.key.remoteJid;

    if (currentPage[from] === undefined) return;

    switch (btnId) {
      case 'next_page':
        currentPage[from]++;
        await conn.sendMessage(from, buildButtonMessage(currentPage[from], from), { quoted: mekMap[from] });
        break;
      case 'prev_page':
        currentPage[from]--;
        await conn.sendMessage(from, buildButtonMessage(currentPage[from], from), { quoted: mekMap[from] });
        break;
      case 'menu_dl':
        await conn.sendMessage(from, { text: '📥 *Download Menu*\n• facebook\n• insta\n• twitter\n...' }, { quoted: mekMap[from] });
        break;
      case 'menu_ai':
        await conn.sendMessage(from, { text: '🤖 *AI Menu*\n• gpt\n• meta\n• luma\n...' }, { quoted: mekMap[from] });
        break;
      case 'menu_anime':
        await conn.sendMessage(from, { text: '🎌 *Anime Menu*\n• waifu\n• neko\n• anime1\n...' }, { quoted: mekMap[from] });
        break;
      case 'menu_convert':
        await conn.sendMessage(from, { text: '🔄 *Convert Menu*\n• sticker\n• emojimix\n• take\n...' }, { quoted: mekMap[from] });
        break;
      case 'menu_fun':
        await conn.sendMessage(from, { text: '🎉 *Fun Menu*\n• joke\n• rate\n• insult\n...' }, { quoted: mekMap[from] });
        break;
      case 'menu_main':
  await conn.sendMessage(from, { text: '🏠 *Main Menu*\n• ping\n• alive\n• speed\n...' }, { quoted: mekMap[from] });
  break;
case 'menu_group':
  await conn.sendMessage(from, { text: '👥 *Group Menu*\n• kick\n• add\n• promote\n...' }, { quoted: mekMap[from] });
  break;
case 'menu_owner':
  await conn.sendMessage(from, { text: '👑 *Owner Menu*\n• block\n• restart\n• setpp\n...' }, { quoted: mekMap[from] });
  break;
case 'menu_other':
  await conn.sendMessage(from, { text: '📦 *Other Menu*\n• date\n• count\n• flip\n...' }, { quoted: mekMap[from] });
  break;
case 'menu_reaction':
  await conn.sendMessage(from, { text: '😊 *Reactions Menu*\n• hug\n• kiss\n• slap\n...' }, { quoted: mekMap[from] });
  break;
case 'menu_scammer':
  await conn.sendMessage(from, { text: '⚠️ *Scammer Info*\n• report scammer numbers\n...' }, { quoted: mekMap[from] });
  break;
case 'menu_logo':
  await conn.sendMessage(from, { text: '🖼️ *Logo Menu*\n• neonlight\n• galaxy\n• paint\n...' }, { quoted: mekMap[from] });
  break;
    }
  } catch (error) {
    console.error(error);
  }
});

cmd({
  pattern: "menu",
  alias: ["sheikh"],
  desc: "menu the bot",
  react: "📜",
  category: "main"
}, async (conn, mek, m, { from, reply, pushname }) => {
  try {
    currentPage[from] = 0;
    mekMap[from] = mek;
    const sentMsg = await conn.sendMessage(from, buildButtonMessage(currentPage[from], from), { quoted: mek });
  } catch (error) {
    console.error(error);
  }
});
