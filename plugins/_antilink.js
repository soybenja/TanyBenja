const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
export async function before(m, {conn, isAdmin, isBotAdmin}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);
  const grupo = `https://chat.whatsapp.com`;
  if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply('*𝙷𝙴𝚈!! 𝙴𝙻 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺 𝙴𝚂𝚃𝙰 𝙰𝙲𝚃𝙸𝚅𝙾, 𝙿𝙴𝚁𝙾 𝙴𝚁𝙴𝚂 𝚄𝙽 𝙰𝙳𝙼𝙸𝙽 😎, 𝚂𝙰𝙻𝚅𝙰𝙳𝙾/𝙰!*');
  if (chat.antiLink && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      if (m.text.includes(linkThisGroup)) return !0;
    }
    await this.sendMessage(m.chat, {text: `*「 𝐀𝐍𝐓𝐈 𝐋𝐈𝐍𝐊𝐒 」*\n*𝙷𝙰𝚂𝚃𝙰 𝙻𝙰 𝚅𝙸𝚂𝚃𝙰 𝙱𝙰𝙱𝚈 👋 ${user} 𝚁𝙾𝙼𝙿𝙸𝚂𝚃𝙴𝚂 𝙻𝙰𝚂 𝚁𝙴𝙶𝙻𝙰𝚂 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾, 𝚂𝙴𝚁𝙰𝚂 𝙴𝚇𝚃𝙴𝚁𝙼𝙸𝙽𝙰𝙳𝙾...!!*`, mentions: [m.sender]}, {quoted: m});
    if (!isBotAdmin) return m.reply('🔮 𝙀𝙡 𝙗𝙤𝙩 𝙣𝙤 𝙚𝙨 𝙖𝙙𝙢𝙞𝙣, 𝙉𝙤 𝙥𝙪𝙚𝙙𝙚 𝙚𝙭𝙥𝙪𝙡𝙨𝙖𝙧 𝙖𝙡𝙖𝙨 𝙥𝙚𝙧𝙨𝙤𝙣𝙖𝙨');
    if (isBotAdmin && bot.restrict) {
      await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    } else if (!bot.restrict) return m.reply('🔮  𝙀𝙡 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤 𝙙𝙚𝙡 𝙗𝙤𝙩 𝙣𝙤 𝙩𝙞𝙚𝙣𝙚 𝙝𝙖𝙗𝙞𝙡𝙞𝙩𝙖𝙙𝙤 𝙡𝙖𝙨 𝙧𝙚𝙨𝙩𝙧𝙞𝙘𝙘𝙞𝙤𝙣𝙚𝙨 (#𝚎𝚗𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝) 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙚 𝙘𝙤𝙣 𝙚𝙡 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙡𝙤 𝙝𝙖𝙗𝙞𝙡𝙞𝙩𝙚');
  }
  return !0;
}
