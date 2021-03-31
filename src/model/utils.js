const bcrypt = require('bcrypt');

function hashPassword(password) {
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

module.exports = { hashPassword };
