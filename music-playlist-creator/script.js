function createPlaylistCards(playlists) {
  const playlistContainer = document.querySelector(".playlist-card");
  playlists.forEach((playlist) => {
    const playlistCard = document.createElement("div");
    playlistCard.classList.add("playlist");

    const playlistImage = document.createElement("img");
    playlistImage.src = playlist.playlist_art;
    playlistImage.alt = "Playlist Image";
    playlistCard.appendChild(playlistImage);
    playlistImage.addEventListener("click", () => openModal(playlist));
    const playlistTitle = document.createElement("h5");
    playlistTitle.textContent = playlist.playlist_name;
    playlistCard.appendChild(playlistTitle);

    const creatorName = document.createElement("h6");
    creatorName.textContent = playlist.playlist_creator;
    playlistCard.appendChild(creatorName);

    const likes = document.createElement("div");
    likes.classList.add("likes");

    const likeCount = document.createElement("span");
    likeCount.classList.add("like-count");
    let count = playlist.likeCount;
    likeCount.textContent = playlist.likeCount;
    likes.appendChild(likeCount);

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.textContent = "♥";
    likes.appendChild(likeButton);
    likeButton.addEventListener("click", function handleClick() {
      if (!likeButton.classList.contains("liked")) {
        count++;
        likeButton.classList.add("liked");
      } else {
        count--;
        likeButton.classList.remove("liked");
      }
      likeCount.textContent = count;
      playlist.likeCount = count;
    });
    playlistCard.appendChild(likes);
    playlistContainer.appendChild(playlistCard);
  });
}
function openModal(playlist) {
  const modal = document.querySelector(".modal");
  const playlistImage = modal.querySelector(".playlist-image");
  const headerText = modal.querySelector(".header-text");
  const modalContent = modal.querySelector(".modal-content");

  const button = modal.querySelector(".shuffle-button");
  button.addEventListener("click", () => {
    shuffleArray(playlist.songs);
    openModal(playlist);
  });
  // Set playlist cover image, name, and creator
  playlistImage.src = playlist.playlist_art;
  headerText.querySelector("h1").textContent = playlist.playlist_name;
  headerText.querySelector("p").textContent = playlist.playlist_creator;

  // Remove existing song elements
  const existingSongs = modalContent.querySelectorAll(".song");
  existingSongs.forEach((song) => song.remove());

  // Add songs to modal
  playlist.songs.forEach((song) => {
    const songElement = document.createElement("div");
    songElement.className = "song";

    songElement.innerHTML = `
        <img src="${song.cover_art}" alt="Song Image" class="song-image">
        <div class="song-details">
          <p>${song.title}</p>
          <p>${song.artist}</p>
        </div>
        <div class="song-duration">
          <p>${song.duration}</p>
        </div>
      `;

    modalContent.appendChild(songElement);
  });

  // Show the modal
  modal.hidden = false;
}

createPlaylistCards(data.playlists);

document.addEventListener("DOMContentLoaded", () => {
  const playlists = data.playlists;

  // Function to open modal and populate it with playlist details

  // Function to close the modal
  function closeModal() {
    const modal = document.querySelector(".modal");
    modal.hidden = true;
  }

  // Add event listeners to each playlist card

  // Add event listener to close button
  document.querySelector(".modal .close").addEventListener("click", closeModal);

  // Add event listener to close modal when clicking outside of modal content
  window.addEventListener("click", (event) => {
    const modal = document.querySelector(".modal");
    if (event.target === modal) {
      closeModal();
    }
  });
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}
