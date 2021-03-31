// TODO: split resolvers into own file
// TODO: create controllers to run in resolvers
const { gql } = require('apollo-server');
const { typeDefs } = require('./typedefs');

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
		signup: async (_, { username, email, password }, context) => {
			const tokenResponse = await context.dataSources.users.createUser(
				username,
				email,
				password
			);
			return tokenResponse;
		},
		login: async (_, { login, password }, context) => {
			const tokenResponse = await context.dataSources.users.login(
				login,
				password
			);
			return tokenResponse;
		},
	},
};

module.exports = { typeDefs, resolvers };
