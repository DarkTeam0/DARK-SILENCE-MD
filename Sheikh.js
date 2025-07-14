const config = require('../config');
const { cmd } = require('../command');
const os = require('os');
const { runtime } = require('../lib/functions');

const pages = [
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
  ],
];

let userPages = {}; // userId => current page

function buildPage(page, pushname) {
  const buttons = pages[page].map(b => ({
    buttonId: b.id,
    buttonText: { displayText: b.displayText },
    type: 1,
  }));

  if (page > 0)
    buttons.push({
      buttonId: 'prev_page',
      buttonText: { displayText: '⬅️ Previous' },
      type: 1,
    });

  if (page < pages.length - 1)
    buttons.push({
      buttonId: 'next_page',
      buttonText: { displayText: '➡️ Next' },
      type: 1,
    });

  return {
    image: { url: 'https://i.imghippo.com/files/YZK6549KW.jpg' },
    caption: `*Hello ${pushname}!*\n\n*꧁ྀི SHEIKH ALI MD ྀི꧂*\n*Runtime:* ${runtime(process.uptime())}\n*RAM Use:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB\n\n*Choose an option below:*`,
    footer: '© Powered by ❥ Sheikh Ali 🔥',
    buttons,
    headerType: 4,
  };
}

// 🔰 Main menu command
cmd(
  {
    pattern: 'menu',
    alias: ['sheikh'],
    desc: 'Show paginated menu',
    category: 'main',
    react: '📜',
  },
  async (conn, mek, m, { from, reply, pushname }) => {
    userPages[from] = 0;
    await conn.sendMessage(from, buildPage(0, pushname), { quoted: mek });
  }
);

// 🔘 Button response handler
cmd(
  {
    pattern: /.*/,
    fromMe: false,
    dontAddCommandList: true,
  },
  async (conn, mek, m, { from, reply, pushname }) => {
    const msg = mek.message;
    if (!msg.buttonsResponseMessage) return;

    const btnId = msg.buttonsResponseMessage.selectedButtonId;
    const page = userPages[from] || 0;

    switch (btnId) {
      case 'next_page':
        userPages[from] = Math.min(page + 1, pages.length - 1);
        return await conn.sendMessage(from, buildPage(userPages[from], pushname), { quoted: mek });

      case 'prev_page':
        userPages[from] = Math.max(page - 1, 0);
        return await conn.sendMessage(from, buildPage(userPages[from], pushname), { quoted: mek });

      case 'menu_dl':
        return reply('📥 *Download Menu*\n• facebook\n• mediafire\n• twitter\n• insta\n• tiktok\n...');
      case 'menu_ai':
        return reply('🤖 *AI Menu*\n• gpt\n• meta\n• copilot\n...');
      case 'menu_anime':
        return reply('🎌 *Anime Menu*\n• waifu\n• neko\n...');
      case 'menu_convert':
        return reply('🔄 *Convert Menu*\n• sticker\n• tts\n...');
      case 'menu_fun':
        return reply('🎉 *Fun Menu*\n• joke\n• hack\n...');
      case 'menu_main':
        return reply('🏠 *Main Menu*\n• ping\n• uptime\n...');
      case 'menu_group':
        return reply('👥 *Group Menu*\n• add\n• kick\n...');
      case 'menu_owner':
        return reply('👑 *Owner Menu*\n• block\n• restart\n...');
      case 'menu_other':
        return reply('📦 *Other Menu*\n• define\n• fact\n...');
      case 'menu_reaction':
        return reply('😊 *Reactions Menu*\n• hug @tag\n• smile @tag\n...');
      case 'menu_scammer':
        return reply('⚠️ *Scammer Info*\n• https://api.whatsapp.com/send?phone=923181093514...');
      case 'menu_logo':
        return reply('🖼️ *Logo Menu*\n• neonlight\n• galaxy\n...');
    }
  }
);
