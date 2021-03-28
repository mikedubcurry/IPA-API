import bcrypt from 'bcrypt';

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
