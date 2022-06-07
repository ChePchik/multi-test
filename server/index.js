require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(helmet());

// Routes
app.use("/api/auth", auth);

// app.use(express.static("client/build"));

// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
// });
app.options("*", cors());
app.use(
	cors({
		origin: ["http://localhost:3003/", "http://localhost:3000/"],
	}),
);

//Go the SERVERs
app.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});
