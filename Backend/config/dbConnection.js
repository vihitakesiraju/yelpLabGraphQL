// module.exports = sequelize;

const mysql = require("mysql2");

const dbConfig = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
};
const con = mysql.createConnection({ ...dbConfig, multipleStatements: true });

con.connect(function (err) {
  //console.log(process.env);
  if (err) throw err;
  console.log("Connected to DB!");
});

module.exports = con;
