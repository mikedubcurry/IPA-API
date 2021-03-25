import { Optional } from 'sequelize';

// User
export interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
}

export interface UserCreationAttributes
	extends Optional<UserAttributes, 'id'> {}

// Ipa
export interface IpaAttributes {
	id: number;
	name: string;
	description: string;
	isAlcoholic: boolean;
	alcohol?: number;
}

export interface IpaCreationAttributes extends Optional<IpaAttributes, 'id'> {}

// Brewer
export interface BrewerAttributes {
	id: number;
	name: string;
	location: string;
}

export interface BrewerCreationAttributes
	extends Optional<BrewerAttributes, 'id'> {}

// Review
export interface ReviewAttributes {
	id: number;
	title: string;
	text: string;
	score: number;
	userId: number;
}

export interface ReviewCreationAttributes
	extends Optional<ReviewAttributes, 'id'> {}
