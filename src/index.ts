import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
config();

import { createStore } from './model';
import { typeDefs, resolvers } from './schema';
import { UserApi, BrewerApi } from './datasources/';

export const store = createStore();

store.sequelize.authenticate({ logging: false });
store.sequelize.sync({ force: true, logging: false });

export const context = async ({ req }) => {
	const token = (req.headers && req.headers.authorization) || '';
	const userId = token && jwt.verify(token, process.env.JWT_SECRET || '');

	return { user: userId };
};

export const dataSources = () => ({
	users: new UserApi({ store }),
	brewers: new BrewerApi({ store }),
	// ipas: 
});

export const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
	context,
});

server
	.listen()
	.then(({ url }) => console.log(`🚀 Your server ready at ${url}`));

export { typeDefs, resolvers, UserApi, ApolloServer };
