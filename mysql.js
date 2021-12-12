const { bold } = require("colors")
const mysql = require("mysql")

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
})

db.connect((err) => {
    if(err) {
        throw console.warn("Couldn't Connect to MYSQL: " + err)
    }
    console.log("Connected to the MYSQL Database!")
})