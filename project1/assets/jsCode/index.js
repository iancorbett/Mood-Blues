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