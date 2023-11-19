const chatOutput = document.getElementById('chat-output');
const userInputBox = document.getElementById('user-input-box');

function sendMessage() {
    const userMessage = userInputBox.value;
    if (userMessage.trim() === '') return;

    appendMessage('user', userMessage);
    
    // Call Wikipedia API (replace with actual API call)
    // For simplicity, a placeholder response is used here.
    const botMessage = `Wikipedia response for "${userMessage}"`;
    
    appendMessage('bot', botMessage);

    // Clear user input
    userInputBox.value = '';
}

function appendMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender);

    const image = document.createElement('img');
    image.src = (sender === 'user') ? 'user-image.png' : 'bot-image.png';

    const text = document.createElement('p');
    text.textContent = message;

    messageContainer.appendChild(image);
    messageContainer.appendChild(text);
    chatOutput.appendChild(messageContainer);

    // Scroll to the bottom for the latest message
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
