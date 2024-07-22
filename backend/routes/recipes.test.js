const request = require("supertest");
const app = require("../app");


describe("GET /recipes", function () {
    test("should return recipes", async function(){
        const response = await request(app).get("/recipes")
        expect (response.statusCode).toEqual(200)
    })



test("should return recipe information by id", async function(){
    const response = await request(app).get("/recipes/716004")
    expect (response.statusCode).toEqual(200)
})

})

