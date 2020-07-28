const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./db/index');
const { cors } = require('./utils/middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger');

async function server_init() {
	await db();

	const app = express();
	app.use(cors);
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({}));

	/** swagger route */
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	/*routes*/
	const organization = require('./routes/organization.route');
	const user = require('./routes/user.route');
	// const user_organization = require('./routes/user_organization.route');
	/*routes*/
	app.use(organization);
	// app.use(user_organization);
	app.use(user);

	app.listen({ port: process.env.PORT || 3000 }, () => {
		console.log('Server running at: ', process.env.PORT || 3000);
	});
}

server_init();
