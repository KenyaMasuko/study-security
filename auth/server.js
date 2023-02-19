const express = require("express");
const api = require("./routes/api");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use("/api", api);

app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req, res) => {
	console.log(req.body);
	res.send("アカウントを登録しました");
});

app.get("/", (req, res, next) => {
	res.end("Top Page");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
