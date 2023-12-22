const { getNearestPlayerToBall, pointDistance, formatString } = require("../utils");
const { getPlayerStatsByName } = require("./playerStats");

let isPowerActivated = true;

let powershotCharge = 0;

function checkPower() {
    let nearestPlayer = getNearestPlayerToBall();
    if (nearestPlayer) {
        if (pointDistance(
            global.room.getPlayerDiscProperties(nearestPlayer.id),
            global.room.getDiscProperties(0)
        ) < global.ROOM_SETTINGS.DISC_SETTINGS.POWER_DISTANCE) {
            powershotCharge++;
            if (powershotCharge > global.ROOM_SETTINGS.DISC_SETTINGS.POWER_CHARGE) {
                global.room.setDiscProperties(0, { color: global.ROOM_SETTINGS.DISC_SETTINGS.POWER_COLOR })
                isPowerActivated = true;
            }
        }
        else {
            powershotCharge = 0;
            global.room.setDiscProperties(0, { color: global.ROOM_SETTINGS.DISC_SETTINGS.NORMAL_COLOR })
            isPowerActivated = false;
        }
    }
}

function kickPowershot(player) {
    let ballProperties = global.room.getDiscProperties(0);

    let playerStats = getPlayerStatsByName(player.name);

    if (isPowerActivated === true && playerStats.use_power) {
        global.room.setDiscProperties(0, {
            xspeed: global.ROOM_SETTINGS.DISC_SETTINGS.POWER_FORCE * ballProperties.xspeed,
            yspeed: global.ROOM_SETTINGS.DISC_SETTINGS.POWER_FORCE * ballProperties.yspeed
        })

        global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.PLAYER_POWER_KICK, player.name), null, 0x8F00FF, "bold", 2)
    }
}

module.exports = { checkPower, kickPowershot }