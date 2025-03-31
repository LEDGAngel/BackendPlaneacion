import sql from "mysql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
    
  };
  
  const sqlConnect = async() => {
    return await sql.connect(config);
  };

  export { sqlConnect, sql };