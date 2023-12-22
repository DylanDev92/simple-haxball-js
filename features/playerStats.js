const fs = require("fs");
const path = require("path");
const { formatString } = require("../utils");

function addStats(playerName, attribute, amount) {
    // If the room has less players than required, It won't add the stat
    if (global.room.getPlayerList().length < global.ROOM_SETTINGS.STATS_PLAYERCOUNT_REQUIREMENT) return;
    
    if (["goals", "counter_goals", "victories", "defeats", "kicks"].includes(attribute)) {
        let playerFind = global.PLAYERS_DB.find(x => x.name === playerName)
        if (playerFind) {
            playerFind[attribute] += amount;
        }
    }
}

function togglePower(playerName) {
    let playerFind = global.PLAYERS_DB.find(x => x.name === playerName)
    if (playerFind) {
        playerFind.use_power = !playerFind.use_power;
        return playerFind.use_power;
    }
    return false;
}

function checkStats(player) {
    let playerFind = global.PLAYERS_DB.find(x => x.name === player.name)
    if (!playerFind) {
        global.PLAYERS_DB.push(
            {
                name: player.name,
                goals: 0,
                counter_goals: 0,
                assistants: 0,
                matches: 0,
                victories: 0,
                defeats: 0,
                kicks: 0,
                conn: "",
                auth: "",
                use_power: true
            }
        )
        global.room.sendAnnouncement(formatString(global.ROOM_SETTINGS.FORMAT_MESSAGES.PLAYER_NEW_DATABASE), player.id, 0xF0FF00, "bold")
    }
}

function savePlayerDB() {
    // Saves the database to "data/player.json"
    fs.writeFileSync(global.ROOM_PATHS.PLAYERS_DB, JSON.stringify(global.PLAYERS_DB))

    console.log("The PLAYERS_DB has been saved correctly")
}

function getPlayerByName(playerName) {
    let foundPlayer = global.room.getPlayerList().find(x => x.name === playerName);
    if (foundPlayer) {
        return foundPlayer;
    }
    return false;
}

function getPlayerStatsByName(playerName){
    let foundPlayer = global.PLAYERS_DB.find(x => x.name === playerName)
    if (foundPlayer) {
        return foundPlayer;
    }
}

module.exports = { addStats, togglePower, checkStats, savePlayerDB, getPlayerByName, getPlayerStatsByName }