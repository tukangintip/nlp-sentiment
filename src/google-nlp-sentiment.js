const fs = require('fs').promises;

// Try to load the Google Cloud Language SDK
let language;
try {
  language = require('@google-cloud/language');
} catch (error) {
  throw new Error(
    'Google Cloud Language SDK not found. Please run "npm install" to install dependencies.\n' +
    'Error details: ' + error.message
  );
}

/**
 * Reads text content from a file
 * @param {string} filePath - Path to the text file
 * @returns {Promise<string>} - Promise resolving to the text content
 */
async function readTextFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    } else if (error.code === 'EACCES') {
      throw new Error(`Permission denied reading file: ${filePath}`);
    } else {
      throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
  }
}

/**
 * Calls Google NLP API to analyze sentiment using Google Cloud SDK
 * @param {string} textContent - Text content to analyze
 * @returns {Promise<Object>} - Promise resolving to the API response
 */
async function callGoogleNLPSentimentAPI(textContent) {
  try {
    // Creates a client
    const client = new language.LanguageServiceClient();

    // Prepares a document, representing the text to analyze
    const document = {
      content: textContent,
      type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the document
    const [result] = await client.analyzeSentiment({
      document: document,
      encodingType: 'UTF8'
    });
    
    return result;
  } catch (error) {
    // Handle authentication errors specifically
    if (error.message.includes('authentication') || error.message.includes('credentials')) {
      throw new Error(
        'Google Cloud authentication failed. Please ensure you have set up authentication:\n' +
        '1. Set GOOGLE_APPLICATION_CREDENTIALS environment variable to your service account key file, or\n' +
        '2. Run "gcloud auth application-default login"\n' +
        'Error details: ' + error.message
      );
    }
    
    // Handle API-specific errors
    if (error.message.includes('API has not been used')) {
      throw new Error(
        'Google Cloud Natural Language API is not enabled. Please enable it in your Google Cloud project.\n' +
        'You can enable it with: gcloud services enable language.googleapis.com\n' +
        'Error details: ' + error.message
      );
    }
    
    // Handle billing errors
    if (error.message.includes('billing')) {
      throw new Error(
        'Google Cloud billing is not enabled for your project. Please enable billing to use the API.\n' +
        'Error details: ' + error.message
      );
    }
    
    // Re-throw other errors
    throw new Error(`Google NLP API call failed: ${error.message}`);
  }
}

/**
 * Formats the sentiment analysis response into a readable string
 * @param {Object} apiResponse - The raw API response
 * @returns {string} - Formatted response string
 */
function formatSentimentResponse(apiResponse) {
  const docSentiment = apiResponse.documentSentiment;
  const language = apiResponse.language;
  const sentences = apiResponse.sentences || [];

  let output = 'Document Sentiment:\n';
  output += `  Score: ${docSentiment.score.toFixed(2)}\n`;
  output += `  Magnitude: ${docSentiment.magnitude.toFixed(2)}\n`;
  output += `  Language: ${language}\n\n`;

  if (sentences.length > 0) {
    output += 'Sentence-level Analysis:\n';
    sentences.forEach((sentence, index) => {
      const sentSentiment = sentence.sentiment;
      const sentenceText = sentence.text.content;
      output += `  ${index + 1}. Score: ${sentSentiment.score.toFixed(2)} | `;
      output += `Magnitude: ${sentSentiment.magnitude.toFixed(2)} | `;
      output += `Text: "${sentenceText}"\n`;
    });
  }

  return output;
}

/**
 * Analyzes sentiment of text content from a file using Google NLP API with Google Cloud SDK
 * @param {string} filePath - Path to the text file containing content to analyze
 * @returns {Promise<string>} - Promise resolving to formatted sentiment analysis results
 */
async function analyzeSentimentFromFile(filePath) {
  try {
    // 1. Validate input parameter
    if (!filePath) {
      throw new Error('File path is required');
    }
    
    // 2. Read text content from file
    const textContent = await readTextFile(filePath);
    
    // 3. Validate text content
    if (!textContent.trim()) {
      throw new Error('Text file is empty or contains only whitespace');
    }
    
    // 4. Call Google NLP API
    const apiResponse = await callGoogleNLPSentimentAPI(textContent);
    
    // 5. Format and return response
    return formatSentimentResponse(apiResponse);
    
  } catch (error) {
    // 6. Propagate errors with context
    throw new Error(`Sentiment analysis failed: ${error.message}`);
  }
}

module.exports = {
  analyzeSentimentFromFile,
  readTextFile,
  callGoogleNLPSentimentAPI,
  formatSentimentResponse
};