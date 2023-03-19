import mysql from "mysql2/promise"

const connectMySQL = async () => {
    const pool  = await mysql.createPool({
        host: process.env.DB_MYSQL_HOST as string,
        port: process.env.DB_MYSQL_PORT as number | undefined,
        user: process.env.DB_MYSQL_USER as string,
        password: process.env.DB_MYSQL_PASSWORD as string,
        database: process.env.DB_MYSQL_DATABASE as string,
    });
    const connection = await pool.getConnection();

    return connection;
}

export default connectMySQL

