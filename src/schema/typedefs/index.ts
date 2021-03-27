import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
	}

	#get all ipas and their brewers
	#used for searching thru beers manually
	# type getIPAs {
	#     name
	#     description
	#     isAlcoholic
	#     alocohol
	#     _id
	#     brewer {
	#         name
	#         _id
	#     }
	# }

	#gets all brewers with the beers they make
	#used to discover different brewers
	# type getBrewers {
	#     name
	#     location
	#     beers {
	#         name
	#         description
	#         alcohol
	#     }
	# }
`;

/**
 * `
 *  Query getIPAs {
 *      name
 *      description
 *      isAlcoholic
 *      alocohol
 *      _id
 *      brewer {
 *          name
 *          _id
 *      }
 *      reviews {
 *          reviewText
 *          score
 *          author {
 *              username
 *          }
 *      }
 *  }
 *
 *  Query getBrewers {
 *      name
 *      location
 *      beers {
 *          name
 *          description
 *          alcohol
 *      }
 *      reviews {
 *          reviewText
 *          score
 *          author {
 *              username
 *          }
 *      }
 *  }
 *
 *
 * `
 */
