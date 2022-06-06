require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = express.Router();
const keys = process.env.secretOrKey;
const database = require("../api/database");
const isEmpty = require("is-empty");

//  * @route POST api/auth/hello
router.get("/register", async (req, res) => {
	const { FirstName, LastName, Email, Password } = req.body;

	if (isEmpty(FirstName) || isEmpty(LastName) || isEmpty(Email) || isEmpty(Password))
		return res.status(404).json({
			success: false,
			error: "Данные не заполнены",
		});

	await database
		.isEmptyEmail(Email)
		.then((result) => {
			if (!isEmpty(result.recordsets[0][0])) {
				res.status(404).json({
					success: false,
					error: "email уже есть",
				});
			}
			const hash = crypto.pbkdf2Sync(Password, "10", 10, 20, "sha512").toString("hex");

			database
				.register(Email, FirstName, LastName, hash)
				.then((result) => {
					res.status(200).json({
						success: true,
						// error: result,
					});
				})
				.catch((error) =>
					res.status(404).json({
						success: false,
						error: error.message,
					}),
				);
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			}),
		);
});

//  * @route POST api/auth/login
router.get("/login", async (req, res) => {
	const { Email, Password } = req.body;

	if (isEmpty(Email) || isEmpty(Password))
		return res.status(401).json({
			success: false,
			error: "Данные не заполнены",
		});

	await database
		.isEmptyEmail(Email)
		.then((result) => {
			if (isEmpty(result.recordsets[0][0])) {
				res.status(404).json({
					success: false,
					error: "email не найден",
				});
			}
			const hash = crypto.pbkdf2Sync(Password, "10", 10, 20, "sha512").toString("hex");

			if (hash === result.recordset[0].Password) {
				const payload = {
					id: result.recordset[0].ID,
					email: result.recordset[0].Email,
				};
				jwt.sign(
					payload,
					keys,
					{
						expiresIn: 604800, // 1 неделя
						// 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							// message: "Пользователь создан",
							token: token,
						});
					},
				);
			} else {
				return res.status(400).json({ error: "пароль неверный" });
			}
		})
		.catch((error) =>
			res.status(404).json({
				success: false,
				error: error.message,
			}),
		);
});

module.exports = router;
