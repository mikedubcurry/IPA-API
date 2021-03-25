import {
	Model,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	Association,
} from 'sequelize';

import { IpaAttributes, IpaCreationAttributes } from '../types/api';
import { Review } from '../reviews';

export class Ipa
	extends Model<IpaAttributes, IpaCreationAttributes>
	implements IpaAttributes {
	public id!: number;
	public name!: string;
	public description!: string;
	public isAlcoholic!: boolean;
	public alcohol?: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getReviews!: HasManyGetAssociationsMixin<Review>;
	public createReview!: HasManyCreateAssociationMixin<Review>;

	public readonly reviews?: Review[];

	public static associations: {
		reviews: Association<Ipa, Review>;
	};
}
