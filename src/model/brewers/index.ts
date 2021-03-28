import {
	Association,
	Model,
	HasManyGetAssociationsMixin,
	HasManyCreateAssociationMixin,
} from 'sequelize';

import { BrewerAttributes, BrewerCreationAttributes } from '../types/api';
import { Ipa } from '../ipas';

export class Brewer
	extends Model<BrewerAttributes, BrewerCreationAttributes>
	implements BrewerAttributes {
	public brewerId!: string;
	public brewerName!: string;
	public location!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getIpas!: HasManyGetAssociationsMixin<Ipa>;
	public createIpa!: HasManyCreateAssociationMixin<Ipa>;

	public readonly ipas?: Ipa[];

	public static associations: {
		ipas: Association<Brewer, Ipa>;
	};
}
