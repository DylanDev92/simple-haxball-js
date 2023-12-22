const { addStats } = require("./playerStats");

let currentPlayer = "";
let previousPlayer = "";

global.ballPossession = { currentPlayer, previousPlayer }

module.exports = (player) => {
    if (currentPlayer !== player.name) {
        previousPlayer = currentPlayer;
    }
    currentPlayer = player.name;
    global.ballPossession = { currentPlayer, previousPlayer }

    // Add kick stat to player
    addStats(player.name, "kicks", 1);
}