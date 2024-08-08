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

document.getElementById('enterButton').addEventListener('click', submitForm);

