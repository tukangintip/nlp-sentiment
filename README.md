# Google NLP Sentiment Analysis Function

This project provides a JavaScript function to analyze text sentiment using Google's Natural Language Processing API. The function reads text content from a file and returns sentiment analysis results using the official Google Cloud SDK.

## Features

- Reads text content from a file
- Analyzes sentiment using Google NLP API with Google Cloud SDK
- Returns formatted sentiment analysis results
- Comprehensive error handling

## Prerequisites

1. Node.js 12 or higher
2. Google Cloud account with Natural Language API enabled
3. Google Cloud authentication set up (see Setup section below)

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup and Authentication

For complete setup instructions including Google Cloud project configuration and authentication, please see [SETUP.md](SETUP.md).

### Quick Authentication Setup

This function uses Google Cloud's default authentication methods. You need to set up authentication using one of these methods:

#### Option 1: Service Account Key (Recommended for production)
1. Create a service account in your Google Cloud project
2. Download the JSON key file
3. Set the environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
   ```

#### Option 2: Application Default Credentials (For development)
1. Install the Google Cloud SDK
2. Run the following command:
   ```bash
   gcloud auth application-default login
   ```

## Google Cloud Setup

1. Enable the Google Cloud Natural Language API in your Google Cloud project:
   ```bash
   gcloud services enable language.googleapis.com
   ```
2. Ensure your authenticated account has permissions for the Natural Language API

## Usage

### Basic Usage

```javascript
const { analyzeSentimentFromFile } = require('./src/google-nlp-sentiment.js');

async function example() {
  try {
    const result = await analyzeSentimentFromFile('./path/to/your/text-file.txt');
    console.log(result);
  } catch (error) {
    console.error('Analysis failed:', error.message);
  }
}

example();
```

### Using the Test Script

1. Ensure you have set up Google Cloud authentication
2. Run the test script:
   ```bash
   node test/test-nlp-function.js
   ```

### Using the Command-Line Script

```bash
node run-analysis.js path/to/your/text-file.txt
```

## Function API

### `analyzeSentimentFromFile(filePath)`

Analyzes sentiment of text content from a file using Google NLP API with Google Cloud SDK.

**Parameters:**
- `filePath` (string): Path to the text file containing content to analyze

**Returns:**
- Promise that resolves to a formatted string containing the sentiment analysis results

**Throws:**
- Error for various error conditions (file not found, API errors, etc.)

## Response Format

The function returns a formatted string like:

```
Document Sentiment:
  Score: 0.20
  Magnitude: 1.80
  Language: en

Sentence-level Analysis:
  1. Score: 0.80 | Magnitude: 0.80 | Text: "The new pasta dish was absolutely delicious! Best I've had in ages."
  2. Score: -0.60 | Magnitude: 0.60 | Text: "However, the waiter was quite rude and we had to wait 30 minutes for the bill."
  3. Score: -0.20 | Magnitude: 0.20 | Text: "The music was a bit too loud."
  4. Score: 0.20 | Magnitude: 0.40 | Text: "Overall, a decent experience but could be improved. I will probably come back."
```

## Error Handling

The function handles various error conditions:
- File not found
- Permission denied
- File read errors
- Network errors
- Authentication errors
- Empty text content
- API-specific errors

All errors are thrown as JavaScript Error objects with descriptive messages.

## Project Structure

```
.
├── src/
│   └── google-nlp-sentiment.js    # Main implementation
├── test/
│   ├── sample-feedback.txt        # Sample input file
│   └── test-nlp-function.js       # Test script
├── README.md                      # This file
├── SETUP.md                      # Detailed setup instructions
├── package.json                   # Project metadata and dependencies
├── run-analysis.js                # Command-line script
└── example-usage.js               # Example usage script
```

## Testing

To test the function:

1. Ensure you have set up Google Cloud authentication
2. Run the test:
   ```bash
   node test/test-nlp-function.js
   ```

## License

This project is licensed under the MIT License.