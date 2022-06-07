const sql = require("mssql");

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	port: 1433,
	extra: {
		trustServerCertificate: true,
	},
	options: { encrypt: false },
};

sql
	.connect(config)
	.then(() => {
		console.log("\x1b[33m%s\x1b[0m", "MSSQL successfully connected");
	})
	.catch((err) => {
		console.log(err);
		// ... error checks
	});

module.exports = {
	ins: async () => {
		sql
			.connect(config)
			.then((pool) => {
				// Query

				return pool.request().query("SELECT name FROM master.sys.databases");
			})
			.then((result) => {
				console.dir(result);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	isEmptyEmail: async (email) => {
		return sql
			.connect(config)
			.then((pool) => {
				// Query
				return pool
					.request()
					.input("param_email", email)
					.query(
						"SELECT [ID],[Email], [Password] FROM [test].[dbo].[user] WHERE [Email]=@param_email",
					);
			})
			.then((result) => {
				return result;
				console.dir(result);
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	},
	register: async (email, name, family, password) => {
		return sql
			.connect(config)
			.then((pool) => {
				// Query
				return pool
					.request()
					.input("param_name", name)
					.input("param_family", family)
					.input("param_password", password)
					.input("param_email", email)
					.query(
						"INSERT INTO [dbo].[user]([FirstName],[LastName],[Password],[Email]) VALUES ( @param_name,@param_family,@param_password,@param_email)",
					);
			})
			.then((result) => {
				// console.log(result);
				return result;
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	},
};
