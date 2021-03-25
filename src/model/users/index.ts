import { Sequelize, DataTypes } from 'sequelize';
import { UserStatic } from '../../types/api/';

export function UserFactory(sequelize: Sequelize): UserStatic {
	return <UserStatic>sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});
}
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     likedBeers: {
//         type: [Schema.Types.ObjectId],
//         required: false,
//     },
//     likedBrewers: {
//         type: [Schema.Types.ObjectId],
//         required: false,
//     },
//     reviews: {
//         type: [Schema.Types.ObjectId],
//         required: false,
//     },
// });

// // add pre-save hook to hash password
// // add compare password logic to compare a hashed password with the hashed saved password

// export default mongoose.model("User", UserSchema);
