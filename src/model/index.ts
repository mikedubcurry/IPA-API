import { Sequelize } from 'sequelize';

import { UserFactory } from './users';
import { BrewerFactory } from './brewers';
import { IpaFactory } from './ipas';

export const dbConfig = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_USER_PW,
	dialect: 'postgres',
	host: 'localhost',
	port: 5432,
});

export const User = UserFactory(dbConfig);
export const Ipa = IpaFactory(dbConfig);
export const Brewer = BrewerFactory(dbConfig);
