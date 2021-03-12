const { gql } = require("apollo-server-express");

const ipas = [
    {
        name: "Mike's Juicy Drank",
        description: "A juicy ipa with notes of pineapple and evergreen.",
    },
    {
        name: "Hazy Little Thing",
        description: "A dry, hazy IPA packed full of flavor and stuff.",
    },
];

const typeDefs = gql`
    type IPA {
        name: String
        description: String
    }

    type Query {
        ipas: [IPA]
    }
`;

const resolvers = {
    Query: {
        ipas: () => ipas,
    },
};

module.exports = { typeDefs, resolvers };
