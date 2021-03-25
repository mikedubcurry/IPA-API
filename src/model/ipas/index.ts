import { Sequelize, DataTypes } from 'sequelize';
import { IpaStatic } from '../../types/api';

export function IpaFactory(sequelize: Sequelize): IpaStatic {
	return <IpaStatic>sequelize.define('ipas', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isAlcoholic: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
        alcohol: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
	});
}
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// // type IPA = {
// //     name: string,
// //     description: string,
// //     isAlcoholic: boolean,
// //     alcohol: number,
// //     brewer: mongoose.Schema.Types.ObjectId,
// //     reviews?: mongoose.Schema.Types.ObjectId[],
// // }

// const IpaSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     isAlcoholic: {
//         type: Boolean,
//         default: true,
//         required: true,
//     },
//     alcohol: {
//         type: Number,
//         required: true,
//     },
//     brewer: {
//         type: Schema.Types.ObjectId,
//         required: true,
//     },
//     reviews: {
//         type: [Schema.Types.ObjectId],
//         required: false,
//     },
// });
// const model = mongoose.model("Ipa", IpaSchema);

// export default model;
