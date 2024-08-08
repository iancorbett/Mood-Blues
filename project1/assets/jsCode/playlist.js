// create a variable to get selection from local storage and parsing it
let form = JSON.parse(localStorage.getItem('userMood&Genre'));


console.log(form);
console.log('hello');
console.log(form.Mood);

// for the back button
function backButton() {
    window.history.back()
};



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

renderMood ();