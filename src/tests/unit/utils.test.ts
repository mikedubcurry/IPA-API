import { config } from 'dotenv';
config();
import { compare } from 'bcrypt';
import { hashPassword, isTokenGood, tokenForUser } from '../../model/utils';

describe('model/utils', () => {
	it('generates a token for a user', async () => {
		const user = { userId: '1234' };
		const token = tokenForUser(user);

		expect(token).toBeTruthy();

		const valid = isTokenGood(token);
		expect(valid).toBe(true);

		const fakeToken = 'abc';
		expect(() => isTokenGood(fakeToken)).toThrowError('jwt malformed');
	});

	it('generates hashes', async () => {
		const secret = 'secret';
		const hashed = await hashPassword(secret);
		expect(hashed).toBeTruthy();
		const same = await compare('secret', hashed);
		expect(same).toBe(true);
	});
});
