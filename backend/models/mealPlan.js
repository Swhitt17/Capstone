const db = require("../db");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {NotFoundError } = require ("../expressError");


class MealPlan{

    static async create(data){
        const res = await db.query(
            `INSERT INTO meal_plans(id,
                                    title,
                                    date,
                                    username)
            VALUES($1,$2,$3,$4)
            RETURNING id,title,date,username`,
            [
                data.id,
                data.title,
                data.date,
                data.username
            ]);
        let mealPlan = res.rows[0];
        return mealPlan;
    }

    static async findAll(){
        let res = `SELECT m.id,
                          m.title
                          m.date,
                          m.username,
                          u.username
                    FROM meal_plans m
                    LEFT JOIN users AS u ON u.username = m.username`;

            res += "ORDER BY id";
            const planRes = await db.query(res);
            return planRes.rows;
    }

    static async get(id){
        const planRes = await db.query(
            `SELECT id,
                    title,
                    date,
                    username
             FROM meal_plans
             WHERE id = $1`,[id]);
        
        const mealPlan = planRes.rows[0];

        if(!mealPlan) throw new NotFoundError(`No meal plan found: ${id}`);

        const usersRes = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_admin AS "isAdmin"
                    FROM users
                    WHERE user = $1`, [list.username]);
        delete list.username;
        list.user = usersRes.rows[0];

        const menuRes = await db.query(
            `SELECT m.id,m.title,r.code
            FROM meal_plans AS m
            LEFT JOIN
            menus AS me
            ON m.id = me.meal_plan_id
            LEFT JOIN
            recipes AS r
            ON me.recipe_code = r.code
            WHERE m.id = $1`,[id]);

        let {id, title} = menuRes.rows[0];
        let recipes = menuRes.rows.map(n => n.recipe);

        return ({mealPlan,id,title,recipes});
    }

    static async update(id,data){
        const {setCols,values} = sqlForPartialUpdate(
            data,
            {});
        const idVarInd = "$" + (values.length + 1);

        const querySql = `UPDATE meal_plans
                          SET ${setCols}
                          WHERE id = ${idVarInd}
                          RETURNING id,
                                    title,
                                    date,
                                    username`;
        const res = await db.query(querySql, [...values,id]);
        const mealPlan = res.rows[0];

        if(!mealPlan) throw new NotFoundError(`No meal plan found: ${id}`);

        return mealPlan;
    }

    static async remove(id){
        const res = await db.query(
            `DELETE
            FROM meal_plans
            WHERE id = $1
            RETURNING id`, [id]);
    
        const mealPlan = res.rows[0];

        if(!mealPlan) throw new NotFoundError(`No meal plan found: ${id}`);
    }
}


module.exports = MealPlan;
