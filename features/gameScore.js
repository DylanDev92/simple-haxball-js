const { formatString } = require("../utils");
const { addStats, getPlayerByName } = require("./playerStats");

module.exports = (team) => {
    let ball = global.room.getDiscProperties(0);
    global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.GOAL_MESSAGE, global.ballPossession.currentPlayer, Math.abs(ball.xspeed * 10).toFixed(2), team === 1 ? "🔴" : "🔵"), null, 0x00FF22, "bold");

    // Adds the stats
    let player = getPlayerByName(global.ballPossession.currentPlayer);
    if (player) {
        if (player.team === team) {
            addStats(global.ballPossession.currentPlayer, "goals", 1);

            if (global.ballPossession.previousPlayer) {
                addStats(global.ballPossession.previousPlayer, "assistants", 1)
            }
        }
        else {
            addStats(global.ballPossession.currentPlayer, "counter_goals", 1);
        }
    }
}