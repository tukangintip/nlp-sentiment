# Google NLP API Function Specification

## Function Overview
This document provides detailed specifications for implementing a JavaScript function that analyzes text sentiment using Google's Natural Language Processing API.

## Function Signature

### Primary Function
```javascript
async function analyzeSentimentFromFile(filePath, apiKey)
```

### Parameters
1. `filePath` (string): Path to the text file containing the content to analyze
2. `apiKey` (string): Google Cloud API key for authenticating with the NLP service

### Return Value
- Promise that resolves to a formatted string containing the sentiment analysis results

### Throws
- `Error`: For various error conditions (file not found, API errors, etc.)

## Detailed Implementation

### 1. File Reading Module

#### Function
```javascript
async function readTextFile(filePath)
```

#### Responsibilities
- Read text content from the specified file path
- Handle file encoding (UTF-8)
- Properly handle and propagate file system errors

#### Error Cases
- File not found
- Permission denied
- File is not readable
- File is empty

### 2. API Communication Module

#### Function
```javascript
async function callGoogleNLPAPI(textContent, apiKey)
```

#### Responsibilities
- Construct the proper API endpoint URL
- Build the request payload in the required format
- Make the HTTPS POST request to Google's NLP API
- Handle network errors and timeouts
- Parse the JSON response

#### API Endpoint
```
https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}
```

#### Request Payload
```json
{
  "document": {
    "type": "PLAIN_TEXT",
    "content": "ACTUAL_TEXT_CONTENT"
  },
  "encodingType": "UTF8"
}
```

### 3. Response Processing Module

#### Function
```javascript
function formatSentimentResponse(apiResponse)
```

#### Responsibilities
- Extract document-level sentiment (score and magnitude)
- Extract sentence-level sentiment analysis
- Format the information into a human-readable string
- Include language detection information

#### Output Format
```
Document Sentiment:
  Score: 0.80
  Magnitude: 0.80
  Language: en

Sentence-level Analysis:
  1. Score: 0.80 | Magnitude: 0.80 | Text: "Enjoy your vacation!"
  2. Score: -0.20 | Magnitude: 0.50 | Text: "The weather was terrible."
```

### 4. Error Handling

#### Error Types to Handle
1. **File System Errors**
   - File not found
   - Permission denied
   - File read errors

2. **API Communication Errors**
   - Network timeouts
   - Invalid API key
   - Rate limiting
   - Service unavailable

3. **Data Validation Errors**
   - Empty text content
   - Invalid parameters

#### Error Response Format
All errors should be thrown as JavaScript Error objects with descriptive messages.

### 5. Main Function Flow

```javascript
async function analyzeSentimentFromFile(filePath, apiKey) {
  try {
    // 1. Validate input parameters
    if (!filePath || !apiKey) {
      throw new Error('Both filePath and apiKey are required');
    }
    
    // 2. Read text content from file
    const textContent = await readTextFile(filePath);
    
    // 3. Validate text content
    if (!textContent.trim()) {
      throw new Error('Text file is empty or contains only whitespace');
    }
    
    // 4. Call Google NLP API
    const apiResponse = await callGoogleNLPAPI(textContent, apiKey);
    
    // 5. Format and return response
    return formatSentimentResponse(apiResponse);
    
  } catch (error) {
    // 6. Propagate errors with context
    throw new Error(`Sentiment analysis failed: ${error.message}`);
  }
}
```

## External Dependencies

### Required Node.js Modules
- `fs` (built-in): For file system operations
- `https` (built-in): For making HTTPS requests
- `querystring` (built-in): For URL encoding (if needed)

### Optional NPM Packages
- `axios`: For simplified HTTP requests
- `node-fetch`: Alternative HTTP client

## Environment Considerations

### Node.js Version
- Requires Node.js 12+ for async/await support
- Uses ES2017+ features

### Security Considerations
- API key should not be hardcoded
- Consider using environment variables for API key storage
- File paths should be validated to prevent directory traversal

## Performance Considerations

### Memory Usage
- Large files may consume significant memory when reading
- Consider streaming for very large files (future enhancement)

### Network Efficiency
- Single API call per function invocation
- Connection reuse not required for basic implementation

## Testing Requirements

### Test Cases
1. Basic functionality with valid file and API key
2. File not found error handling
3. Empty file content handling
4. Invalid API key error handling
5. Network error handling
6. Large text content processing
7. Special character handling

### Sample Test Data
Create text files with:
- Simple positive sentiment
- Mixed sentiment
- Negative sentiment
- Very long content
- Special characters and emojis

## Usage Examples

### Basic Usage
```javascript
const result = await analyzeSentimentFromFile('./reviews/customer-feedback.txt', 'YOUR_API_KEY');
console.log(result);
```

### Error Handling
```javascript
try {
  const result = await analyzeSentimentFromFile('./nonexistent.txt', 'YOUR_API_KEY');
  console.log(result);
} catch (error) {
  console.error('Analysis failed:', error.message);
}
```

## Future Enhancements

### Potential Improvements
1. Support for different document types (HTML, PDF)
2. Streaming for large files
3. Caching of results
4. Batch processing of multiple files
5. Additional NLP features (entity recognition, syntax analysis)