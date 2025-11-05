
module.exports = {
    
    port: process.env.PORT || 8080,
    
    db: {
        database: process.env.DB_NAME || "db",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        dialect: process.env.DIALECT || "mysql",
        host: process.env.HOST || "localhost"
        
    }

}