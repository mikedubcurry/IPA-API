const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IpaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isAlcoholic: {
        type: Boolean,
        default: true,
        required: true,
    },
    alcohol: {
        type: Number,
        required: true,
    },
    brewer: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Ipa", IpaSchema);
