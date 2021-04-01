import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function hashPassword(password: string): Promise<string> {
	return new Promise(function (resolve, reject) {
		{
			bcrypt.genSalt(10, function (err, salt) {
				if (err) return reject(err);
				bcrypt.hash(password, salt, function (err, hashedPw) {
					if (err) return reject(err);
					return resolve(hashedPw);
				});
			});
		}
	});
}

export function tokenForUser({ userId }: { userId: string }) {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET);
	if (!token) {
		throw Error('problem signing token');
	}
	return token;
}

export function isTokenGood(token: string): boolean {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return !!decoded;
	} catch (e) {
		throw e && e.message;
	}
}
