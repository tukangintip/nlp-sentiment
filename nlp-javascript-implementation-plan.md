# Google NLP API Function Implementation Plan (JavaScript/Node.js)

## Overview
This document outlines the implementation plan for a JavaScript/Node.js function that integrates with Google's Natural Language Processing API to analyze text sentiment from file input.

## Implementation Details

### 1. File Structure
We'll create a single JavaScript file that exports the main function:
- `nlp-sentiment.js` - Contains the main implementation

### 2. Dependencies
We'll use standard Node.js modules and common packages:
- `fs` - For file reading operations
- `https` - For making API requests
- `axios` or `node-fetch` - For simplified HTTP requests (optional)

### 3. Function Design

#### Function Name
`analyzeSentimentFromFile`

#### Parameters
1. `filePath` (string): Path to the text file containing content to analyze
2. `apiKey` (string): Google Cloud API key for authentication

#### Return Value
- Promise that resolves to a formatted string representation of the API response

#### Error Handling
- File not found errors
- File reading errors
- Network/API call errors
- Invalid API key errors
- Empty or invalid text content
- Rate limiting from Google API

### 4. Implementation Steps

#### Step 1: File Reading Functionality
- Use `fs.readFileSync` or `fs.promises.readFile` to read text content from file
- Handle encoding (UTF-8)
- Implement proper error handling for file operations

#### Step 2: Google NLP API Integration
- Construct the API endpoint URL with the API key
- Create the request payload in the required JSON format
- Make HTTPS POST request to the Google NLP API
- Handle authentication via API key in query parameter

#### Step 3: Response Parsing and Formatting
- Parse the JSON response from Google NLP API
- Extract document sentiment (score and magnitude)
- Extract sentence-level sentiment analysis
- Format the response as a readable text output

#### Step 4: Error Handling
- Validate input parameters
- Handle file system errors
- Handle network errors
- Handle API-specific errors (invalid key, rate limiting, etc.)

### 5. API Endpoint Details

#### URL
```
https://language.googleapis.com/v1/documents:analyzeSentiment?key=API_KEY
```

#### Method
POST

#### Headers
```
Content-Type: application/json; charset=utf-8
```

#### Request Body Format
```json
{
  "document": {
    "type": "PLAIN_TEXT",
    "content": "TEXT_CONTENT_FROM_FILE"
  },
  "encodingType": "UTF8"
}
```

### 6. Expected Response Format
Based on the response sample:
```json
{
  "documentSentiment": {
    "magnitude": 0.8,
    "score": 0.8
  },
  "language": "en",
  "sentences": [
    {
      "text": {
        "content": "TEXT_OF_SENTENCE",
        "beginOffset": 0
      },
      "sentiment": {
        "magnitude": 0.8,
        "score": 0.8
      }
    }
  ]
}
```

### 7. Output Format
The function should return a formatted text string like:
```
Document Sentiment:
  Score: 0.80
  Magnitude: 0.80
  Language: en

Sentence-level Analysis:
  1. Score: 0.80 | Text: "Enjoy your vacation!"
```

### 8. Testing Approach
- Create a sample text file with customer feedback
- Call the function with the file path and a valid API key
- Verify the output format matches requirements
- Test error cases (file not found, invalid API key, etc.)