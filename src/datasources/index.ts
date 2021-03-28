import { DataSource, DataSourceConfig } from 'apollo-datasource';
import isEmail from 'isemail';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { store } from '../index';

interface IStore {
	store: {
		User: typeof store.User;
	};
}

interface TokenResponse {
	token: string;
}

interface IContext {
	[key: string]: string;
}

export class UserApi extends DataSource {
	public store;
	public context!: IContext;
	constructor({ store }: IStore) {
		super();
		this.store = store;
	}

	initialize(config: DataSourceConfig<IContext>) {
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
		if (!password || !email || !username) {
			throw Error('must supply username, email, and password');
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

		const token = jwt.sign(
			{ userId: newUser.userId },
			process.env.JWT_SECRET || '' 
		);

		return { token };
	}
}
