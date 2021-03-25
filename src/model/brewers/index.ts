import {
	Association,
	Model,
	HasManyGetAssociationsMixin,
	HasManyCreateAssociationMixin,
} from 'sequelize';

import { BrewerAttributes, BrewerCreationAttributes } from '../types/api';
import { Review } from '../reviews';

export class Brewer
	extends Model<BrewerAttributes, BrewerCreationAttributes>
	implements BrewerAttributes {
	public id!: number;
	public name!: string;
	public location!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getReviews!: HasManyGetAssociationsMixin<Review>;
	public createReview!: HasManyCreateAssociationMixin<Review>;

	public readonly reviews?: Review[];

	public static associations: {
		reviews: Association<Brewer, Review>;
	};
}
