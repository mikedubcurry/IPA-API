import { DataSource, DataSourceConfig } from 'apollo-datasource';
import isEmail from 'isemail';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

import { store } from '../index';
import { User } from '../model/users';
import { tokenForUser } from '../model/utils';

interface IStore {
	store: {
		User: typeof store.User;
	};
}

interface TokenResponse {
	token: string;
}

type AuthToken = {
	userId: string;
};

interface IContext {
	[key: string]: string;
}

export class UserApi extends DataSource {
	public store;
	public context;
	constructor({ store }: IStore) {
		super();
		this.store = store;
	}

	initialize(config) {
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
		const token = tokenForUser(newUser);
		return { token };
	}

	// compare password and return token
	async login(login: string, password: string): Promise<TokenResponse> {
		if (!login || !password)
			throw Error('must enter username/email and password');
		const loginIsEmail = isEmail.validate(login);

		const whereOption = loginIsEmail ? { email: login } : { username: login };
		const user = await this.store.User.findOne({ where: whereOption });
		if (user) {
			const pwMatches = await bcrypt.compare(password, user.password);

			if (!!pwMatches) {
				const token = tokenForUser(user);
				return { token };
			} else throw Error('incorrect username or password');
		} else throw Error('incorrect username or password');
	}

	async changePassword(newPassword: string, oldPassword: string) {
		const userId = this.context.user?.userId;

		if (!oldPassword || !newPassword) {
			throw Error('must enter your old password and a new password');
		}
		if (oldPassword === newPassword) {
			throw Error('must enter a new password');
		}
		// check old password matches current password
		const user = await this.store.User.findByPk(userId);
		if (!user) {
			throw Error('requested user does not exist');
		}
		let passwordsMatch = await bcrypt.compare(oldPassword, user.password);
		if (!passwordsMatch) {
			throw Error('old password and current password do not match');
		}
		// update user password
		await user.set('password', newPassword);
		await user.save();

		const token = tokenForUser(user);
		return { token };
	}
}
