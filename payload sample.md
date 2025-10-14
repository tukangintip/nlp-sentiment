curl -X POST \
     -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
     -H "Content-Type: application/json; charset=utf-8" \
     --data "{
  'encodingType': 'UTF8',
  'document': {
    'type': 'PLAIN_TEXT',
    'content': 'Enjoy your vacation!'
  }
}" "https://language.googleapis.com/v2/documents:analyzeSentiment"