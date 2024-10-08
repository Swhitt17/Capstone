const jwt = require("jsonwebtoken");
const {createToken} = require("./token");
const {SECRET_KEY} = require("../config");

describe("createToken", function(){
    test("works: not admin", function (){
        const token = createToken({username: "test", is_admin: false});
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false
        });
    });

    test("works: admin", function (){
        const token = createToken({username: "admin", is_admin: true});
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test1",
            isAdmin: true
        });
    });

    test("works: default no admin", function (){
        const token = createToken({username: "test" });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false
        });
    });


})