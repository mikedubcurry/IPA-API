import {
	Model,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
} from 'sequelize';

import { ReviewAttributes, ReviewCreationAttributes } from '../types/api';

export class Review
	extends Model<ReviewAttributes, ReviewCreationAttributes>
	implements ReviewAttributes {
	public id!: number;
	public title!: string;
	public text!: string;
	public score!: number;
	public userId!: number;

	public getReviews!: HasManyGetAssociationsMixin<Review>;
	public createReview!: HasManyCreateAssociationMixin<Review>;
}
