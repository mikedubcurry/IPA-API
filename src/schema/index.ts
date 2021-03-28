// TODO: split resolvers into own file
// TODO: create controllers to run in resolvers
import { gql } from 'apollo-server';
import { typeDefs } from './typedefs';

const resolvers = {
	Query: {
		ipas: async () => {
			// const ipas = await Ipa.find({});
			//       ipas.forEach(async ipa => {
			//           console.log(ipa)
			//           let brewer = ipa.brewer;
			//           brewer = await Brewer.findOne({_id: brewer})
			//       })
			// return ipas;
		},
	},
	Mutation: {
		// TODO: extract signup logic into DataSource via apollo-datasource
		signup: async (
			_: any,
			{ username, email, password }: SignupArgs,
			{ dataSources }: Context
		) => {
			const tokenResponse = await dataSources.userApi.createUser(
				username,
				email,
				password
			);
			return tokenResponse;
			// const validEmail = isEmail.validate(email);
			// if (!validEmail) {
			// 	throw Error("invalid email")
			// }
			// const alreadyExists = await User.findAll({ where: {
			// 	[Op.or]: [{email}, {username}]
			// } });
			// if (!alreadyExists.length) {
			// 	const newUser = await User.create({
			// 		userId: uuid.v4(),
			// 		username,
			// 		email,
			// 		password,
			// 	});
			// 	await newUser.save();

			// 	const token = jwt.sign({ userId: newUser.userId }, 'jwtSecret');

			// 	return { token };
			// } else {
			// 	throw Error('user already exists');
			// }
		},
		// login: async (_: any, { login, password }: LoginArgs) => {
		// 	const loginIsEmail = isEmail.validate(login);

		// 	const whereOption = loginIsEmail ? { email: login } : { username: login };

		// 	const user = await User.findOne({ where: whereOption });
		// 	if (password === user?.password) {
		// 		const token = jwt.sign({ userId: user.userId }, 'jwtSecret');
		// 		return { token };
		// 	} else {
		// 		throw Error('username/email or password are incorrect');
		// 	}
		// },
	},
};

interface SignupArgs {
	username: string;
	email: string;
	password: string;
}

interface LoginArgs {
	login: string;
	password: string;
}

export { typeDefs, resolvers };
