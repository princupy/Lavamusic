const dotenv = require('dotenv');
dotenv.config();

function parseBoolean(value) {
  if (typeof value === 'string') {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case 'true':
      return true;
    default:
      return false;
  }
}

module.exports = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  color: {
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    yellow: 0xffff00,
    main: 0x2f3136,
  },
  botStatus: process.env.BOT_STATUS || 'online', // online, idle, dnd, invisible
  botActivity: process.env.BOT_ACTIVITY || 'Lavamusic', // set the bot activity
  owners: process.env.OWNERS?.split(','),
  database: process.env.DATABASE_URL,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  logChannelId: process.env.LOG_CHANNEL_ID || "",
  links: {
    img: process.env.IMG_LINK || 'https://i.imgur.com/ud3EWNh.jpg'
  },
  icons: {
    youtube: 'https://media.discordapp.net/attachments/963097935820750878/1054328059639111700/3670147.png',
    spotify: 'https://media.discordapp.net/attachments/963097935820750878/1054333449252655104/spotify.png',
    soundcloud: 'https://media.discordapp.net/attachments/963097935820750878/1054333449638526986/145809.png',
    applemusic: 'https://media.discordapp.net/attachments/963097935820750878/1054333450368340018/apple-music-icon.png',
    deezer: 'https://media.discordapp.net/attachments/963097935820750878/1054333450024394802/5968803.png'
  },
  production: parseBoolean(process.env.PRODUCTION) || true,
  voiceConfig: {
    leaveOnStop: parseBoolean(process.env.LEAVE_ON_STOP) || true,
    leaveOnFinish: parseBoolean(process.env.LEAVE_ON_FINISH) || true,
    leaveOnEmpty: parseBoolean(process.env.LEAVE_ON_EMPTY) || true,
  }
};

/**
 * Project: lavamusic
 * Author: Blacky
 * Company: Coders
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */
