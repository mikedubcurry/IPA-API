const { config } = require('dotenv');
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
config();

const { createStore } = require('./model');
const { typeDefs, resolvers } = require('./schema');
const { UserApi } = require('./datasources/user');

const store = createStore();

store.sequelize.authenticate({ logging: false });
store.sequelize.sync({ force: true, logging: false });

const context = async ({ req }) => {
	const token = (req.headers && req.headers.authorization) || '';
	const userId = token && jwt.verify(token, process.env.JWT_SECRET || '');

	return { user: userId };
};

const dataSources = () => ({
	users: new UserApi({ store }),
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
	context,
});

server
	.listen()
	.then(({ url }) => console.log(`🚀 Your server ready at ${url}`));
