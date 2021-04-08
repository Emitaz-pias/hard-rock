searchSong = () => {
  const searchedText = document.getElementById("search-field").value;
  const url = `https://api.lyrics.ovh/suggest/:${searchedText}`;
fetch(url)
.then(res=>res.json())
.then(data=>console.log(data))

};
