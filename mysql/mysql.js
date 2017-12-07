import * as mysql from 'mysql';

const connection = mysql.createConnection({
	host: "localhost",
	port: '3306',
	user: "root",
	password: "Pm012495+",
	database: "world"
});

export default connection;