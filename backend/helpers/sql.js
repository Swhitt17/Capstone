const {BadRequestError} = require("../expressError");


function sqlForPartialUpdate(dataToUpdate, jsToSql){
    const keys = Object.keys(dataToUpdate);
    if(keys.length === 0) throw new BadRequestError("No data");

    const cols = keys.map((colName, ind) => 
    `"${jsToSql[colName] || colName}"=$${ind + 1}`,
     );

     return{
        setCols: cols.join(","),
        values: Object.values(dataToUpdate),
     };
}

module.exports = {sqlForPartialUpdate};