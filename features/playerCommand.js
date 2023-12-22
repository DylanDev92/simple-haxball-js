const { formatString } = require("../utils")
const { testAdminPassword } = require("./checkPlayerAdmin")
const { togglePower, getPlayerStatsByName } = require("./playerStats")

module.exports = (player, command, argument) => {
    // This command is for leaving the room
    if (["bb", "bye", "chau", "adios", "leave", "exit", "salir"].includes(command)) {
        global.room.kickPlayer(player.id, formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.PLAYER_LEAVE, player.name), false)
    }
    // This command is for activating or deactivating the powershot
    else if (["power", "powershot", "pw", "force", "shot", "togglepower", "tp"].includes(command)) {
        let toggle = togglePower(player.name)
        global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.PLAYER_TOGGLE_POWER, toggle), player.id, 0xFF00CD)
    }
    // This command is for displaying the Discord in the chat
    else if (["discord", "dc", "ds"].includes(command)) {
        global.room.sendAnnouncement(global.ROOM_SETTINGS.FORMAT_MESSAGES.COMMAND_DISCORD, player.id, 0x3600FF)
    }
    // This command is for displaying the help message
    else if (["help", "comandos", "ayuda"].includes(command)) {
        global.room.sendAnnouncement(global.ROOM_SETTINGS.FORMAT_MESSAGES.COMMAND_COMMAND, player.id, 0xFFC900)
    }
    // This command checks the argument as password to set admin
    else if (["admin"].includes(command)) {
        testAdminPassword(player, argument)
    }
    // This command displays the statistics of a player
    else if (["stats", "me", "yo", "estadisticas"].includes(command)) {
        let playerStats = getPlayerStatsByName(argument.length > 0 ? argument : player.name)
        if (playerStats) {
            global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.COMMAND_STATS,
                playerStats.name,
                playerStats.goals,
                playerStats.counter_goals,
                playerStats.assistants,
                playerStats.matches,
                playerStats.victories,
                playerStats.defeats,
                playerStats.kicks
            ), player.id, 0xFFE000)
        }
    }
}