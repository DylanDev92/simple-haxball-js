const { formatString } = require("../utils");

// Not secure
function checkIsAdmin(player) {
    if (global.ROOM_INFO.ADMIN_NAMES.includes(player.name)) {
        global.room.setPlayerAdmin(player.id, true);
    }
}

function testAdminPassword(player, password) {
    if (password === process.env.ADMIN_PASSWORD) {
        global.room.setPlayerAdmin(player.id, true);
        global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.COMMAND_ADMIN, player.name), player.id, 0x00FF78)
    }
}

module.exports = { testAdminPassword, checkIsAdmin }