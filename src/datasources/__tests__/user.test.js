import { v4 } from 'uuid';
import {  UserApi } from '..';
import { User } from '../../model/users';


export const mockStore = {
	User: {
		findOne: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn(),
	},
};

const ds = new UserApi({store: mockStore })

describe("UserApi", () => {
	it("should create a user", async () => {
		mockStore.User.create.mockResolvedValueOnce([{userId: v4(), username: 'test', email: 'test@test.com', password: 'password'}])

		const res = await ds.createUser("test", "test@test.com", "password");

		expect(res).toEqual({userId: v4(), username: 'test', email: 'test@test.com', password: 'password'})
	})
})