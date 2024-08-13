// const playlistContainer = document.getElementById('backgroundPlaylist');
// //making a container to push song titles into to be displayed on the screen

// // create a variable to get selection from local storage and parsing it
// let form = JSON.parse(localStorage.getItem('userMood&Genre'));
// let random = JSON.parse(localStorage.getItem('randomPlaylist'));

// console.log(form);
// console.log('hello');
// console.log(form.Mood);

// // for the back button
// function backButton() {
//     window.history.back()
// };



// // get stored data from local storage
// function renderMood() {
//     // if mood is upbeat
//     if (form.Mood === 'upbeat') {
//         document.body.classList.toggle('upbeatMode')
//     }
//     // if mood is melancholy
//     else if (form.Mood === 'melancholy') {
//         document.body.classList.toggle('melancholyMode')
//     }
//     // if mood is happy
//     else if (form.Mood === 'happy') {
//         document.body.classList.toggle('happyMode')
//     }
//     // if mood is sad
//     else {
//         document.body.classList.toggle('sadMode')
//     }
// };

// renderMood ();

// for (let i = 0; i < random.length; i++) {
//     // here we are creating a for loop to iterate through all of the songs in the
//     //playlist that was randomly selected
//     const element = random[i];
//     // here we are creating an object called element and setting it equal to each individual
//     //song that is in the playlist.
//     const cardEl = document.createElement('section');
//     // here we are creating a section element for each song 
//     cardEl.setAttribute('class', 'playlist-cards');
//     // here we are creating a class for all of the cards so that they can all be targeted together
//     const titleEl = document.createElement('p');
//     // here we are creating a paragraph element for the title
//     //const contentEl = document.createElement('p');
//     titleEl.textContent = element;
//     // here we are setting the title property of the element equal to the song title.
//     cardEl.appendChild(titleEl);
//     // here we are adding the title element to the card
//     playlistContainer.appendChild(cardEl);
//     // here we are adding the card to the container
// }






const playlistContainer = document.querySelector('#backgroundPlaylist');
const homeButton = document.querySelector('#backButton')
const homeUrl = './index.html'

// click event that will lead you back to the home page
homeButton.addEventListener('click', function () {
    window.location.replace(homeUrl);
})

function displayPlaylist() {
    const playlist = JSON.parse(localStorage.getItem('playlists'));

    const playlistName = document.createElement('h2')
    const playlistImg = document.createElement('img')

    // add the appropriate data top the 
    playlistImg.src = playlist.images[0].url
    playlistName.textContent = playlist.name

    // sets the styling for the playlist name and image
    playlistName.setAttribute('style', 'font-size: 30px ')
    playlistImg.setAttribute('style', 'width:200px; height:200px')

    // appends the playlist info to body (playlistContainer)
    playlistContainer.appendChild(playlistName);
    playlistContainer.appendChild(playlistImg);

    // for (i = 0; i < playlist.tracks.items.length; i++) {
    for (i = 0; i < 30; i++) {
        const cardEl = document.createElement('section');
        cardEl.setAttribute('class', 'playlist-cards');
        const titleEl = document.createElement('h3');
        const trackImg = document.createElement('img');
        const trackArtist = document.createElement('p')

        trackImg.src = playlist.tracks.items[i].track.album.images[2].url
        titleEl.textContent = playlist.tracks.items[i].track.album.name
        trackArtist.textContent = playlist.tracks.items[i].track.artists[0].name


        cardEl.appendChild(trackImg)
        cardEl.appendChild(trackArtist)
        // cardEl.appendChild(trackInfo)
        cardEl.appendChild(titleEl);
        // here we are adding the title element to the card
        playlistContainer.appendChild(cardEl);
        // here we are adding the card to the container
    }
    console.log(playlist)
}
displayPlaylist()