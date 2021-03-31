import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { execute, toPromise } from 'apollo-link';

export { toPromise };

import {
	ApolloServer,
	context as defaultContext ,
	typeDefs,
	resolvers,
	UserApi,
	store,
} from '..';

export const constructTestServer = ({ context = defaultContext  }) => {
	const userApi = new UserApi({ store });
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources: () => ({ userApi }),
		context,
	});

	return { server, userApi };
};
