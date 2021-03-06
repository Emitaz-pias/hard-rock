searchSong = () => {
  const searchedText = document.getElementById("search-field").value;
  searchedText.value = " ";
  const url = `https://api.lyrics.ovh/suggest/:${searchedText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showSong(data.data))
    .catch((error) =>
      displayError(`"your search didn't match  to any document :("`)
    );
  spinner();
  showSong = (songs) => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    songs.forEach((song) => {
      const createSongDiv = document.createElement("div");
      createSongDiv.className = "single-result row align-items-center my-3 p-3";
      const createSongDetails = `
<div class="col-md-9">
<h3 class="lyrics-name">${song.title}</h3>
<p class="author lead">Album by <span>${song.artist.name}</span></p>
<audio controls>
<source src="${song.preview}" type="audio/mpeg">
</audio>
</div>
<div class="col-md-3 text-md-right text-center">
<button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
</div>
`;
      spinner();
      createSongDiv.innerHTML = createSongDetails;
      songContainer.appendChild(createSongDiv);
      // console.log(song);
    });
  };
};
// get lyrics
const getLyrics = async (artist, songName) => {
  const url = `https://api.lyrics.ovh/v1/'${artist}'/'${songName}'`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayLyrics(data);
  } catch (error) {
    displayError("sorry dear requested lyrics is not uploaded yet");
  }
};
// display lyrics
displayLyrics = (lyrics) => {
  const getLyricsDiv = document.getElementById("lyrics-div");
  getLyricsDiv.innerText = lyrics.lyrics;
};
// display error message
displayError = (error) => {
  document.getElementById("error").innerText = error;
};
// display spinner
const spinner = () => {
  const spinner = document.getElementById("data-spinner");
  const songDiv = document.getElementById("song-container");
  spinner.classList.toggle("d-none");
  songDiv.classList.toggle("d-none");
};
document
  .getElementById("search-field")
  .addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      document.getElementById("search-btn").click();
    }
  });
