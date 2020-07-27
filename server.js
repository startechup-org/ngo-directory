const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./db/index');
const { cors } = require('./utils/middleware');
async function server_init() {
	await db();

	const app = express();
	app.use(cors);
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({}));
	/*routes*/
	const organization = require('./routes/organization.route');
	const user = require('./routes/user.route');
	/*routes*/
	app.use(organization);
	app.use(user);

	app.listen({ port: process.env.PORT || 3000 }, () => {
		console.log('Server running at: ', process.env.PORT || 3000);
	});
}

server_init();
