const express = require("express");
const api = require("./routes/api");
const https = require("https");
const fs = require("fs");
const app = express();
const port = 80;

app.use((req, res, next) => {
	if (req.secure) {
		next();
	} else {
		res.redirect(`https://${req.hostname}`);
	}
});

app.use(
	express.static("public", {
		setHeaders: (res, path, stat) => {
			res.header("X-Frame-Options", "SAMEORIGIN");
			res.header("Strict-Transport-Security", "max-age=20");
		},
	})
);

app.use("/api", api);

app.get("/", (req, res, next) => {
	res.end("Top Page");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

const httpsPort = 443;

https
	.createServer(
		{
			key: fs.readFileSync("localhost+1-key.pem"),
			cert: fs.readFileSync("localhost+1.pem"),
		},
		app
	)
	.listen(httpsPort, () => {
		console.log(`Server is running on https://localhost:${httpsPort}`);
	});
