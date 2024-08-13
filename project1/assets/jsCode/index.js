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

// const randomize = (event) => {
//     event.preventDefault();
//     const random = playlistOptions[Math.floor(Math.random() * playlistOptions.length)]
//     //use Math.random to select radom number between 0 & 1
//     //multiply by length of the playlist options array, and then use math.floor to get a whole number
//     console.log(random);

//     localStorage.setItem('randomPlaylist', JSON.stringify(random));
//     //storing randomly selected playlist in local storage.

//     window.location.href = "./playlist.html"
//     //directing user to playlist.html page, where they will receive their generated playlist.
// }

// let playlist1 = ['CountrySong', 'song2', 'song3', 'song4', 'song5'];
// let playlist2 = ['PopSong', 'song22', 'song33', 'song44', 'song55'];
// let playlist3 = ['RapSong', 'song2', 'song3', 'song4', 'song5'];
// let playlist4 = ['ClassicalPiece', 'song2', 'song3', 'song4', 'song5'];
// let playlist5 = ['JazzPiece', 'song2', 'song3', 'song4', 'song5'];
// //creating some premade playlists that we will add to one array. These playlists
// //will have songs already added to them, and then one will be given to the user after
// //they click on the random button.
// //console.log(playlist3);

// let playlistOptions = [playlist1, playlist2, playlist3, playlist4, playlist5];
// //creating an array of premade playlists, one will be selected and displayed to the user
// //when the randomize function is run.

// document.getElementById('enterButton').addEventListener('click', submitForm);
// //when enterButton is clicked, the submitForm function is run, taking the two pieces 
// //of user input, storing them as properties of an object, and storing them in the local storage
// //to be retrieved on the next page.

// document.getElementById('randomButton').addEventListener('click', randomize);
// //when randomButton is clicked, the randomize function is run, and it will display 
// //a randomly selected, premade playlist from an array of playlists.




const moodSelect = document.querySelector('#question1');
const genreSelect = document.querySelector('#question2');
const randomButton = document.querySelector('#randomButton');
const playlistUrl = './playlist.html';


// let secondsRemaining = 6;

// function modalGenerate() {
//   const timerInterval = setInterval(function () {
//     secondsRemaining--;
//     modalOutput.textContent = `playlist generating in ${secondsRemaining}`;

//     if (secondsRemaining === 0) {
//       window.location.replace(playlistUrl);
//       clearInterval(timerInterval);
//       sendMessage();
//     }

//   }, 1000);
// }

// moodSelect.addEventListener('change', modalGenerate);
// genreSelect.addEventListener('change', modalGenerate);
// randomButton.addEventListener('click', modalGenerate);

moodSelect.addEventListener('change', moodPlaylist);
genreSelect.addEventListener('change', genrePlaylist);
randomButton.addEventListener('click', randomPlaylist);


const clientId = '88a4a2b546c64d72af46789cd47c436f';
const clientSecret = '71c8bcd8b4e94b1eaea0dab25e41a9bd';
const authUrl = 'https://accounts.spotify.com/api/token';

// ADD NUMBER OF MOOD PLAYLISTS
const moodPlaylists = {
    happy: '37i9dQZF1DWSf2RDTDayIx', //happy beats
    sad: '37i9dQZF1DWSqBruwoIXkA', //sad hour
    upbeat: '37i9dQZF1DWYBO1MoTDhZI', //Good Vibes
    melancholy: '37i9dQZF1DX39ATYW02fre', //Melantronic
    romantic: '37i9dQZF1DX6mvEU1S6INL' //You & Me
};

// ADD NUMBER OF GENRE PLAYLISTS
const genrePlaylists = {
    pop: '37i9dQZF1DXaPCIWxzZwR1', //Pop Sauce
    classical: '27Zm1P410dPfedsdoO9fqm', //Classical Bangers 🎹🎻
    metal: '37i9dQZF1EQpgT26jgbgRI', //Metal Mix
    rap: '37i9dQZF1DX0XUsuxWHRQd', //RapCaviar
    country: '37i9dQZF1EQmPV0vrce2QZ' //Country Mix
}

// ADD NUMBER OF RANDOM PLAYLISTS
const randomPlaylists = {
    1: '37i9dQZF1DX905zIRtblN3', //
    2: '37i9dQZF1DXcNb6Ba0LuVc', //
    3: '37i9dQZF1DXcBWIGoYBM5M', //
    4: '37i9dQZF1DXcNb6Ba0LuVc', //
    5: '37i9dQZF1DWSf2RDTDayIx', //
}


async function fetchToken() {
    const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        })
    });
    const data = await response.json();
    return data.access_token;
}


async function moodPlaylist() {
    const mood = moodSelect.value;
    if (!mood) {
        alert('Please select a mood.');
        return
    }

    const playlistId = moodPlaylists[mood];
    const token = await fetchToken();

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        displayPlaylist(data);
        localStorage.setItem('playlists', JSON.stringify(data));
    } else {
        alert('Failed to generate playlist.');
    }
};


async function genrePlaylist() {
    const genre = genreSelect.value;
    if (!genre) {
        alert('Please select a genre.');
        return;
    }
    const playlistId = genrePlaylists[genre];
    const token = await fetchToken();

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        displayPlaylist(data);
        localStorage.setItem('playlists', JSON.stringify(data));
    } else {
        alert('Failed to generate playlist.');
    }
};


async function randomPlaylist() {
    // CHANGE NUMBER TO FIT SCALE
    const i = Math.floor(Math.random() * 5) + 1;
    console.log(i)
    const playlistId = randomPlaylists[i];
    const token = await fetchToken();

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        displayPlaylist(data);
        localStorage.setItem('playlists', JSON.stringify(data));
    } else {
        alert('Failed to generate playlist.');
    }
};

function displayPlaylist() {
    window.location.replace(playlistUrl);
}
