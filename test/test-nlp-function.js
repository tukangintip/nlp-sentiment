const { analyzeSentimentFromFile } = require('../src/google-nlp-sentiment.js');

/**
 * Test function for the Google NLP sentiment analysis
 */
async function testSentimentAnalysis() {
  try {
    // Path to the sample feedback file
    const filePath = './sample-feedback.txt';
    
    console.log('Testing Google NLP Sentiment Analysis...');
    console.log('Input file:', filePath);
    console.log('----------------------------------------');
    
    // Call the sentiment analysis function
    const result = await analyzeSentimentFromFile(filePath);
    
    console.log('Sentiment Analysis Results:');
    console.log('========================================');
    console.log(result);
    console.log('========================================');
    
  } catch (error) {
    console.error('Test failed with error:', error.message);
    
    // Provide helpful error information
    if (error.message.includes('credentials')) {
      console.log('\nPlease ensure you have set up Google Cloud authentication.');
      console.log('You can authenticate using one of these methods:');
      console.log('1. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable');
      console.log('   pointing to your service account key file');
      console.log('2. Run "gcloud auth application-default login"');
    }
  }
}

// Run the test
testSentimentAnalysis();