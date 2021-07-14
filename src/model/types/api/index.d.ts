import { Optional } from 'sequelize';

// User
export interface UserAttributes {
	userId: string;
	username: string;
	email: string;
	role: 'ADMIN' | 'PRO' | 'BASIC';
	password: string;
}

export interface UserCreationAttributes
	extends Optional<UserAttributes, 'userId'> {}

// Ipa
export interface IpaAttributes {
	ipaId: string;
	ipaName: string;
	description: string;
	brewerId: string;
	isAlcoholic: boolean;
	alcohol?: number;
}

export interface IpaCreationAttributes
	extends Optional<IpaAttributes, 'ipaId' | 'alcohol'> {}

// Brewer
export interface BrewerAttributes {
	brewerId: string;
	brewerName: string;
	location: string;
}

export interface BrewerCreationAttributes
	extends Optional<BrewerAttributes, 'brewerId'> {}

// Review
export interface ReviewAttributes {
	revId: string;
	title: string;
	text: string;
	score: number;
	ipaId: string;
	authorId: string;
}

export interface ReviewCreationAttributes
	extends Optional<ReviewAttributes, 'revId'> {}
