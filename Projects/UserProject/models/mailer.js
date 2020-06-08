const nodemailer = require('nodemailer');
const config = require('../data/mailer');

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: config.MAILGUN_USER,
		pass: config.MAILGUN_PASS
	},
	tls: {
		rejectUnauthorized: false
	}
});

// function sendEmail(from, to, subject, html) {
// 		return new Promise((resolve, reject) => {
// 			transport.sendEmail({ from, to, subject, html }, (err, info) => {
// 				if(err) reject(err);

// 				resolve(info);
// 			});
// 		});
// 	}

module.exports.sendmail = (from, to, subject, html) => {
	return new Promise((resolve, reject) => {
		transport.sendMail({ from, to, subject, html }, (err, info) => {
			if(err) reject(err);

			resolve(info);
		});
	});
};
