// TODO: add more models like Brewers, Ciders, other types of beer...
const IpaModel = require("./ipas");
const BrewerModel = require("./brewers");
const UserModel = require("./users");
const ReviewModel = require("./reviews");

module.exports = {
    Ipa: IpaModel,
    User: UserModel,
    Brewer: BrewerModel,
    Review: ReviewModel,
};
