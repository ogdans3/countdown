const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)


// Set some defaults (required if your JSON file is empty)
db.defaults({ countdowns: [] })
  .write()

let add = function(countdown) {
	db.get("countdowns")
	  	.push(countdown)
  		.write()
}

let get = function(id) {
	return db.get("countdowns")
		.find({ id: id })
		.value();
}

module.exports = {
	add: add,
	get: get
}
