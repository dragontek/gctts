var express = require('express');
var router = express.Router();

router.get('/', async(req, res) => {
	// optional: add further things to check (e.g. connecting to dababase)
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};

    res.json(healthcheck);
});

module.exports=router;