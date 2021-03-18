import mongoose from "mongoose";
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

const model = mongoose.model("Brewer", BrewerSchema);
export default model;
