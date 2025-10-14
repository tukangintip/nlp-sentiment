curl -X POST \
     -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
     -H "Content-Type: application/json; charset=utf-8" \
     --data "{
  'document':{
    'type':'PLAIN_TEXT',
    'content':'I love R&B music. Marvin Gaye is the best.
               \'What\'s Going On\' is one of my favorite songs.
               It was so sad when Marvin Gaye died.'
  },
  'encodingType':'UTF8'
}" "https://language.googleapis.com/v1/documents:analyzeEntitySentiment"