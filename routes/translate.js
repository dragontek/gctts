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

        let request = {
            input: {  },
            // Select the language and SSML voice gender (optional)
            //voice: {languageCode: 'en-US', name:"en-US-Wavenet-D", ssmlGender: 'MALE'},
            voice: { languageCode: req.body.language, name: req.body.voice },
            // select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' },
        };
        if(req.body.ssml == "true") {
            request.input.ssml = req.body.text;
        } else {
            request.input.text = req.body.text;
        }
        //console.log(request);
        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request); 
        //res.json(response)
        res.json({ data: response.audioContent.toString('base64') });
    }

});


router.post('/voices', async(req, res) => {
    const [result] = await client.listVoices({ languageCode: req.body.language });
    res.json(result);
});

// OBSOLETE: I decided to put these straight into html to avoid additional ajax call
router.get('/languages', async(req, res) => {
    res.json([
        { value: "ar-XA", label: "Arabic" },
        { value: "cs-CZ", label: "Czech (Czech Republic)" },
        { value: "da-DK", label: "Danish (Denmark)" },
        { value: "nl-NK", label: "Dutch (Netherlands)" },
        { value: "en-AU", label: "English (Australia)" },
        { value: "en-IN", label: "English (India)" },
        { value: "en-GB", label: "English (UK)" },
        { value: "en-US", label: "English (US)" },
        { value: "fil-PH", label: "Filipino (Philippines)" },
        { value: "fi-FI", label: "Finnish (Finland)" },
        { value: "fr-CA", label: "French (Canada)" },
        { value: "fr-FR", label: "French (France)" },
        { value: "de-DE", label: "German (Germany)" },
        { value: "el-GR", label: "Greek (Greece)" },
        { value: "hi-IN", label: "Hindi (India)" },
        { value: "hu-HU", label: "Hungarian (Hungary)" },
        { value: "id-ID", label: "Indonesian (Indonesia)" },
        { value: "it-IT", label: "Italian (Italy)" },
        { value: "ja-JP", label: "Japanese (Japan)" },
        { value: "ko-KR", label: "Korean (South Korea)" },
        { value: "cmn-CN", label: "Mandarin Chinese" },
        { value: "nb-NO", label: "Norwegian (Norway)" },
        { value: "pl-PL", label: "Polish (Poland)" },
        { value: "pt-BR", label: "Portuguese (Brazil)" },
        { value: "pt-PT", label: "Portuguese (Portugal)" },
        { value: "ru-RU", label: "Russian (Russia)" },
        { value: "sk-SK", label: "Slovak (Slovakia)" },
        { value: "es-ES", label: "Spanish (Spain)" },
        { value: "sv-SE", label: "Swedish (Sweden)" },
        { value: "tr-TR", label: "Turkish (Turkey)" },
        { value: "uk-UA", label: "Ukrainian (Ukraine)" },
        { value: "vi-VN", label: "Vietnamese (Vietnam)" }
    ])
})
module.exports = router;
