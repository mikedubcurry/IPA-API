// TODO: split typedefs and resolvers into separate files
// TODO: create controllers to run in resolvers
import { gql } from 'apollo-server';
import { User } from '../model';
// import { Ipa, Brewer } from '../model';
import { typeDefs } from './typedefs';
import isEmail from 'isemail';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';

// TODO: update typeDefs to match db models
// const typeDefs = gql`
// 	type IPA {
// 		name: String
// 		description: String
// 		isAlcoholic: Boolean
// 		alcohol: Float
// 		brewer: String
// 		reviews: [ID]
// 		_id: ID
// 	}

// 	type Brewer {
// 		name: String
// 		location: String
// 		beers: [ID]
// 		reviews: [ID]
// 	}

// 	type Query {
// 		ipas: [IPA]
// 	}
// `;

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
		signup: async (_: any, { username, email, password }: SignupArgs) => {
			const validEmail = isEmail.validate(email);
			if (!validEmail) {
				return { error: email + ' is an invalid email' };
			}
			const alreadyExists = await User.findOne({ where: { email } });
			if (!alreadyExists) {
				const newUser = await User.create({
					userId: uuid.v4(),
					username,
					email,
					password,
				});
				await newUser.save();

				const token = jwt.sign({ userId: newUser.userId }, 'jwtSecret');

				return { token };
			} else {
				throw Error('user already exists');
			}
		},
		login: async (_: any, { login, password }: LoginArgs) => {
			const loginIsEmail = isEmail.validate(login);

			const whereOption = loginIsEmail ? { email: login } : { username: login };

			const user = await User.findOne({ where: whereOption });
			if (password === user?.password) {
				const token = jwt.sign({ userId: user.userId }, 'jwtSecret');
				return { token };
			} else {
				throw Error('username/email or password are incorrect');
			}
		},
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
