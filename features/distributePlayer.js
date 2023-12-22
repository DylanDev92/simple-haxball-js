const { shuffleArray } = require("../utils");

function distributePlayer(player) {
    const playerTeamCount = global.room.getPlayerList().map(x => {
        return (x.team)
    }).filter(x => x !== 0)

    let reds = 0;
    let blues = 0;

    playerTeamCount.forEach(team => {
        if (team == 1) reds++;
        else blues++;
    });

    global.room.setPlayerTeam(player.id, reds > blues ? 2 : 1);
}

function reorganizePlayers() {
    let reorganizedPlayers = shuffleArray(global.room.getPlayerList()); // Shuffles the players
    for (let i = 0; i < reorganizedPlayers.length; i++) {
        global.room.setPlayerTeam(reorganizedPlayers[i].id, (i % 2) + 1); // Alternates the players team
    }
}

module.exports = { distributePlayer, reorganizePlayers }