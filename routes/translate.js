var express = require('express');
var router = express.Router();

const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

/* POST translate. */
router.post('/', async (req, res) =>  {
   //Check if all fields are provided and are valid:
   if(!req.body.text){
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        const request = {
            input: {text: req.body.text },
            // Select the language and SSML voice gender (optional)
            //voice: {languageCode: 'en-US', name:"en-US-Wavenet-D", ssmlGender: 'MALE'},
            voice: { languageCode: 'en-US', name: req.body.voice },
            // select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
        };
    
        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request); 
    
        res.json({ data: response.audioContent.toString('base64') });
    }

});

module.exports = router;
