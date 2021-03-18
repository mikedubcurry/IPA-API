import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    likedBeers: {
        type: [Schema.Types.ObjectId],
        required: false,
    },
    likedBrewers: {
        type: [Schema.Types.ObjectId],
        required: false,
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        required: false,
    },
});

// add pre-save hook to hash password
// add compare password logic to compare a hashed password with the hashed saved password

export default mongoose.model("User", UserSchema);
