import { DataTypes, Sequelize } from 'sequelize';

import { User } from './users';
import { Brewer } from './brewers';
import { Ipa } from './ipas';
import { Review } from './reviews';

// export function createStore() {
const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_USER_PW,
	dialect: 'postgres',
	host: 'localhost',
	port: 5432,
});

// initialize models
User.init(
	{
		userId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
	}
);

Ipa.init(
	{
		ipaId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		ipaName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isAlcoholic: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		brewerId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		alcohol: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: 'ipas',
	}
);

Brewer.init(
	{
		brewerId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		brewerName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, tableName: 'brewers' }
);

Review.init(
	{
		revId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		authorId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		ipaId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	},
	{ sequelize, tableName: 'reviews' }
);
// set up relations
User.hasMany(Review, {
	sourceKey: 'userId',
	foreignKey: 'authorId',
	as: 'reviews',
});
Review.belongsTo(User, { foreignKey: 'userId' });

Ipa.hasMany(Review, {
	sourceKey: 'ipaId',
	foreignKey: 'revId',
});
Review.belongsTo(Ipa, { foreignKey: 'ipaId' });

Brewer.hasMany(Ipa, {
	sourceKey: 'brewerId',
	foreignKey: 'ipaId',
});
Ipa.belongsTo(Brewer, { foreignKey: 'brewerId' });



export { User, Review, Ipa, Brewer, sequelize };
// }
