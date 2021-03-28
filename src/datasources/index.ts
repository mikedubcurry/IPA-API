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
		User: User;
	};
}

interface TokenResponse {
	token: string;
}

export class UserApi extends DataSource {
	public store;
	// public context;
	constructor({ store }: IStore) {
		super();
		this.store = store;
	}

	initialize(config) {
		this.context = config.context;
	}

	async createUser(
		username: string,
		email: string,
		password: string
	): Promise<TokenResponse> {
		const invalidEmail = !isEmail.validate(email);
		if (invalidEmail) {
			throw Error('invalid email');
		}
		if(!password || !email || !username) {
			throw Error("must supply username, email, and password")
		}
		const alreadyExists = await this.store.User.findAll({
			where: { [Op.or]: [{ email }, { username }] },
		});
		if (alreadyExists.length) {
			throw Error('user already exists');
		}
		const newUser = await this.store.User.create({
			userId: uuid.v4(),
			username,
			email,
			password,
		});
		await newUser.save();

		const token = jwt.sign({ userId: newUser.userId }, 'jwtSecret');

		return { token };
	}
}
