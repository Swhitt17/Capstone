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
        return {token: res.token, data: res.data};
    }
 

    /**Login */
    static async login(data){
        let res = await this.request(`auth/login`, data, "post");
        return {token:res.token, data: res.data}
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

    static async getRecipes(cuisine, diet, dish, intolerance,title,itemOffset){
        let res = await this.request("recipes", {cuisine, diet, dish, intolerance,title,itemOffset}, "get" );
        return res;
    }
 

    static async getRecipe(id){
        let res = await this.request(`recipes/${id}`);
        return res;
    }

    static async getList(){
        let res = await this.request("lists");
        return res;
    }

    static async postList(newItem){
        let res = await this.request(`lists`, {item:newItem, parse:true} , "post" );
        return res;
    }

    static async generateList(startDate, endDate){
        let res = await this.request(`lists/${startDate}/${endDate}`, "post");
        return res;
    }

    static async removeFromList(id){
        let res = await this.request(`lists/${id}`, id,"delete")
        return res;
    }


    static async getPlanDay(day){
        let res = await this.request(`plans/${day}`);
        return res;

    }

    static async postPlan(date, slot, position,id, servings, title, type ){ 
        let res = await this.request(`plans`, {date, slot, position,type, id, servings, title}, "post");
        return res;
    }

    static async removePlanItem(id){
        let res = await this.request(`plans/${id}`,id, "delete");
        return res;
        

    }

}


export default CapstoneApi;