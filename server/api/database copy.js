require("dotenv").config();
const sql = require("mssql");

let dbConn = null;
const config = {
	user: process.env.PORT,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	port: 1433,
	extra: {
		trustServerCertificate: true,
	},
	options: { encrypt: false },
};

try {
	dbConn = new sql.ConnectionPool(config);
	console.log("\x1b[33m%s\x1b[0m", "MSSQL successfully connected");
} catch (error) {
	console.log(error);
}

module.exports = {
	/** Query the INSERT */
	show: async () => {
		dbConn
			.connect()
			.then(() => {
				let request = new sql.Request(dbConn);
				request.query("SELECT name FROM master.sys.databases").then((recordSet) => {
					console.log(recordSet.recordset);
					dbConn.close();
				});
			})
			.catch((e) => {
				console.log(e);
				dbConn.close();
			});

		// const InsertSearchQuery = `INSERT INTO public.activity(access_name, postcode, utc_date_updated) values($1, $2, NOW());`;
		// const InsertSearch = await client.query(InsertSearchQuery, [accessName, postcode])
		// return InsertSearch
	},
};
