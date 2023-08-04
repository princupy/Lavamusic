const { Event } = require('../../structures/index.js');

module.exports = class addList extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'addList',
        });
    }

    async run(queue, playlist) {
        const textChannel = this.client.channels.cache.get(queue.textChannel.id);
        if (!textChannel) return;
        await textChannel.send({
            embeds: [
                {
                    color: this.client.config.color.main,
                    description: `Added • **[${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`,
                },
            ],
        });
    }
};
