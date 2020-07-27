const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./db/index');

async function server_init() {
	await db();

	const app = express();
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({}));
	/*routes*/
	const organization = require('./routes/organization.route');
	/*routes*/
	app.use(organization);
	app.listen({ port: process.env.PORT || 3000 }, () => {
		console.log('Server running at: ', process.env.PORT || 3000);
	});
}

server_init();
