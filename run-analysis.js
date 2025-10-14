#!/usr/bin/env node

/**
 * Script to run sentiment analysis on a text file using Google NLP API
 * 
 * Usage: node run-analysis.js <file-path>
 * 
 * Authentication: This script uses Google Cloud's default authentication methods.
 * Make sure you have either:
 * 1. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to point to your service account key file, or
 * 2. Run "gcloud auth application-default login"
 */

const { analyzeSentimentFromFile } = require('./src/google-nlp-sentiment.js');

/**
 * Main function to run the sentiment analysis
 */
async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node run-analysis.js <file-path>');
    console.log('  file-path: Path to the text file to analyze');
    console.log('');
    console.log('Authentication:');
    console.log('  This script uses Google Cloud\'s default authentication methods.');
    console.log('  Make sure you have either:');
    console.log('  1. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to point to your service account key file, or');
    console.log('  2. Run "gcloud auth application-default login"');
    process.exit(1);
  }
  
  const filePath = args[0];
  
  console.log(`Analyzing sentiment for file: ${filePath}`);
  console.log('----------------------------------------');
  
  try {
    const result = await analyzeSentimentFromFile(filePath);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
if (require.main === module) {
  main();
}