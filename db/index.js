const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const database_connection = process.env.MONGO_URI;

const db = async () => {
	try {
		mongoose.connect(database_connection, {
			useNewUrlParser: true,
			useUnifiedTopology: false,
			useFindAndModify: false,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	db,
};
