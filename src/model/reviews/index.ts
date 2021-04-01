import {
	Association,
	HasOneGetAssociationMixin,
	Model,
} from 'sequelize';

import { Ipa } from '../ipas';
import { ReviewAttributes, ReviewCreationAttributes } from '../types/api';

export class Review
	extends Model<ReviewAttributes, ReviewCreationAttributes>
	implements ReviewAttributes {
	public revId!: string;
	public title!: string;
	public text!: string;
	public score!: number;
	public authorId!: string;
	public ipaId!: string;

	public getIpa!: HasOneGetAssociationMixin<Ipa>;

	public readonly ipa?: Ipa;

	public static associations: {
		ipa: Association<Review, Ipa>;
	};}
