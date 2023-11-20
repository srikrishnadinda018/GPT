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
    // Call Wikipedia API to search for the query
    const searchResults = await searchWikipedia(userInput);

    if (searchResults.length === 0) {
      throw new Error('No results found for the given query.');
    }

    // Display Wikipedia results for the most relevant search result
    const mostRelevantResult = searchResults[0];
    chatOutput.innerHTML += `<div>Wikipedia: ${mostRelevantResult.snippet}</div>`;
  } catch (error) {
    console.error(error);
    chatOutput.innerHTML += `<div>Error: ${error.message}</div>`;
  }

  // Clear input field
  document.getElementById('user-input').value = '';
}

async function searchWikipedia(query) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&origin=*`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.query.search;
  } catch (error) {
    throw new Error('Failed to perform the search.');
  }
}
