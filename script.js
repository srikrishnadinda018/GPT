function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const chatOutput = document.getElementById('chat-output');

  // Display user's message
  chatOutput.innerHTML += `<div>User: ${userInput}</div>`;

  // Call Wikipedia API
  getWikipediaData(userInput)
    .then(response => {
      // Display Wikipedia results
      chatOutput.innerHTML += `<div>Wikipedia: ${response}</div>`;
    })
    .catch(error => {
      console.error(error);
      chatOutput.innerHTML += `<div>Error fetching Wikipedia data.</div>`;
    });

  // Clear input field
  document.getElementById('user-input').value = '';
}

async function getWikipediaData(query) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&titles=${query}&origin=*`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pageId = Object.keys(data.query.pages)[0];
    return data.query.pages[pageId].extract;
  } catch (error) {
    throw new Error('Failed to fetch Wikipedia data.');
  }
}
