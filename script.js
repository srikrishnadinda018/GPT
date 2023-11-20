// script.js

const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const botResponse = document.querySelector('.bot-response');

sendButton.addEventListener('click', async () => {
    const query = userInput.value.trim();
    if (!query) {
        return;
    }

    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exchars=200&titles=${query}`);
    const data = await response.json();
    const page = data.query.pages[Object.keys(data.query.pages)[0]];
    const extract = page.extract;

    botResponse.textContent = extract;
    userInput.value = '';
});
