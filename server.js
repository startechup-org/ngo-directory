const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./db/index');
const { cors } = require('./utils/middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger');
const passport = require('passport')

const app = express();
db();
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

// app.get('/', async (req, res) => {
// 	res.send('NGO Directory App');
// });

app.get('/', async (req, res) => {
	res.send('NGO Directory App')
})

app.get('/fail', async (req, res) => {
	res.send('Unauthorized Google Auth')
})

app.use(passport.initialize());
app.use(passport.session());
	
/** swagger route */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** server check */
app.get('/', (req, res) => {
	res.send('NGO Directory Server is alive');
});
/*routes*/
const user = require('./routes/user.route');
const organization = require('./routes/organization.route');


/*routes*/
app.use(user);
app.use(organization);


app.listen({ port: process.env.PORT || 3000 }, () => {
	console.log('Server running at: ', process.env.PORT || 3000);
});
