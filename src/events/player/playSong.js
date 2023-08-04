const { Event } = require('../../structures/index.js');


module.exports = class playSong extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'playSong',
        });
    }

    async run(queue, song) {
        const textChannel = this.client.channels.cache.get(queue.textChannel.id);
        if (!textChannel) return;
        await textChannel.send({
            embeds: [
                {
                    color: this.client.config.color.main,
                    title: 'Now Playing',
                    description: `**[${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`,
                    thumbnail: {
                        url: song.thumbnail,
                    }
                },
            ],
        });
    }
}