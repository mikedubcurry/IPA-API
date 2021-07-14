// TODO: split resolvers into own file
// TODO: create controllers to run in resolvers
import { gql } from 'apollo-server';
import { isContext } from 'node:vm';
import { typeDefs } from './typedefs';

const resolvers = {
	Query: {
		ipas: async (_, __, ctx:{datasources: any}) => {
			const ipas = await ctx.datasources.ipas.find({});
			      ipas.forEach(async ipa => {
			          console.log(ipa)
			          // let brewer = ipa.brewer;
			          // brewer = await Brewer.findOne({_id: brewer})
			      })
			return ipas;
		},
		users: async (_, __, ctx: { dataSources }) => {
			const allUsers = await ctx.dataSources.users.allUsers();
			return allUsers;
		},
	},
	Mutation: {
		// TODO: wrap dataSource calls with try/catch and handle custom errors
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
		changeRole: async (
			_: any,
			{ userId, role }: RoleArgs,
			context: { dataSources: any }
		) => {
			const message = await context.dataSources.users.changeRole(userId, role);
			return message;
		},
		addBrewer: async (
			_: any,
			{ brewerName, location }: BrewerArgs,
			context: { dataSources: any }
		) => {
			const brewer = await context.dataSources.brewers.createBrewer(
				brewerName,
				location
			);
			return brewer;
		},
		addIpa: async (
			_: any,
			{ brewerId, ipaName, description, isAlcoholic, alcohol },
			context: { dataSources: any }
		) => {
			const ipa = await context.dataSources.brewers.createIpa(brewerId, {
				ipaName,
				description,
				isAlcoholic,
				alcohol,
			});
			return ipa;
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
interface BrewerArgs {
	brewerName: string;
	location: string;
}
interface RoleArgs {
	userId: string;
	role: 'ADMIN' | 'PRO' | 'BASIC';
}
export { typeDefs, resolvers };
