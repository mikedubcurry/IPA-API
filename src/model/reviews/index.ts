import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewText: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    entity: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export default mongoose.model("Review", ReviewSchema);
