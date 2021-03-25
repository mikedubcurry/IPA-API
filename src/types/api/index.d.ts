import { BuildOptions, Model } from 'sequelize';

// User
export interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): UserModel;
};

// Ipa
export interface IpaAttributes {
	id: number;
	name: string;
	isAlcoholic: boolean;
	alcohol?: number;
}

export interface IpaModel extends Model<IpaAttributes>, IpaAttributes {}

export class Ipa extends Model<IpaModel, IpaAttributes> {}

export type IpaStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): IpaModel;
};

// Brewer
export interface BrewerAttributes {
	id: number;
	name: string;
	location: string;
}

export interface BrewerModel
	extends Model<BrewerAttributes>,
		BrewerAttributes {}

export class Brewer extends Model<BrewerModel, BrewerAttributes> {}

export type BrewerStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): BrewerModel;
};
