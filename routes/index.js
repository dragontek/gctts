var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: process.env.GCTTS_TITLE || 'Cloud Text-to-Speech', google_analytics: process.env.GOOGLE_ANALYTICS });
});

module.exports = router;
