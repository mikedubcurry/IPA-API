import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	#IPA type
	type IPA {
		ipaName: String
		description: String
		isAlcoholic: Boolean
		alcohol: Float
		brewer: Brewer
		ipaId: ID
	}

	#Brewer Type
	type Brewer {
		brewerId: String
		brewerName: String
		location: String
		beers: [IPA]
	}
	# User
	type User {
		userId: String
		email: String
		role: String
		username: String
	}

	type Token {
		token: String
	}

	type Message {
		message: String
	}

	type Query {
		ipas: [IPA]
		brewers: [Brewer]
		users: [User]
	}
	type Mutation {
		signup(username: String!, email: String!, password: String!): Token
		login(login: String!, password: String!): Token
		changePassword(newPassword: String!, oldPassword: String!): Token
		changeRole(userId: String!, role: String!): Message
		addBrewer(brewerName: String!, location: String!): Brewer
		addIpa(
			brewerId: String!
			ipaName: String!
			description: String!
			isAlcoholic: Boolean
			alcohol: Float
		): IPA
	}
`;
