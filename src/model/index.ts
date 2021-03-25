import { Sequelize } from 'sequelize';

import { User } from './users';
import { Brewer } from './brewers';
import { Ipa } from './ipas';
import { Review } from './reviews';

export const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_USER_PW,
	dialect: 'postgres',
	host: 'localhost',
	port: 5432,
});

// initialize models
// set up relations
// export for use in controllers
