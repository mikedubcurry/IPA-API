const { gql } = require('apollo-server-express');

const typeDefs = gql`
	#IPA type
	type IPA {
		name: String
		description: String
		isAlcoholic: Boolean
		alcohol: Float
		brewer: Brewer
		_id: ID
	}

	#Brewer Type
	type Brewer {
		name: String
		location: String
		beers: [IPA]
	}
	# User
	type User {
		userId: String
		email: String
		username: String
	}

	type Token {
		token: String
	}

	type Query {
		ipas: [IPA]
	}
	type Mutation {
		signup(username: String, email: String, password: String): Token
		login(login: String, password: String): Token
	}
`;

module.exports = {typeDefs};
