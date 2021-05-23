class Playlist {
    songs = [];

    constructor(name) {
        this.name = name;
    }

    addSong(song) {
        this.songs.push(song);
    }
}