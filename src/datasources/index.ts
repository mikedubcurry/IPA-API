import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { User } from '../model';
import isEmail from 'isemail';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Model } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from '../model/types/api';

interface IStore {
	store: {
		user: User;
	};
}

class UserApi extends DataSource {
	public store;
	public context;
	constructor({ store }: IStore) {
		super();
		this.store = store;
	}

	initialize(config) {
		this.context = config.context;
	}
	
}
