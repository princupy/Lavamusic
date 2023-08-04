const config = require('../../config.js');
const { Event, Lavamusic } = require('../../structures/index.js');
const { ActivityType } = require('discord.js');

module.exports = class Ready extends Event {
  constructor(client, file) {
    super(client, file, {
      name: 'ready',
    });
  }

  async run() {
    this.client.logger.success(`${this.client.user?.tag} is ready!`);

    this.client.user?.setPresence({
      activities: [
        {
          name: config.botActivity,
          type: ActivityType.Listening,
        },
      ],
      status: config.botStatus,
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