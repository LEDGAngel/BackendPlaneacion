import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    },
    driver: "msnodesqlv8", // Required if using Windows Authentication
  };
  
  const sqlConnect = async() => {
    return await sql.connect(config);
  };

  export { sqlConnect, sql };