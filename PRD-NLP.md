# Product Requirements Document: POS Customer Feedback Sentiment Analysis

**Author:** Gemini AI
**Date:** October 15, 2025
**Version:** 1.0
**Status:** Draft

---

## 1. Introduction & Overview

This document outlines the requirements for a new "Customer Sentiment Analysis" feature within our Point of Sale (POS) system. This feature will allow business owners and managers to upload a text file containing customer feedback (e.g., from surveys, online forms, or suggestion boxes) and receive an automated sentiment analysis powered by the Google Cloud Natural Language API. The goal is to provide quick, actionable insights into customer satisfaction without manual reading and interpretation.

## 2. Problem Statement

Business owners and managers collect large amounts of text-based customer feedback but lack the time and resources to manually analyze it effectively. This leads to several problems:
* **Delayed Insights:** Critical feedback, both positive and negative, can be missed for days or weeks.
* **Subjective Interpretation:** Manual analysis can be biased and inconsistent.
* **Inability to Track Trends:** It is difficult to quantify whether overall customer sentiment is improving or declining over time.
* **High Time Cost:** Manually reading through hundreds of comments is inefficient for busy managers.

This feature will automate the process, providing objective, quantifiable data on customer sentiment.

## 3. Goals & Objectives

* To provide a simple, one-click method for analyzing bulk customer feedback.
* To present a clear, high-level summary of overall customer sentiment (Positive, Negative, Neutral).
* To offer a detailed breakdown of individual feedback comments and their specific sentiment scores.
* To reduce the time required to analyze customer feedback by at least 90%.
* To enable managers to identify and address critical negative feedback more quickly.

## 4. User Personas

* **Maria, the Restaurant Owner:** Maria owns a busy restaurant and receives dozens of feedback comments daily from her website's contact form. She needs a quick way to gauge the general mood of her customers from the previous day.
* **David, the Retail Store Manager:** David manages a team of 15 employees. He wants to analyze weekly feedback to identify common complaints (e.g., "long checkout lines," "messy aisles") and praise for specific employees.

## 5. User Stories

* **As a manager, I want to upload a single `.txt` file containing all of the week's customer feedback so that I can analyze it all at once.**
* **As a business owner, I want to see an overall sentiment score and a simple chart (Positive/Negative/Neutral) so that I can get a quick snapshot of customer satisfaction.**
* **As a manager, I want to be able to view a list of all individual comments, sorted by sentiment (most negative first), so that I can prioritize addressing critical issues.**
* **As a user, I want to receive a clear error message if I upload a file in the wrong format or if the analysis fails, so that I know what to do next.**

## 6. Functional Requirements

### 6.1. File Upload Interface
* The POS dashboard shall include a new section titled "Customer Sentiment Analysis."
* This section will feature an upload button or a drag-and-drop area.
* The system must only accept files with a `.txt` extension.
* A file size limit of 2MB will be enforced to manage API costs and processing time.
* The user interface must show a "Processing..." or similar loading state while the analysis is in progress.

### 6.2. Backend Processing & API Integration
* Upon file upload, the backend service will read the content of the text file.
* The service will make an API call to the Google Cloud Natural Language API's `analyzeSentiment` endpoint.
* The entire content of the text file will be passed as the `content` parameter in the API request.
* The system must securely store and manage the Google Cloud API service account credentials.

### 6.3. Results Dashboard
The results screen will be divided into two parts:

**A. Summary View:**
* **Overall Sentiment Score:** Displays the document-level sentiment `score` from `-1.0` to `+1.0`.
* **Overall Emotion Magnitude:** Displays the document-level sentiment `magnitude`.
* **Sentiment Breakdown:** A simple bar or pie chart showing the percentage of sentences that are categorized as Positive (score > 0.2), Negative (score < -0.2), and Neutral.

**B. Detailed View:**
* A scrollable table listing each sentence or line from the original text file.
* Each row in the table will display:
    * The original text of the sentence/comment.
    * The individual sentiment `score` for that sentence.
    * A visual indicator (e.g., a colored dot: green for positive, red for negative, gray for neutral).
* The table should be sortable by sentiment score.

## 7. Technical Implementation Details

The core logic will be encapsulated in a function that handles the file input and the API call. Below is a reference implementation in Python.

### 7.1. Prerequisites
* Google Cloud Project with the Natural Language API enabled.
* A Service Account with the "Cloud Natural Language AI User" role and its JSON key file.
* The `google-cloud-language` Python library installed (`pip install google-cloud-language`).
* The environment variable `GOOGLE_APPLICATION_CREDENTIALS` must be set to the path of the JSON key file.

### 7.2. Python Function to Call Google NLP API

```python
from google.cloud import language_v1

def analyze_sentiment_from_file(file_path: str):
    """
    Analyzes sentiment in a text file using the Google Cloud NLP API.

    Args:
      file_path: The path to the input text file.

    Returns:
      A dictionary containing the overall sentiment and a list of
      sentence-level sentiments, or None if an error occurs.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            text_content = f.read()
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return None
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

    client = language_v1.LanguageServiceClient()

    document = language_v1.Document(
        content=text_content, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    # Set the encoding type
    encoding_type = language_v1.EncodingType.UTF8

    # Call the API
    response = client.analyze_sentiment(
        request={"document": document, "encoding_type": encoding_type}
    )

    # Prepare the results
    results = {
        "overall_sentiment": {
            "score": response.document_sentiment.score,
            "magnitude": response.document_sentiment.magnitude,
        },
        "sentences": [],
    }

    for sentence in response.sentences:
        results["sentences"].append({
            "text": sentence.text.content,
            "score": sentence.sentiment.score,
            "magnitude": sentence.sentiment.magnitude,
        })
        
    return results

# --- Example Usage ---
if __name__ == '__main__':
    # Create a sample feedback file
    feedback_text = """
The new pasta dish was absolutely delicious! Best I've had in ages.
However, the waiter was quite rude and we had to wait 30 minutes for the bill.
The music was a bit too loud.
Overall, a decent experience but could be improved. I will probably come back.
    """
    with open("customer_feedback.txt", "w") as file:
        file.write(feedback_text)
    
    # Analyze the created file
    analysis_results = analyze_sentiment_from_file("customer_feedback.txt")

    if analysis_results:
        print("--- Overall Sentiment ---")
        overall = analysis_results['overall_sentiment']
        print(f"Score: {overall['score']:.2f}, Magnitude: {overall['magnitude']:.2f}\n")
        
        print("--- Sentence-level Analysis ---")
        for sentence_analysis in analysis_results['sentences']:
            print(f"  Score: {sentence_analysis['score']:>5.2f} | Text: {sentence_analysis['text'].strip()}")