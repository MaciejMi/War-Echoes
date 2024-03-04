const password = require('./password.json')
const mysql = require('mysql2')

const pool = mysql.createPool({ host: 'localhost', user: 'root', database: 'war_echoes', password: password.password })

module.exports = pool.promise()
