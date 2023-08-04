const { Event } = require('../../structures/index.js');


module.exports = class addSong extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'addSong',
        });
    }

    async run(queue, song) {
        const textChannel = this.client.channels.cache.get(queue.textChannel.id);
        if (!textChannel) return;
        await textChannel.send({
            embeds: [
                {
                    color: this.client.config.color.main,
                    description: `Added • **[${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`,
                },
            ],
        });
    }
}