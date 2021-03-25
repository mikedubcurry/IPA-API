import {
	Model,
	Association,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
} from 'sequelize';

import { Review } from '../reviews';
import { UserAttributes, UserCreationAttributes } from '../types/api';

export class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	public id!: number;
	public name!: string;
	public email!: string;
	public password!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getReviews!: HasManyGetAssociationsMixin<Review>;
	public createReview!: HasManyCreateAssociationMixin<Review>;

	public readonly reviews?: Review[];

	public static associations: {
		reviews: Association<User, Review>;
	};
}
