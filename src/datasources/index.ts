import { DataSource, DataSourceConfig } from 'apollo-datasource';
import isEmail from 'isemail';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

import { store } from '../index';
import { User } from '../model/users';

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

	// create user and return auth token
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

	// compare password and return token
	async login(login: string, password: string) {
		if (!login || !password)
			throw Error('must enter username/email and password');
		const loginIsEmail = isEmail.validate(login);

		const whereOption = loginIsEmail ? { email: login } : { username: login };
		const user = await User.findOne({ where: whereOption });
		if (user) {
			const pwMatches = await bcrypt.compare(password, user.password);

			if (pwMatches) {
				const token = jwt.sign(
					{ userId: user.userId },
					process.env.JWT_SECRET || ''
				);
				return { token };
			}
		} else throw Error('incorrect username or password');
	}
}
