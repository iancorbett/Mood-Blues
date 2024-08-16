// for the submit button
const submitForm = (event) => {
    event.preventDefault();
    //prevent page from refreshing
    const form = {
        Mood: document.getElementById('question1').value,
        Genre: document.getElementById('question2').value
    }
    console.log(form);
    localStorage.setItem('userMood&Genre', JSON.stringify(form));
    //storing user input in local storage
    window.location.href = "./playlist.html";
}
document.getElementById('enterButton').addEventListener('click', submitForm);

// THIS PART OF THE CODE HANDLES THE QUOTE RENDITION AS WEBSITE LOADS
// the api url and options passed into fetch request 
const quoteUrl = 'https://random-quote-api3.p.rapidapi.com/';
const quoteOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5e80f44021msh556114d38a07a29p14bf05jsn502a39436a33',
        'x-rapidapi-host': 'random-quote-api3.p.rapidapi.com'
    }
};

// added event listener with event handler function to display the random quote on load
document.addEventListener('DOMContentLoaded', () => {
    // targets the placeholder for the quote and author
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    // adds styling to quote
    quoteText.setAttribute('style', 'font-size:35px; color:red')
    quoteAuthor.setAttribute('style', 'font-size:30px; color:blue')

    // fetch request to the random quote api
    const fetchQuote = async () => {
        try {
            const response = await fetch(quoteUrl, quoteOptions);
            const data = await response.json();
            quoteText.textContent = `"${data.quote}"`;
            quoteAuthor.textContent = `— ${data.author}`;
            // console.log(data)
        } catch (error) {
            quoteText.textContent = 'Failed to fetch quote.';
        }
    };
    // Fetch a quote on page load
    fetchQuote();
});


// THIS ENTIRE SECTION OF CODE IS FOR THE SPOTIFY API
// targeting the required elements/components for the buttons and forms
const moodSelect = document.querySelector('#question1');
const genreSelect = document.querySelector('#question2');
const randomButton = document.querySelector('#randomButton');
// url to the playlist web page
const playlistUrl = './playlist.html';

// added event listeners with their respective event handler functions
moodSelect.addEventListener('change', moodPlaylist);
genreSelect.addEventListener('change', genrePlaylist);
randomButton.addEventListener('click', randomPlaylist);

// stores the url and options when fecthing from the spotify api
const clientId = '88a4a2b546c64d72af46789cd47c436f';
const clientSecret = '71c8bcd8b4e94b1eaea0dab25e41a9bd';
const spotifyUrl = 'https://accounts.spotify.com/api/token';

// object containing all the moods and their related playlist IDs
const moodPlaylists = {
    happy: '37i9dQZF1DWSf2RDTDayIx', // happy beats
    sad: '37i9dQZF1DWSqBruwoIXkA', // sad hour
    upbeat: '37i9dQZF1DWYBO1MoTDhZI', // Good Vibes
    melancholy: '37i9dQZF1DX39ATYW02fre', // Melantronic
    romantic: '37i9dQZF1DX6mvEU1S6INL', // You & Me
    imaginative: '0Q7slHs1SgqNrjqBhgH6yy' // pov:it's the end of the world
};

// object containing all the genres and their related playlist IDs
const genrePlaylists = {
    pop: '37i9dQZF1DXaPCIWxzZwR1', // Pop Sauce
    classical: '37i9dQZF1DX17GkScaAekA', // Dark Academia Classical
    metal: '37i9dQZF1EQpgT26jgbgRI', // Metal Mix
    rap: '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
    country: '37i9dQZF1EQmPV0vrce2QZ', // Country Mix
    rnb: '37i9dQZF1DWSfMe9z89s9B' // Vanguard
}

// object containing various playlists, with the keys being numbers for the random number generator 
const randomPlaylists = {
    1: '37i9dQZF1DWUb0uBnlJuTi', // Jazz-Funk
    2: '37i9dQZF1DX2UgsUIg75Vg', // Chilled R&B
    3: '37i9dQZF1DX9G93rIVMmzM', // ALLURE
    4: '37i9dQZF1DX3WvGXE8FqYX', // Women of Pop
    5: '37i9dQZF1DWVA1Gq4XHa6U', // Gold School
    6: '37i9dQZF1DX10zKzsJ2jva', // Viva Latino
    7: '37i9dQZF1DX4dyzvuaRJ0n', // mint
    8: '37i9dQZF1DX8S0uQvJ4gaa', // New Boots
    9: '37i9dQZF1DWXLeA8Omikj7', // Brain Food
    10: '37i9dQZF1DX6VdMW310YC7', // Chill Tracks
}

// function to request a token for spotify api access
async function fetchToken() {
    // api fetch request with the 
    const response = await fetch(spotifyUrl, {
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

// function to fetch the data from the api for the playlist the user selects using the mood selector
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
        localStorage.setItem('playlists', JSON.stringify(data));
    } else {
        alert('Failed to generate playlist.');
    }
};

// function to fetch the data from the api for the playlist the user selects using the genre selector
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
        localStorage.setItem('playlists', JSON.stringify(data));

    } else {
        alert('Failed to generate playlist.');
    }
};

// function to fetch the data from the api for the random playlist chosen using the button
async function randomPlaylist() {
    // CHANGE NUMBER TO FIT SCALE
    const i = Math.floor(Math.random() * 10) + 1;
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
        localStorage.setItem('playlists', JSON.stringify(data));
        window.location.replace(playlistUrl);
    } else {
        alert('Failed to generate playlist.');
    }

};

function displayPlaylist() {
    window.location.replace(playlistUrl);
}

