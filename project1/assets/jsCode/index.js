// for the submit button
const submitForm = (event) => {
    event.preventDefault();
    //prevent page from refreshing
    const form = {
        Mood: document.getElementById('question1').value,
        Genre: document.getElementById('question2').value
    }
    //creating an object and assigning mood and genre properties to it.

    console.log(form);

    localStorage.setItem('userMood&Genre', JSON.stringify(form));
    //storing user input in local storage
    window.location.href = "./playlist.html";


    //directing user to playlist.html page, where they will receive their generated playlist.
}

const randomize = (event) => {
    event.preventDefault();
    const random = playlistOptions[Math.floor(Math.random() * playlistOptions.length)]
    //use Math.random to select radom number between 0 & 1
    //multiply by length of the playlist options array, and then use math.floor to get a whole number
    console.log(random);

    localStorage.setItem('randomPlaylist', JSON.stringify(random));
    //storing randomly selected playlist in local storage.


    window.location.href = "./playlist.html"

    //directing user to playlist.html page, where they will receive their generated playlist.
}

let playlist1 = ['CountrySong', 'song2', 'song3', 'song4', 'song5'];
let playlist2 = ['PopSong', 'song22', 'song33', 'song44', 'song55'];
let playlist3 = ['RapSong', 'song2', 'song3', 'song4', 'song5'];
let playlist4 = ['ClassicalPiece', 'song2', 'song3', 'song4', 'song5'];
let playlist5 = ['JazzPiece', 'song2', 'song3', 'song4', 'song5'];
//creating some premade playlists that we will add to one array. These playlists
//will have songs already added to them, and then one will be given to the user after
//they click on the random button.
//console.log(playlist3);

let playlistOptions = [playlist1, playlist2, playlist3, playlist4, playlist5];
//creating an array of premade playlists, one will be selected and displayed to the user
//when the randomize function is run.

document.getElementById('enterButton').addEventListener('click', submitForm);
//when enterButton is clicked, the submitForm function is run, taking the two pieces 
//of user input, storing them as properties of an object, and storing them in the local storage
//to be retrieved on the next page.

document.getElementById('randomButton').addEventListener('click', randomize);
//when randomButton is clicked, the randomize function is run, and it will display

//a randomly selected, premade playlist from an array of playlists.
