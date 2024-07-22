const db = require("../db");
const {NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** Functions for shoppingLists */

class ShoppingList{
    /** Create a list (from data), update db, return new list data
     * 
     * data should be {id, startDate, endDate, username}
     * 
     * Returns {id, startDate, endDate, username}
     */

     static async create(data){
        const res = await db.query(
            `INSERT INTO lists (id,
                                start_date,
                                end_date,
                                username)
             VALUES ($1, $2, $3, $4)
             RETURNING id, start_date AS "startDate", end_date AS "endDate", username`,
             [
                data.id,
                data.startDate,
                data.endDate,
                data.username
             ]);
        let list = res.rows[0];

        return list;
     }

     /** Find all lists 
      * 
      * Returns [{id,startDate,endDate,username}]
     */

     static async findAll(){  
        const res =  `SELECT l.id,
                             l.start_date AS "startDate",
                             l.end_date AS "endDate",
                             l.username,
                             u.username
                     FROM lists l
                     LEFT JOIN users AS u ON u.username = l.username`;

        res += "ORDER BY id";
        const listRes = await db.query(res);
        return listRes.rows;
                            
     }

     /** Given a list id, return data about the list
      * 
      * Returns {id,startDate,endDate,username}
      *     where username is {username, firstName,lastName, email, isAdmin}
      * 
      * Throws NotFoundError if not found
      */

     static async get(id){
        const listRes = await db.query(
            `SELECT id,
                    start_date AS "startDate",
                    end_date AS "endDate",
                    username
             FROM lists
             WHERE id = $1`,[id]);

        const list = listRes.rows[0];

        if(!list) throw new NotFoundError(`No list found: ${id}`);

        const usersRes = await db.query(
            `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_admin AS "isAdmin"
                    FROM users
                    WHERE user = $1`, [list.username]);
        delete list.username;
        list.user = usersRes.rows[0];

        return list;
     }

     /** Update list data with `data`
      * 
      * This is a "partial update" --- This only changes provided ones
      * 
      * Data can include {startDate, endDate}
      * 
      * Throws NotFoundError if not found
      */

     static async update(id,data){
        const {setCols,values} = sqlForPartialUpdate(
            data,
            {});
        const idVarInd = "$" + (values.length + 1);

        const querySql = `UPDATE lists
                          SET ${setCols}
                          WHERE id = ${idVarInd}
                          RETURNING id,
                                    start_date AS "startDate",
                                    end_date AS "endDate",
                                    username`;
        const res = await db.query(querySql, [...values,id]);
        const list = res.rows[0];

        if(!list) throw new NotFoundError(`No list found: ${id}`);

        return list;
     }

     /** Delete given list from database; returns undefined
      * 
      * Throws NotFoundError if list not found
      */

     static async remove(id){
        const res = await db.query(
            `DELETE
            FROM lists
            WHERE id = $1
            RETURNING id`, [id]);
        const list = res.rows[0];

        if(!list) throw new NotFoundError(`No list found: ${id}`);

     }
}

module.exports = ShoppingList;