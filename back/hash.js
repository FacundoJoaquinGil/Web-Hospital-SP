const bcrypt = require("bcryptjs")

const hash = bcrypt.hashSync("1234", 10);
console.log(hash);
