// TODO: split resolvers into own file
// TODO: create controllers to run in resolvers
import { gql } from 'apollo-server';
import { isContext } from 'node:vm';
import { typeDefs } from './typedefs';

const resolvers = {
	Query: {
		ipas: async () => {
			// const ipas = await Ipa.find({});
			//       ipas.forEach(async ipa => {
			//           console.log(ipa)
			//           let brewer = ipa.brewer;
			//           brewer = await Brewer.findOne({_id: brewer})
			//       })
			// return ipas;
		},
	},
	Mutation: {
		// TODO: extract signup logic into DataSource via apollo-datasource
		signup: async (
			_: any,
			{ username, email, password }: SignupArgs,
			context: { dataSources: any }
		) => {
			const tokenResponse = await context.dataSources.users.createUser(
				username,
				email,
				password
			);
			return tokenResponse;
		},
		login: async (
			_: any,
			{ login, password }: LoginArgs,
			context: { dataSources: any }
		) => {
			const tokenResponse = await context.dataSources.users.login(
				login,
				password
			);
			return tokenResponse;
		},
		changePassword: async (
			_: any,
			{ oldPassword, newPassword }: PasswordArgs,
			context: { dataSources: any }
		) => {
			const tokenResponse = await context.dataSources.users.changePassword(
				newPassword,
				oldPassword
			);
			return tokenResponse;
		},
	},
};

interface SignupArgs {
	username: string;
	email: string;
	password: string;
}

interface LoginArgs {
	login: string;
	password: string;
}

interface PasswordArgs {
	newPassword: string;
	oldPassword: string;
}

export { typeDefs, resolvers };
