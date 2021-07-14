import { DataSource, DataSourceConfig } from 'apollo-datasource';
import isEmail from 'isemail';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

import { store } from '../index';
import { tokenForUser } from '../model/utils';

class UserNotFoundError extends Error {}
class InvalidRoleError extends RangeError {}
class UserAuthError extends Error {}
class UserInputError extends Error {}

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
	public context;
	constructor({ store }) {
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
			throw new UserInputError('invalid email');
		}
		if (!password || !email || !username) {
			throw new UserInputError('must supply username, email, and password');
		}
		const alreadyExists = await this.store.User.findAll({
			where: { [Op.or]: [{ email }, { username }] },
		});
		if (alreadyExists.length) {
			throw new UserAuthError('user already exists');
		}
		const newUser = await this.store.User.create({
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
			throw new UserInputError('must enter username/email and password');
		const loginIsEmail = isEmail.validate(login);

		const whereOption = loginIsEmail ? { email: login } : { username: login };
		const user = await this.store.User.findOne({ where: whereOption });
		if (user) {
			const pwMatches = await bcrypt.compare(password, user.password);

			if (pwMatches) {
				const token = tokenForUser(user);
				return { token };
			} else throw new UserInputError('incorrect username or password');
		} else throw new UserInputError('incorrect username or password');
	}

	async allUsers() {
		const allUsers = await this.store.User.findAll();
		return allUsers;
	}

	async changeRole(userId: string, role: 'ADMIN' | 'PRO' | 'BASIC') {
		const user = this.context.user;
		if (user.role !== 'ADMIN') {
			throw new UserAuthError('unauthorized');
		}
		if (role !== 'ADMIN' && role !== 'PRO' && role !== 'BASIC') {
			throw new InvalidRoleError('invalid role');
		}
		const candidate = await this.store.User.findByPk(userId);
		if (!candidate) {
			throw new UserNotFoundError('user does not exist');
		}

		const updated = await this.store.User.update(
			{ role },
			{ where: { userId } }
		);
		if (updated[0]) return { message: 'updated' };
		else return { message: 'not updated' };
	}

	async changePassword(newPassword: string, oldPassword: string) {
		const userId = this.context.user?.userId;

		if (!oldPassword || !newPassword) {
			throw new UserInputError(
				'must enter your old password and a new password'
			);
		}
		if (oldPassword === newPassword) {
			throw new UserInputError('must enter a new password');
		}
		// check old password matches current password
		const user = await this.store.User.findByPk(userId);
		if (!user) {
			throw new UserNotFoundError('requested user does not exist');
		}
		let passwordsMatch = await bcrypt.compare(oldPassword, user.password);
		if (!passwordsMatch) {
			throw new UserAuthError('old password and current password do not match');
		}
		// update user password
		await user.set('password', newPassword);
		await user.save();

		const token = tokenForUser(user);
		return { token };
	}
}
