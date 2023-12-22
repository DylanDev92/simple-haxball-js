const fs = require("fs")
const path = require("path")

module.exports = (name) => {
    let mapName = `${(name ? name : "Twitch_DylanDev_to")}.hbs`
    try {
        const readMap = fs.readFileSync(path.join(global.ROOM_PATHS.MAPS, mapName))
        global.room.setCustomStadium(readMap);

        console.log(`The map has been changed to: ${mapName}`);
    }
    catch (err) {
        console.log(err.message)
    }
}