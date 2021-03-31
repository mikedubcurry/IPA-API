const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UserApi extends DataSource {
	constructor({ store }) {
		super();
		this.store = store;
	}

	// create user and return auth token
	async createUser(username, email, password) {
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
	async login(login, password) {
		if (!login || !password)
			throw Error('must enter username/email and password');
		const loginIsEmail = isEmail.validate(login);

		const whereOption = loginIsEmail ? { email: login } : { username: login };
		const user = await this.store.User.findOne({ where: whereOption });
		if (!user) {
			throw Error('incorrect username or password');
		}
		const pwMatches = await bcrypt.compare(password, user.password);

		if (!pwMatches) {
			throw Error('incorrect username or password');
		}
		const token = jwt.sign(
			{ userId: user.userId },
			process.env.JWT_SECRET || ''
		);

		return { token };
	}
}

module.exports = { UserApi };
