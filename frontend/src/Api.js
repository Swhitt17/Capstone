import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CapstoneApi{

    static token;

    static async request(endpoint, data = {}, method = "get"){
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${CapstoneApi.token}`}
        const params = (method === "get")
        ? data
        : {};

        try{
            return (await axios({url, method, data, params, headers})).data;
        }
        catch(err){
            console.error("API ERROR:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    //Individual routes

    /** Register */
    static async register(data){
        let res = await this.request(`auth/register`, data, "post");
        console.log(res.data, "res.data")
        return res.token;
    }
 

    /**Login */
    static async login(data){
        let res = await this.request(`auth/login`, data, "post");
        return res.token;
    }

    /** Get user by username */
    static async getCurrentUser(username){
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** update user by username */
    static async updateCurrentUser(username, data){
        let res = await this.request(`users/${username}`,data,"patch");
        return res.user;
    }

    static async getRecipes(cuisine, diet, dish,title,itemOffset){
        console.log(cuisine, diet, dish,title)
        let res = await this.request("recipes", {cuisine, diet, dish,title,itemOffset}, "get" );
        console.log(res)
        return res;
    }
 

    static async getRecipe(id){
        let res = await this.request(`recipes/${id}`);
        console.log(res)
        return res;
    }

    static async getList(username, userHash){
        let res = await this.request("lists", {username, userHash}, "get");
        console.log(res)
        console.log(res.lists)
        return res
    }

    static async postList(date,id, meal, position, title, servings ){
        console.log(date,id, meal, position, title, servings, "plan api data")
        let res = await this.request(`lists`, {date,id, meal, position, title, servings} , "post" );
        console.log(res)
        console.log(res.lists)
        return res.list
    }


    static async getPlanDay(date){
        // console.log(date)
        let res = await this.request(`plans/${date}`);
        console.log(res)
        console.log(res.plan)
        return res.plan;

    }

    static async postPlan(data){
        let res = await this.request(`plans`, data, "post");
        console.log(res)
        console.log(res.plan)
        return res.plan;
    }

    static async removePlanDay(date,data){
        let res = await this.request(`plans/${date}`,data, "delete");
        return res.json({message: "cleared"})
        

    }



}

// CapstoneApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1odXluaDIwIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyMDcxMDEzMH0.I2vZ9XVkDkXvbU72yukmdc9mJd_HT9KpnWL-HQgyvmY"

export default CapstoneApi;