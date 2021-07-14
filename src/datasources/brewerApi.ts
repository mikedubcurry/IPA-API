import { DataSource, DataSourceConfig } from 'apollo-datasource';

import { store } from '../index';
import { Brewer } from '../model/brewers';

class BrewerInputError extends Error {}
class IpaCreationError extends Error {}

export class BrewerApi extends DataSource {
	public store: { Brewer: typeof Brewer };
	public context;
	constructor({ store }) {
		super();
		this.store = store;
	}
	initialize(config) {
		this.context = config.context;
	}

	async createBrewer(brewerName: string, location: string) {
		if (!brewerName || !location) {
			throw new BrewerInputError('must include name and location');
		}
		const alreadyExists = await this.store.Brewer.findOne({
			where: { brewerName },
		});

		if (alreadyExists) {
			throw new BrewerInputError('brewer already exists');
		}
		const brewer = await this.store.Brewer.create({ brewerName, location });
		await brewer.save();

		return {
			brewerName: brewer.getDataValue('brewerName'),
			location: brewer.getDataValue('location'),
			brewerId: brewer.getDataValue('brewerId'),
		};
	}
	
	async createIpa(
		brewerId: string,
		ipaData: {
			ipaName: string;
			description: string;
			isAlcoholic: boolean;
			alcohol?: number;
		}
	) {
		// get brewer by Id
		if (!brewerId) {
			throw new IpaCreationError('ipa must have a brewer');
		}
		const brewer = await this.store.Brewer.findByPk(brewerId);
		// use createIpa method on brewer instance
		const ipa = await brewer.createIpa({
			ipaName: ipaData.ipaName,
			description: ipaData.description,
			isAlcoholic: ipaData.isAlcoholic,
			alcohol: ipaData.alcohol,
			brewerId
		});
		ipa.save();
		return ipa.dataValues
	}
}
