const { formatString } = require("../utils")
const playerCommand = require("./playerCommand")

module.exports = (player, message) => {
    if (message.startsWith('!')) {
        const [firstWord, ...rest] = message.substring(1).split(' ');
        playerCommand(player, firstWord.toLowerCase(), rest.join(' '));
        return;
    }

    global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.PLAYER_MESSAGE, player.name, message, player.team === 0 ? "⚫" : player.team === 1 ? "🔴" : "🔵"), null, 0x00FF0F)
}