// this code targets the container and back button
const playlistContainer = document.querySelector('#backgroundPlaylist');
const homeButton = document.querySelector('#backButton');
// url to the back button
const homeUrl = './index.html';

// click event that will lead you back to the home page
homeButton.addEventListener('click', function () {
    window.location.replace(homeUrl);
})

// this function will render all the data from the api fetch call from the index.js file
function displayPlaylist() {
    const playlist = JSON.parse(localStorage.getItem('playlists'));
    const playlistName = document.createElement('h2')
    const playlistImg = document.createElement('img')
    const playlistImgUrl = document.createElement('a')


    // add the appropriate data top the 
    playlistImg.src = playlist.images[0].url
    playlistName.textContent = playlist.name
    playlistImgUrl.href = playlist.external_urls.spotify

    // sets the styling for the playlist name and image
    playlistName.setAttribute('style', 'font-size: 30px ')
    playlistImg.setAttribute('style', 'width:200px; height:200px')

    // appends the playlist info to body (playlistContainer)
    playlistImgUrl.appendChild(playlistImg)
    playlistContainer.appendChild(playlistName);
    playlistContainer.appendChild(playlistImgUrl);

    // replace 30 with playlist.tracks.items.length or desired length, or leave as is
    for (i = 0; i < 30; i++) {
        // this block of codes adds all of the components of the individual cards
        const cardEl = document.createElement('section');
        const titleEl = document.createElement('h3');
        const imgUrl = document.createElement('a')
        const trackImg = document.createElement('img');
        const trackArtist = document.createElement('p')
        const trackUrl = document.createElement('a')

        // this block of code sets all the appropriate api data so we can display it
        trackImg.src = playlist.tracks.items[i].track.album.images[2].url
        titleEl.textContent = playlist.tracks.items[i].track.album.name
        trackArtist.textContent = playlist.tracks.items[i].track.artists[0].name
        trackUrl.href = playlist.tracks.items[i].track.external_urls.spotify
        trackUrl.textContent = `Spotify: ${titleEl.textContent}`
        imgUrl.href = playlist.tracks.items[i].track.external_urls.spotify

        // this block of code appends all the added content
        imgUrl.appendChild(trackImg)
        cardEl.appendChild(imgUrl)
        cardEl.appendChild(trackArtist)
        cardEl.appendChild(titleEl);
        cardEl.appendChild(trackUrl);

        // here we are adding the card/section to the container
        playlistContainer.appendChild(cardEl);

        // sets the value for its class for the cardEl element in order to be targeted by CSS
        cardEl.setAttribute('class', 'playlist-cards');
    }
    console.log(playlist)
}
// invokes the displayPlaylist function as soon on page load
displayPlaylist()






let form = JSON.parse(localStorage.getItem('userMood&Genre'));
let random = JSON.parse(localStorage.getItem('randomPlaylist'));

// get stored data from local storage
function renderMood() {
    // if mood is upbeat
    if (form.Mood === 'upbeat') {
        document.body.classList.toggle('upbeatMode')
    }
    // if mood is melancholy
    else if (form.Mood === 'melancholy') {
        document.body.classList.toggle('melancholyMode')
    }
    // if mood is happy
    else if (form.Mood === 'happy') {
        document.body.classList.toggle('happyMode')
    }
    // if mood is sad
    else {
        document.body.classList.toggle('sadMode')
    }
};

renderMood();




// api key and url
const apiKey = 'PWCDGxIFLzAbip6hW03JocGA2Qcghja1';
const eventUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
// targeting the c
const eventContainer = document.getElementById('event')

// Parameters for the api call
const params = new URLSearchParams({
    apikey: apiKey,
    keyword: 'music',
    city: 'New York',
});

function eventFetch() {
    fetch(`${eventUrl}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data._embedded.events);
            console.log(data._embedded.events[0].name);

            for (i = 0; i < 5; i++) {
                const eventCard = document.createElement('div');
                const imgUrl = document.createElement('a')
                const eventImg = document.createElement('img');
                const eventName = document.createElement('h3');
                //     // const eventImg = document.createElement('')

                eventCard.setAttribute('style', 'text-align:center')
                eventImg.setAttribute('style', 'width:300px; height:200px')
                eventName.setAttribute('style', 'font-size:10px; color:black; font:monospace')


                eventImg.src = data._embedded.events[i].images[i].url;
                eventName.textContent = data._embedded.events[i].name;
                imgUrl.href = data._embedded.events[i].url

                imgUrl.appendChild(eventImg)
                eventCard.appendChild(imgUrl);
                eventCard.appendChild(eventName);
                eventContainer.appendChild(eventCard)
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });



}

document.addEventListener('DOMContentLoaded', eventFetch())