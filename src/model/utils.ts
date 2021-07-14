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

type UserRole = 'ADMIN' | 'PRO' | 'BASIC';

export function tokenForUser({
	userId,
	role,
}: {
	userId: string;
	role: UserRole;
}) {
	const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
		expiresIn: 600,
	});
	if (!token) {
		throw Error('problem signing token');
	}
	return token;
}

export function getRole(token: string): UserRole {
	const decoded  = jwt.verify(
		token,
		process.env.JWT_SECRET
	) as { userId: string; role: UserRole };
	const role = decoded.role;
	if (role) {
		return role;
	}
}

export function isTokenGood(token: string): boolean {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return !!decoded;
	} catch (e) {
		throw e && e.message;
	}
}
