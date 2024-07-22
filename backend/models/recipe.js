const db = require("../db");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {NotFoundError,BadRequestError} = require ("../expressError");

/** Functions for recipes */

class Recipe{
    /** Create a recipe from data, update db, return new recipe data
     * 
     * data should be {code,title,imageUrl,servings,cookingTime,instructions,cuisines,
                         diets,dishTypes,ingredients,nutrientName,nutrientAmount }
     * 
     * Returns {code,title,imageUrl,servings,cookingTime,instructions,cuisines,
                         diets,dishTypes,ingredients,nutrientName,nutrientAmount }
     */

    static async create({code,title,imageUrl,servings,cookingTime,instructions,cuisines,
                         diets,dishTypes,ingredients,nutrientName,nutrientAmount}){

            const res = await db.query(
                `INSERT INTO recipes
                     (code,
                     title,
                     image_url AS "imageUrl",
                      servings,
                      cooking_time AS "cookingTime",
                      instructions,
                      cuisines,
                      diets,
                      dish_types AS "dishTypes",
                      ingredients,
                     nutrient_name AS "nutrientName",
                     nutrient_amount AS "nutrientAmount")
                 VALUES ($1.$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
                 RETURNING code, title,image_url AS "imageUrl", servings,cooking_time AS "cookingTime",instructions,
                 cuisines,diets,dish_types AS "dishTypes", ingredients, nutrient_name AS "nutrientName", nutrient_amount AS "nutrientAmount"`,
                [
                  code, 
                  title,
                  imageUrl,
                  servings,
                  cookingTime,
                  instructions,
                  cuisines,
                  diets,
                  dishTypes,
                  ingredients, 
                  nutrientName, 
                 nutrientAmount
                ],    
            );

            const recipe = res.rows[0];

            return recipe;
    }

    /** Find all recipes(optional filter on searchFilters)
     * 
     * searchFilters (all optional);
     * -minServings
     * -title (will find case-insensitive, partial matches)
     * -cuisines (will find case-insensitive, partial matches)
     * -diets (will find case-insensitive, partial matches)
     * 
     * Returns [{code,title,imageUrl,servings,cookingTime,instructions,cuisines,
                         diets,dishTypes,ingredients,nutrientName,nutrientAmount}]
     */

    static async findAll(searchFilters = {}){
        let query = `SELECT code,
                            title,
                            image_url AS "imageUrl",
                            servings,
                            cooking_time AS "cookingTime",
                            instructions,
                            cuisines,
                            diets,
                            dish_types AS "dishTypes",
                            ingredients,
                            nutrient_name AS "nutrientName",
                            nutrient_amount AS "nutrientAmount"
                            FROM recipes`;
        let whereExpressions = [];
        let queryValues = [];

        const {title,cuisines,diets, minServings, maxServings} = searchFilters;

        if(minServings > maxServings){
            throw new BadRequestError("Min servings cannot be greater than max");
        }

        if(minServings !== undefined){
            queryValues.push(minServings);
            whereExpressions.push(`servings >= $${queryValues.length}`);
        }

        if(maxServings !== undefined){
            queryValues.push(maxServings);
            whereExpressions.push(`servings >= $${queryValues.length}`);
        }

        if(title){
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if(cuisines){
            queryValues.push(`%${cuisines}%`);
            whereExpressions.push(`cuisines ILIKE $${queryValues.length}`);
        }

        if(diets){
            queryValues.push(`%${diets}%`);
            whereExpressions.push(`diets ILIKE $${queryValues.length}`);
        }



        if(whereExpressions.length > 0){
            query += " WHERE " + whereExpressions.join(" AND ")
        }

        query += " ORDER BY title";
        const recipeRes = await db.query(query, queryValues);
        return recipeRes.rows;

    }

    /** Given a recipe code, return data about a recipe 
     * 
     * Returns {code,title,imageUrl,servings,cookingTime,instructions,cuisines,
                         diets,dishTypes,ingredients,nutrientName,nutrientAmount}
        
        Throws NotFoundError if not found
    */

    static async get(code){
        const recipeRes = await db.query(
            `SELECT code,
                    title,
                    image_url AS "imageUrl",
                    servings,
                    cooking_time AS "cookingTime",
                    instructions,
                    cuisines,
                    diets,
                    dish_types AS "dishTypes",
                    ingredients,
                    nutrient_name AS "nutrientName",
                    nutrient_amount AS "nutrientAmount"
             FROM recipes
             WHERE code = $1`,
             [code]);

        const recipe = recipeRes.rows[0];

        if(!recipe) throw new NotFoundError(`No recipe found: ${code}`)
        
        return recipe;
    }

    /** Update recipe data with `data`
     * 
     * This is a "partial update" --- This only changes provided ones
     * 
     * Data can include {imageUrl, cookingTime,dishTypes,nutrientName,nutrientAmount}
     * 
     * Throws notFoundError if not found
     */



    static async update(code, data){
        const {setCols, values} = sqlForPartialUpdate(
            data, 
            {
                imageUrl: "image_url",
                cookingTime: "cooking_time",
                dishTypes: "dish_types",
                nutrientName: "nutrient_name",
                nutrientAmount: "nutrient_amount"

            });
        const idVarInd = "$" + (values.length + 1);
        
        const querySql = `UPDATE recipes
                          SET ${setCols}
                          WHERE code = ${idVarInd}
                          RETURNING code,
                                    title,
                                    image_url AS "imageUrl",
                                    servings,
                                    cooking_time AS "cookingTime",
                                    instructions,
                                    cuisines,
                                    diets,
                                    dish_types AS "dishTypes",
                                    ingredients,
                                    nutrient_name AS "nutrientName",
                                    nutrient_amount AS "nutrientAmount"`;
        const res = await db.query(querySql, [...values,code]);
        const recipe = res.rows[0];

        if(!recipe) throw new NotFoundError(`No recipe found: ${code}`);

        return recipe;

    }

    /** Delete given recipe from databse; return undefined
     * 
     * Throws NotFoundError if recipe not found
     */

    static async remove(code){
        const res = await db.query(
            `DELETE
            FROM recipes
            WHERE code = $1
            RETURNING id`,
            [id]);
        const recipe = res.rows[0];

        if(!recipe) throw new NotFoundError(`No recipe found: ${code}`);

    }
}


module.exports = Recipe;