let count = 0;

module.exports = () => {
    global.room.sendAnnouncement(global.ROOM_SETTINGS.SERVER_ANNOUNCEMENTS[count], null, 0x00E4FF, "bold")

    count = (count + 1) % global.ROOM_SETTINGS.SERVER_ANNOUNCEMENTS.length;
}