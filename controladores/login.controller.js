import {sqlConnect, sql } from "../utils/sql.js";
import crypto from "crypto";

export const login = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
    .request()
    .input("username", sql.VarChar, req.body.username)
    .query("select * from Users where username=@username");
    const salt = data.recordset[0].password.slice(0,12);
    const newMsg = salt + req.body.password;
    const hashing = crypto.createHash("sha512");
    const hash = hashing.update(newMsg).digest("base64url");
    const realpassword = salt + hash;
    let isLogin = data.recordset[0].password === realpassword;
    if(isLogin){
        res.status(200).json({ isLogin: isLogin, user: data.recordset[0]})
    } else {
        res.status(400).json({ isLogin: isLogin, user: {}});
    }
};

export const register = async(req, res) => {
    const pool = await sqlConnect()
    await pool
    .request()
    .input("name", sql.VarChar, req.body.name)
    .input("username", sql.VarChar, req.body.username)
    .input("password", sql.VarChar, req.body.password)
    .query("insert into Users (name, username, password) values (@name, @username, @password)");
    const salt = crypto.randomBytes(16).toString('base64url').slice(0, 12);
    const newMsg = salt + req.body.password;
    const hashing = crypto.createHash("sha512");
    const hash = hashing.update(newMsg).digest("base64url");
    const realpassword = salt + hash;
    const data = await pool
    .request()
    .input("username", sql.VarChar, req.body.username)
    .input("hash", sql.VarChar, realpassword)
    .query("update Users set password = @hash where username = @username");

    const data2 = await pool.request()
        .input("username", sql.VarChar, req.body.username)
        .query('SELECT * FROM users WHERE username = @username');
    res.status(200).json({operation: true, item:data2.recordset});
};   

export const putlogin = async(req, res) => {
    const salt = crypto.randomBytes(16).toString('base64url').slice(0, 12);
    const newMsg = salt + req.params.password;;
    const hashing = crypto.createHash("sha512");
    const hash = hashing.update(newMsg).digest("base64url");
    const realpassword = salt + hash;
    const pool = await sqlConnect()
    await pool
    .request()
    .input("username", sql.VarChar, req.body.username)
    .input("password", sql.VarChar, realpassword)
    .query("update Users set password = @password where username = @username");

    const data = await pool.request()
        .input("username", sql.VarChar, req.body.username)
        .query('SELECT * FROM users WHERE username = @username');
    res.status(200).json({operation: true, item:data.recordset});
};   