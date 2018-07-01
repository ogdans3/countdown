const path = require("path");

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const uuidv4 = require('uuid/v4');

let countdowns = {};

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 


app.post("/countdown/new", (req, res) => {
	console.log(req.body);

	let id = uuidv4();

	let date = req.body.date;
	let time = req.body.time;
	let title = req.body.title;
	let description = req.body.description;

	let countdown = {
		datetime: date + " " + time,
		title: title,
		description: description
	}
	countdowns[id] = countdown;
	console.log("ID: " + id);
	res.redirect("/" + id);
})

app.get("/countdown.js", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend/countdown.js"));
})

app.get("/countdown.css", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend/countdown.css"));
})

app.get("/datetime.js", (req, res) => {
	let urlParts = req.header("Referer").split("/")
	let id = urlParts[urlParts.length - 1];

	res.send("var countdown = " + JSON.stringify(countdowns[id]));
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "frontend/index.html")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend/frontend.html"));
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))