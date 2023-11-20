// script.js
async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const chatOutput = document.getElementById('chat-output');

  if (!userInput) {
    return; // Do not send empty messages
  }

  // Display user's message
  chatOutput.innerHTML += `<div>User: ${userInput}</div>`;

  try {
    // Call Wikipedia API
    const response = await getWikipediaData(userInput);

    // Display Wikipedia results
    chatOutput.innerHTML += `<div>Wikipedia: ${response}</div>`;
  } catch (error) {
    console.error(error);
    chatOutput.innerHTML += `<div>Error fetching Wikipedia data.</div>`;
  }

  // Clear input field
  document.getElementById('user-input').value = '';
}

async function getWikipediaData(query) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&titles=${query}&origin=*`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const pageId = Object.keys(data.query.pages)[0];

    if (pageId === '-1') {
      throw new Error('No information found for the given query.');
    }

    return data.query.pages[pageId].extract;
  } catch (error) {
    throw new Error('Failed to fetch Wikipedia data.');
  }
}

