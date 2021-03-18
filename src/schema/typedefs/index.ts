import { gql } from "apollo-server-express";

const typeDefs = gql`
    "IPA type"
    type IPA {
        name: String
        description: String
        isAlcoholic: Boolean
        alcohol: Float
        brewer: String
        reviews: [ID]
        _id: ID
    }
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
