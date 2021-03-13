// TODO: split typedefs and resolvers into separate files
// TODO: create controllers to run in resolvers
const { gql } = require("apollo-server-express");

const { Ipa } = require("../model");

const typeDefs = gql`
    type IPA {
        name: String
        description: String
        isAlcoholic: Boolean
        alcohol: Float
        brewer: String
        _id: ID
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
