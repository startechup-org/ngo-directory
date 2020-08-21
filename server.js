const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./db/index');
const { cors } = require('./utils/middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger');

const app = express();
db();
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

// app.get('/', async (req, res) => {
// 	res.send('NGO Directory App');
// });

app.get('/', async (req, res) => {
	res.render('login.ejs', {name: 'Cleo'});
});

app.set('view-engine', 'ejs')

/** swagger route */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** server check */
app.get('/', (req, res) => {
	res.send('NGO Directory Server is alive');
});
/*routes*/
const organization = require('./routes/organization.route');
const user = require('./routes/user.route');

/*routes*/
app.use(organization);
app.use(user);

app.listen({ port: process.env.PORT || 3000 }, () => {
	console.log('Server running at: ', process.env.PORT || 3000);
});
