import { Sequelize, DataTypes } from 'sequelize';
import { BrewerStatic } from '../../types/api';

export function BrewerFactory(sequelize: Sequelize): BrewerStatic {
	return <BrewerStatic>sequelize.define('brewers', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
}

// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const BrewerSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: false,
//     },
//     beers: {
//         type: [Schema.Types.ObjectId],
//         required: true,
//     },
//     reviews: {
//         type: [Schema.Types.ObjectId],
//         required: false,
//     },
// });

// const model = mongoose.model("Brewer", BrewerSchema);
// export default model;
