const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

let storedText = '';

// Store the text data in a file on the server
const storeText = async (text) => {
  try {
    await fs.writeFile('stored-text.txt', text);
    storedText = text;
    console.log(`Text stored successfully: ${storedText}`);
  } catch (error) {
    console.log(`Error storing text: ${error}`);
  }
};

// Retrieve the text data from the file on the server
const retrieveText = async () => {
  try {
    const data = await fs.readFile('stored-text.txt', 'utf-8');
    storedText = data;
    console.log(`Text retrieved successfully: ${storedText}`);
  } catch (error) {
    console.log(`Error retrieving text: ${error}`);
  }
};

// Handle POST requests to store the text data
app.post('/store-text', (req, res) => {
  const { text } = req.body;
  storeText(text);
  res.sendStatus(200);
});

// Handle GET requests to retrieve the text data
app.get('/retrieve-text', (req, res) => {
  retrieveText();
  res.json({ text: storedText });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT});
});
