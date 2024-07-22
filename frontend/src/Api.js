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

    static async getRecipes(cuisine, diet){
        console.log(cuisine, diet)
        let res = await this.request("recipes", {cuisine, diet}, "get" );
        console.log(res)
        return res;
    }
 

    static async getRecipe(id){
        let res = await this.request(`recipes/${id}`);
        console.log(res)
        return res;
    }

    static async getList(){
        let res = await this.request("lists");
        console.log(res)
        console.log(res.lists)
        return res
    }

    static async postList(data){
        let res = await this.request(`lists`, data, "post" );
        console.log(res)
        console.log(res.lists)
        return res
    }


    static async getPlanDay(date){
        // console.log(date)
        let res = await this.request(`plans/${date}`);
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