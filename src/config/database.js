const sql = require("mssql/msnodesqlv8");

const config = {
    connectionString:
        "Driver={ODBC Driver 18 for SQL Server};Server=ADMIN-PC\\SQLEXPRESS;Database=rophim;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
};

const pool = new sql.ConnectionPool(config);

const poolConnect = pool.connect().catch((err) => {
    console.error("Lỗi kết nối SQL:", err);
});

pool.on("error", (err) => {
    console.error("SQL Pool Error:", err);
});

module.exports = {
    sql,
    pool,
    poolConnect,
};
