const express = require("express");
const api = require("./routes/api");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/api", api);

app.get("/", (req, res, next) => {
	res.end("Top Page");
});

app.get("/csp", (req, res) => {
	res.header("Content-Security-Policy", "script-src 'self'");
	res.render("csp");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
