// Features for the room
const HaxballJS = require("haxball.js");
const { distributePlayer } = require("./features/distributePlayer");
const loadMap = require("./features/loadMap");
const announceGame = require("./features/announceGame");
const ballPossession = require("./features/ballPossession");
const gameScore = require("./features/gameScore");
const gameVictory = require("./features/gameVictory");
const gameStop = require("./features/gameStop");
const playerMessage = require("./features/playerMessage");
const { checkStats } = require("./features/playerStats");
const { kickPowershot, checkPower } = require("./features/powerShot");
const { checkIsAdmin } = require("./features/checkPlayerAdmin");

// Reading 
const fs = require("fs");
const path = require("path");
global.ROOM_PATHS = {
  PLAYERS_DB: path.join(process.cwd(), "data", "players.json"),
  MAPS: path.join(process.cwd(), "maps")
}

// Development Settings
require('dotenv').config();
const isDevepmentEnvironment = process.env.TYPE === "DEVELOPMENT" ? true : false;

// Information of the room
const NAME = "🟣 Juegan todos con DylanDev_to 🟣"
const TOKEN = "thr1.AAAAAGWB48Uy6DA8DGs9fQ.Yt9YtBMKQYE"
const ADMIN_NAMES = []
const TEAM_NAMES = { red: "Red", blue: "Blue" }
const GEO = { code: "ar", lat: -32.94682, lon: -60.63932 }

global.ROOM_INFO = { NAME, TOKEN, ADMIN_NAMES, TEAM_NAMES }

// Settings
const INTERVAL_ANNOUNCEMENT = 60000 // <- Miliseconds
const DEFAULT_MAP_NAME = "Twitch_DylanDev_to x3";
const PUBLIC = true;
const MAX_PLAYERS = 24;
const SERVER_ANNOUNCEMENTS = [
  "🟣 Sígueme en Twitch: DylanDev_to 🟣",
  "✉️ Respeta a los demás ✉️",
  "🎙️ Únete al Discord: https://discord.gg/rqJ4d4bUPG 🎙️",
  "🔴 Estoy en directo en Twitch: DylanDev_to 🔴",
]
const TIME_LIMIT = 10;
const SCORE_LIMIT = 5;
const DISC_SETTINGS = {
  NORMAL_COLOR: 0xFFDC00,
  POWER_COLOR: 0xFF0000,
  POWER_FORCE: 1.5,
  POWER_DISTANCE: 30,
  POWER_CHARGE: 150 // Ticks
}
const STATS_PLAYERCOUNT_REQUIREMENT = 6;
const FORMAT_MESSAGES = {
  GOAL_MESSAGE: "{2} | ⚽ ¡{0} Ha metido un gol a {1}km/s! ⚽", // 0: PlayerName, 1: BallSpeed, 2: Team
  WIN_MESSAGE: "⚽ ¡El equipo {0} ha ganado el partido! ⚽ | 🔴 {1} - {2} 🔵", // 0: Team, 1: RedScore, 2: BlueScore
  PLAYER_MESSAGE: "{2} {0}: {1}", // 0: PlayerName, 1: Message, 2: PlayerTeam
  PLAYER_LEAVE: "👋 El jugador {0} se ha ido de la partida, vuelva pronto 👋", // 0: PlayerName
  PLAYER_TOGGLE_POWER: "Estado de tu power: {0}", // 0: True/False
  PLAYER_NEW_DATABASE: "¡Se te ha creado una nueva cuenta en la sala!",
  PLAYER_POWER_KICK: "⭐ ¡WHOOSH! {0} ha usado el power ⭐", // 0: PlayerName
  COMMAND_DISCORD: "✉️ Link del Discord: https://discord.gg/rqJ4d4bUPG ✉️",
  COMMAND_COMMAND: "🤖 Comandos de ayuda 🤖\n!power - Para activar/desactivar el powershot.\n!bb - Para salirse de la sala.",
  COMMAND_ADMIN: "🔨 Se le ha dado admin a {0} 🔨", // 0: PlayerName,
  COMMAND_STATS: "📊 Estadisticas de {0} 📊\nGoles: {1} - Goles en contra: {2}\nAsistencias: {3}\nPartidos jugados: {4}\nVictorias: {5} - Derrotas: {6}\nToques: {7}", // 0: PlayerName, 1: Goals, 2: CounterGoals, 3: Assitants, 4: Matches, 5: Victories, 6: Defeats, 7: Kicks
}

global.ROOM_SETTINGS = { INTERVAL_ANNOUNCEMENT, DEFAULT_MAP_NAME, PUBLIC, MAX_PLAYERS, SERVER_ANNOUNCEMENTS, TIME_LIMIT, SCORE_LIMIT, DISC_SETTINGS, FORMAT_MESSAGES, STATS_PLAYERCOUNT_REQUIREMENT }

// Reads the player database in the path "data/player.json"
fs.readFile(global.ROOM_PATHS.PLAYERS_DB, (err, data) => {
  if (err) {
    console.log(`Error reading database: ${err.message}`)
    return;
  }

  global.PLAYERS_DB = JSON.parse(data);
  console.log(`${global.PLAYERS_DB.length} players has been found in the database.`)
})

HaxballJS.then((HBInit) => {
  // Main config of the room
  const room = HBInit({
    roomName: isDevepmentEnvironment ? "Testing Environment" : NAME,
    maxPlayers: MAX_PLAYERS,
    public: PUBLIC,
    noPlayer: true,
    token: TOKEN,
    geo: isDevepmentEnvironment ? null : GEO
  });

  global.room = room;

  room.setDefaultStadium("Big"); // This is for setting the default stadium in case you don't have one

  room.setScoreLimit(isDevepmentEnvironment ? 1 : SCORE_LIMIT);
  room.setTimeLimit(TIME_LIMIT);

  room.onRoomLink = function (link) {
    console.log(`This is the link of the room: ${link}`);

    // Features
    loadMap(DEFAULT_MAP_NAME); // Loads the map acording to default map

    room.startGame(); // Starts the game
  };

  room.onPlayerJoin = (player) => {
    console.log(`${player.name} joined the server`);

    // Features
    distributePlayer(player); // Moves the player to the other team equally
    checkIsAdmin(player); // Checks if the player is admin
    checkStats(player); // Checks if the player stats exists
  }

  room.onPlayerBallKick = (player) => {

    // Features
    ballPossession(player); // Then the player kicks the ball gets the possession
    kickPowershot(player);
  }

  room.onTeamGoal = (team) => {

    // Features
    gameScore(team); // When the team scores
  }

  room.onTeamVictory = (scores) => {

    // Features
    gameVictory(scores); // When the team wins
  }

  room.onGameStop = (player) => {

    // Features
    gameStop(player); // When the game ends
  }

  room.onPlayerChat = (player, message) => {

    // Features
    playerMessage(player, message); // Manages the user messages
    return false;
  }

  room.onGameTick = () => {

    // Features
    checkPower();
  }

  // Sets an interval for INTERVAL_ANNOUNCEMENT for the annouces
  setInterval(() => {
    announceGame(); // Throws an announcement to the room
  }, INTERVAL_ANNOUNCEMENT);
});