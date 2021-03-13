const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrewerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    beers: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        required: false,
    },
});

module.exports = mongoose.model("Brewer", BrewerSchema);
