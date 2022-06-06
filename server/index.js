require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
// const database = require("./api/database");
const auth = require("./routes/auth");

// const auth = require("./routes/api/auth");
// const group = require("./routes/api/group");

const port = 3003; //process.env.PORT ||

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(helmet());

// Routes
app.use("/api/auth", auth);
// app.use("/api/group", group); //verifyAccess

// app.use(express.static("client/build"));

// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
// });
app.use(
	cors({
		origin: "*",
	}),
);

//Go the SERVERs
app.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});
// }
