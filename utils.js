function formatString(mainString, ...args) {
    return mainString.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function pointDistance(p1, p2) {
    let d1 = p1.x - p2.x;
    let d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}

function getNearestPlayerToBall() {
    let ballProperties = global.room.getDiscProperties(0);
    let nearestPlayer = global.room.getPlayerList()
        .filter((x) => x.team !== 0)
        .sort(
            (a, b) =>
                pointDistance(
                    global.room.getPlayerDiscProperties(a.id),
                    ballProperties,
                ) -
                pointDistance(
                    global.room.getPlayerDiscProperties(b.id),
                    ballProperties,
                )
        )[0];
    if (nearestPlayer) {
        return nearestPlayer;
    }
}

module.exports = { formatString, shuffleArray, pointDistance, getNearestPlayerToBall };
