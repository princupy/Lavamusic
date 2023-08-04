const {
  Collection,
  ClientOptions,
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  PermissionsBitField,
  ApplicationCommandType,
  Client,
  EmbedBuilder,
} = require('discord.js');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const Logger = require('./Logger.js');
const config = require('../config.js');
const DisTube = require('distube').default;
const { DeezerPlugin } = require('@distube/deezer');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');


module.exports = class Lavamusic extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldown = new Collection();
    this.config = config;
    this.logger = new Logger();
    this.color = config.color;
    this.body = [];
    this.distube = new DisTube(this, {
      leaveOnEmpty: this.config.voiceConfig.leaveOnEmpty,
      leaveOnFinish: this.config.voiceConfig.leaveOnFinish,
      leaveOnStop: this.config.voiceConfig.leaveOnStop,
      emitNewSongOnly: true,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new SpotifyPlugin({
          emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
        new DeezerPlugin(),
      ],
    });
  }

  embed() {
    return new EmbedBuilder();
  }

  async start(token) {
    this.loadCommands();
    this.logger.info(`Successfully loaded commands!`);
    this.loadEvents();
    this.logger.info(`Successfully loaded events!`);
    return await this.login(token);
  }

  loadCommands() {
    const commandsPath = fs.readdirSync(path.join(__dirname, '../commands'));
    commandsPath.forEach((dir) => {
      const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${dir}`)).filter((file) => file.endsWith('.js'));
      commandFiles.forEach(async (file) => {
        const cmd = require(`../commands/${dir}/${file}`);
        const command = new cmd(this, file);
        command.category = dir;
        command.file = file;
        this.commands.set(command.name, command);
        if (command.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            this.aliases.set(alias, command.name);
          });
        }
        if (command.slashCommand) {
          const data = {
            name: command.name,
            description: command.description.content,
            type: ApplicationCommandType.ChatInput,
            options: command.options ? command.options : null,
            name_localizations: command.nameLocalizations ? command.nameLocalizations : null,
            description_localizations: command.descriptionLocalizations ? cmd.descriptionLocalizations : null,
            default_member_permissions: command.permissions.user.length > 0 ? command.permissions.user : null,
          };
          if (command.permissions.user.length > 0) {
            const permissionValue = PermissionsBitField.resolve(command.permissions.user);
            if (typeof permissionValue === 'bigint') {
              data.default_member_permissions = permissionValue.toString();
            } else {
              data.default_member_permissions = permissionValue;
            }
          }
          const json = JSON.stringify(data);
          this.body.push(JSON.parse(json));
        }
      });
    });
    this.once('ready', async () => {
      const applicationCommands = this.config.production === true
        ? Routes.applicationCommands(this.config.clientId ?? '')
        : Routes.applicationGuildCommands(this.config.clientId ?? '', this.config.guildId ?? '');
      try {
        const rest = new REST({ version: '9' }).setToken(this.config.token ?? '');
        await rest.put(applicationCommands, { body: this.body });
        this.logger.info(`Successfully loaded slash commands!`);
      } catch (error) {
        this.logger.error(error);
      }
    });
  }

  loadEvents() {
    const eventsPath = fs.readdirSync(path.join(__dirname, '../events'));
    eventsPath.forEach((dir) => {
      const events = fs.readdirSync(path.join(__dirname, `../events/${dir}`)).filter((file) => file.endsWith('.js'));
      events.forEach(async (file) => {
        const event = require(`../events/${dir}/${file}`);
        const evt = new event(this, file);
        switch (dir) {
          case 'player':
            this.distube.on(evt.name, (...args) => evt.run(...args));
            break;
          default:
            this.on(evt.name, (...args) => evt.run(...args));
            break;
        }
      });
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
