// for the submit button
const submitForm = (event) => {
    event.preventDefault();
    const form = {
        Mood: document.getElementById('question1').value,
        Genre: document.getElementById('question2').value
    }
  console.log(form);

    localStorage.setItem('userMood&Genre', JSON.stringify(form));

    window.location.href="./playlist.html";
}

const randomize = (event) => {
    event.preventDefault();
    const random = playlistOptions[Math.floor(Math.random() * playlistOptions.length)]
    
    console.log(random);

    localStorage.setItem('randomPlaylist', JSON.stringify(random));

    window.location.href="./playlist.html"
}

let playlist1 = ['CountrySong', 'song2', 'song3', 'song4', 'song5'];
let playlist2 = ['PopSong', 'song22', 'song33', 'song44', 'song55'];
let playlist3 = ['RapSong', 'song2', 'song3', 'song4', 'song5'];
let playlist4 = ['ClassicalPiece', 'song2', 'song3', 'song4', 'song5'];
let playlist5 = ['JazzPiece', 'song2', 'song3', 'song4', 'song5'];

//console.log(playlist3);

let playlistOptions = [playlist1, playlist2, playlist3, playlist4, playlist5];
//console.log(playlistOptions);

document.getElementById('enterButton').addEventListener('click', submitForm);

document.getElementById('randomButton').addEventListener('click', randomize);
