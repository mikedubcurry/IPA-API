import {
	store,
	typeDefs,
	resolvers,
	UserApi,
	context as defaultContext,
	ApolloServer,
} from '../index';

export const constructTestServer = ({ context = defaultContext } = {}) => {
	const userAPI = new UserApi({ store });

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources: () => ({ users: userAPI }),
		context,
	});

	return { server, userAPI };
};
