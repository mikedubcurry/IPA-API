import mongoose from "mongoose";
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
    reviews: {
        type: [Schema.Types.ObjectId],
        required: false,
    },
});
const model = mongoose.model("Ipa", IpaSchema);

export default model;
