const { Command, Context, Lavamusic } = require('../../structures/index.js');

module.exports = class Play extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      description: {
        content: 'Plays a song from YouTube or Spotify',
        examples: [
          'play https://www.youtube.com/watch?v=QH2-TGUlwu4',
          'play https://open.spotify.com/track/6WrI0LAC5M1Rw2MnX2ZvEg',
        ],
        usage: 'play <song>',
      },
      category: 'music',
      aliases: ['p'],
      cooldown: 3,
      args: true,
      player: {
        voice: true,
        dj: false,
        active: false,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ['SendMessages', 'ViewChannel', 'EmbedLinks', 'Connect', 'Speak'],
        user: [],
      },
      slashCommand: true,
      options: [
        {
          name: 'song',
          description: 'The song you want to play',
          type: 3,
          required: true,
          autocomplete: true,
        },
      ],
    });
  }
  /**
   * 
   * @param {Lavamusic} client 
   * @param {Context} ctx 
   * @param {*} args 
   * @returns 
   */
  async run(client, ctx, args) {
    const query = args.join(' ');

    const vc = ctx.member;

    if (!vc.voice.channel) {
      return ctx.sendMessage('You must be in a voice channel');
    }

    await client.distube.play(vc.voice.channel, query, {
      member: ctx.author,
      textChannel: ctx.channel,
    });
  }
}



/**
 * Project: lavamusic
 * Author: Blacky
 * Company: Coders
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */
