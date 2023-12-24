const { reorganizePlayers } = require("./distributePlayer");
const loadMap = require("./loadMap");
const { savePlayerDB } = require("./playerStats");

module.exports = (player) => {
    savePlayerDB(); // Saves the PLAYERS_DB after finishing the game

    let countPlayers = global.room.getPlayerList().length;

    if (countPlayers > 16) {
        loadMap("Twitch_DylanDev_to x11")
    }
    else if (countPlayers > 12) {
        loadMap("Twitch_DylanDev_to x7")
    }
    else if (countPlayers > 6) {
        loadMap("Twitch_DylanDev_to x5")
    }
    else {
        loadMap("Twitch_DylanDev_to x3")
    }

    reorganizePlayers(); // Reorganizes the players team

    setTimeout(() => {
        global.room.startGame();
    }, 2000);
}