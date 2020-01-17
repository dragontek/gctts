# Google Cloud Text-to-Speech
Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices.

# About this repository

## Getting Started
To use this code, you must obtain your own Google Cloud SDK service account key with Google Cloud Text-to-Speech API enabled.  Please see [this link](https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries) for instructions.  This document assumes you've saved this credential file to `~/.config/gcloud.json`

### Getting the code
```
# git clone https://github.com/dragontek/gctts.git
# cd gctts
```

### Running with NodeJS
To run using NodeJS, you must first define the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.  Then you can simply install the node packages and start the application.  Once it's running, you can visit the page at http://localhost:3000
```
# export GOOGLE_APPLICATION_CREDENTIALS=~/.config/gcloud.json
# npm install && npm start
```

### Running with Docker
By default, the docker image will set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to `/root/.config/gcloud.json`.  You will need to either mount your service account key to that location or override the environment variable to point to yours.

```
# docker build -t gctts .
# docker run -p 3000:3000 -v ~/.config/gcloud.json:/root/.config/gcloud.json:ro -d gctts
```

# TODO
- Transition from JADE to static HTML with jQuery (this is overkill for SPA and unnecessary for this scenario)
- Separate Locales from voice selection
- Add country flags for locales
- Better UI for voice dropdown



