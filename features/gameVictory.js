const { formatString } = require("../utils");
const { addStats } = require("./playerStats");

module.exports = (scores) => {
    let redWon = (scores.red > scores.blue);
    global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.WIN_MESSAGE, redWon ? global.ROOM_INFO.TEAM_NAMES.red : global.ROOM_INFO.TEAM_NAMES.blue, scores.red, scores.blue), null, 0x00FF22, "bold")

    let wonTeamId = redWon ? 1 : 2
    global.room.getPlayerList().forEach(x => {
        // If the player is winner then adds a victorie, otherwise adds a defeat
        if (x.team === wonTeamId) {
            addStats(x.name, "victories", 1)
        }
        else {
            addStats(x.name, "defeats", 1)
        }

        // At the end adds a matches point (could have just made a victories + defeats)
        addStats(x.name, "matches", 1)
    })
}