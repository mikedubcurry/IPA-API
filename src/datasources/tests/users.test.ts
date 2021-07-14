import { isTokenGood } from '../../model/utils';
import { UserApi } from '../userApi';

export const mockStore = {
	User: {
		findAll: jest.fn(() => []),
		create: jest.fn(),
		findOne: jest.fn(),
		findByPk: jest.fn(),
	},
};

const ds = new UserApi({ store: mockStore });
ds.initialize(() => {
	return {
		user: { userId: '44b08165-0f36-4fac-9ba2-0c4aa9b90e75', iat: 1616947718 },
	};
});
// beforeAll(() => {
// ds.
// })
describe('UserApi', () => {
	it('rejects with an invalid email', async () => {
			const user = await ds.createUser('test', 'testcom', 'secret').catch(err => {
				expect(err).rejects
			});
	});
});
