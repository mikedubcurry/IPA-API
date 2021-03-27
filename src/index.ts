import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
config();

import { sequelize } from './model';
import { typeDefs, resolvers } from './schema';

// const store = createStore();
sequelize.authenticate({ logging: false });
sequelize.sync({ force: true, logging: false });

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server
	.listen()
	.then(({ url }) => console.log(`🚀 Your server ready at ${url}`));
