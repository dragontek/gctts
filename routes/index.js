var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cloud Text-to-Speech' });
});

router.post('/', function(req, res, next) {
  const text = req.body.tts
  console.log('Translating', tts);
})

module.exports = router;
