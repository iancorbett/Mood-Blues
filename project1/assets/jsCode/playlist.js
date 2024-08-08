let form = JSON.parse(localStorage.getItem('userMood&Genre'));

console.log(form);
console.log('hello');

console.log(form.Mood);

if (form.Mood === 'upbeat') {
    document.body.classList.toggle('upbeatMode')
}
else if (form.Mood === 'melancholy') {
    document.body.classList.toggle('melancholyMode')
}
else if (form.Mood === 'happy') {
    document.body.classList.toggle('happyMode')
}
else {
    document.body.classList.toggle('sadMode')
}
