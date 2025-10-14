# Setup Instructions for Google NLP Sentiment Analysis

This document provides step-by-step instructions for setting up and running the Google NLP Sentiment Analysis function.

## Prerequisites

1. Node.js 12 or higher installed on your system
2. Google Cloud account with billing enabled
3. Google Cloud SDK (gcloud CLI) installed (optional but recommended)

## Installation Steps

### 1. Install Node.js Dependencies

After cloning or downloading the project, you need to install the required dependencies:

```bash
npm install
```

This will install the `@google-cloud/language` package and any other dependencies specified in package.json.

### 2. Google Cloud Project Setup

1. Create a Google Cloud Project (if you don't have one already):
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. Enable the Natural Language API:
   ```bash
   gcloud services enable language.googleapis.com
   ```
   
   Or enable it through the console:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Cloud Natural Language API"
   - Click on it and press "Enable"

### 3. Authentication Setup

Choose one of these authentication methods:

#### Option A: Service Account Key (Recommended for production)

1. Create a service account:
   - In the Google Cloud Console, go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name and description
   - Grant it the "roles/cloudlanguage.user" role
   - Click "Done"

2. Create and download a key:
   - Click on your service account
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Select "JSON" key type
   - Download the key file

3. Set the environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
   ```

#### Option B: Application Default Credentials (For development)

1. Install the Google Cloud SDK if you haven't already:
   - Follow the instructions at https://cloud.google.com/sdk/docs/install

2. Run the authentication command:
   ```bash
   gcloud auth application-default login
   ```

3. Follow the prompts in your browser to complete authentication

## Testing the Setup

### 1. Verify Dependencies Installation

Run this command to check if dependencies are properly installed:
```bash
node -e "require('@google-cloud/language'); console.log('Google Cloud Language SDK is installed')"
```

### 2. Run the Test Script

After setting up authentication, run the test:
```bash
node test/test-nlp-function.js
```

### 3. Run the Command-Line Script

```bash
node run-analysis.js test/sample-feedback.txt
```

## Troubleshooting

### Common Issues

1. **Module not found error**:
   - Make sure you ran `npm install`
   - Check that package.json contains the correct dependencies

2. **Authentication errors**:
   - Verify that GOOGLE_APPLICATION_CREDENTIALS points to the correct file
   - Ensure the service account has the necessary permissions
   - Check that the Google Cloud project has the Natural Language API enabled

3. **API not enabled**:
   - Make sure you've enabled the Cloud Natural Language API in your Google Cloud project

4. **Billing not enabled**:
   - Ensure your Google Cloud project has billing enabled

### Verifying Your Setup

You can verify your Google Cloud setup with:
```bash
gcloud auth list
gcloud config list project
```

## Usage Examples

### Basic Usage in Code

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
```

### Command Line Usage

```bash
# Analyze a text file
node run-analysis.js path/to/text-file.txt
```

## Next Steps

1. Create your own text files for analysis
2. Integrate the function into your applications
3. Explore additional features of the Google Cloud Natural Language API