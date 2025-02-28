import {sqlConnect, sql } from "../utils/sql.js";

export const getItems = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().query("select * from Item");
    console.log(data.recordset);
    res.json(data.recordset);
};      

export const getItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().input("myId", sql.Int, req.params.id).query("select * from Item where Id = @myId");
    console.log(data.recordset);
    res.json(data.recordset);
}; 

export const postItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool
    .request()
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Float, req.body.price)
    .query("insert into Item (name, price) values (@name, @price)");
    res.status(200).json({operation: true});
};   

export const putItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool
    .request()
    input("Id", sql.Int, req.params.id)
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Float, req.body.price)
    .query("update Item set name=@name, price=@price  where Id = @Id");
    res.status(200).json({operation: true});
}; 

export const deleteItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().
    input("Id", sql.Int, req.params.id)
    .query("delete from Item where Id = @Id");
    console.log(data.recordset);
    res.json(data.recordset);
}; 
