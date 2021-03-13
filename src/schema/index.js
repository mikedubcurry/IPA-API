// TODO: split typedefs and resolvers into separate files
// TODO: create controllers to run in resolvers
const { gql } = require("apollo-server-express");

const { Ipa } = require("../model");

// TODO: update typeDefs to match db models
const typeDefs = gql`
    type IPA {
        name: String
        description: String
        isAlcoholic: Boolean
        alcohol: Float
        brewer: String
        reviews: [ID]
        _id: ID
    }

    type Brewer {
        name: String
        location: String
        beers: [ID]
        reviews: [ID]
    }

    type Query {
        ipas: [IPA]
    }
`;

const resolvers = {
    Query: {
        ipas: async () => {
            const ipas = await Ipa.find({});
            return ipas;
        },
    },
};

module.exports = { typeDefs, resolvers };
