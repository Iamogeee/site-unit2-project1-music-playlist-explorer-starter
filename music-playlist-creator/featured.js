document.addEventListener("DOMContentLoaded", function () {
  const highlightedCover = document.getElementById("featured-cover");
  const highlightedTitle = document.getElementById("featured-title");
  const highlightedSongs = document.getElementById("featured-songs");

  function getRandomPlaylist() {
    const randomIndex = Math.floor(Math.random() * data.playlists.length);
    return data.playlists[randomIndex];
  }

  function displayPlaylist(playlist) {
    highlightedCover.src = playlist.playlist_art;
    highlightedTitle.textContent = playlist.playlist_name;
    highlightedSongs.innerHTML = "";

    playlist.songs.forEach((song) => {
      const songItem = document.createElement("li");
      songItem.innerHTML = `
      <img src="${song.cover_art}" alt="Song Image" class="song-image">
      <div class="song-details">
        <p>${song.title}</p>
        <p>${song.artist}</p>
      </div>
      <div class="song-duration">
        <p>${song.duration}</p>
      </div>
          `;
      highlightedSongs.appendChild(songItem);
    });
  }

  const randomPlaylist = getRandomPlaylist();
  displayPlaylist(randomPlaylist);
});
