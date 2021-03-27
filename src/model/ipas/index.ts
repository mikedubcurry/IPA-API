import {
	Model,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	Association,
} from 'sequelize';

import { IpaAttributes, IpaCreationAttributes } from '../types/api';
import { Review } from '../reviews';

export class Ipa extends Model<IpaAttributes, IpaCreationAttributes> {
	public ipaId!: string;
	public ipaName!: string;
	public ipaDescription!: string;
	public isAlcoholic!: boolean;
	public alcohol?: number;
	public brewerId!: string;
	public createdAt!: Date;
	public updatedAt!: Date;

	public getReviews!: HasManyGetAssociationsMixin<Review>;
	public createReview!: HasManyCreateAssociationMixin<Review>;

	public readonly reviews?: Review[];

	public static associations: {
		reviews: Association<Ipa, Review>;
	};
}