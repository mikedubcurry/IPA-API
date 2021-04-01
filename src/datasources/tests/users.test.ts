export const mockStore = {
	User: {
		findAll: jest.fn(),
		create: jest.fn(),
		findOne: jest.fn(),
		findByPk: jest.fn(),
	},
};

describe('UserApi', () => {
	it('has a test', async () => {
		expect(true).toBe(true);
	});
});
