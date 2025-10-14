/**
 * Example usage of the Google NLP Sentiment Analysis function
 * 
 * This script demonstrates how to use the analyzeSentimentFromFile function
 * with the sample data provided in the project.
 */

const { analyzeSentimentFromFile } = require('./src/google-nlp-sentiment.js');

/**
 * Main function to run the example
 */
async function runExample() {
  console.log('Google NLP Sentiment Analysis - Example Usage');
  console.log('=============================================\n');
  
  // Path to our sample feedback file
  const sampleFilePath = './test/sample-feedback.txt';
  
  console.log(`Analyzing sentiment for file: ${sampleFilePath}`);
  console.log('(Note: This example shows the function structure. To run with actual results, you need to set up Google Cloud authentication)\n');
  
  try {
    // This would work with proper Google Cloud authentication:
    // const result = await analyzeSentimentFromFile(sampleFilePath);
    
    // For demonstration, we'll show what the output format looks like:
    console.log('Expected Output Format:');
    console.log('----------------------');
    console.log('Document Sentiment:');
    console.log('  Score: 0.20');
    console.log('  Magnitude: 1.80');
    console.log('  Language: en\n');
    console.log('Sentence-level Analysis:');
    console.log('  1. Score: 0.80 | Magnitude: 0.80 | Text: "The new pasta dish was absolutely delicious! Best I\'ve had in ages."');
    console.log('  2. Score: -0.60 | Magnitude: 0.60 | Text: "However, the waiter was quite rude and we had to wait 30 minutes for the bill."');
    console.log('  3. Score: -0.20 | Magnitude: 0.20 | Text: "The music was a bit too loud."');
    console.log('  4. Score: 0.20 | Magnitude: 0.40 | Text: "Overall, a decent experience but could be improved. I will probably come back."');
    
    console.log('\nTo run this with actual results:');
    console.log('1. Set up Google Cloud authentication using one of these methods:');
    console.log('   a. Set GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to your service account key file');
    console.log('   b. Run "gcloud auth application-default login"');
    console.log('2. Run: node example-usage.js');
    
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

// Run the example
runExample();