import { validate } from 'isemail';
import { v4 as uuidV4 } from 'uuid';
import { DataSource, DataSourceConfig } from 'apollo-datasource';

class UserApi extends DataSource {
	constructor({ store }) {
		super();
		this.store = store;
	}
	public store;
	public context;

	initialize(config) {
		this.context = config.context;
	}

	// createIfNotExists
	async createIfNotExists({
		email: emailArg,
		username: usernameArg,
		password: pwArg,
	}: { email?: string; username?: string; password?: string } = {}) {
		// validate email
		const email =
			this.context && this.context.user ? this.context.user.email : emailArg;
		if (!email || !validate(email)) return null;
		// check if user exists already
		const user = await this.store.users.findOne({ where: { email } });

		if (user) {
			throw Error('user already exists');
		} else {
			// create new user
			const newUser = await this.store.user.create({
				username: usernameArg,
				email: emailArg,
				password: pwArg,
			});
			// create singed jwt based on userId
			await newUser.save();
			// return signed jwt
		}
	}
}
