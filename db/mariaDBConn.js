const mariadb = require('mariadb'); 
const vals = require('./consts.js'); 
const pool = mariadb.createPool({ host: vals.DBHost, port:vals.DBPort, user: vals.DBUser, password: vals.DBPass, connectionLimit: 5 }); 

async function GetUserList(){ 
    let conn, rows; 
    try{ 
        conn = await pool.getConnection(); 
        conn.query('USE nodejs_db'); 
        rows = await conn.query('SELECT * FROM users'); 
    } 
    catch(err){ 
        throw err; 
    } 
    finally{ 
        if (conn) conn.end(); 
        return rows; 
    }
} 
module.exports = { 
    getUserList: GetUserList 
}
