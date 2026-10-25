const jwt = require("jsonwebtoken");
const jwtPass ="secertkey";

const zod = require("zod");

const enailSchema = zod.string().email();
const passwordSchema = zod.string().min(8);


function signJwt(username, password){
    const usernameResponse = enailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if (!usernameResponse.success || !passwordResponse.success){
        return null;
    }


    const signature = jwt.sign({username}, jwtPass);
    return signature;
}

function verifyJwt(token){
    try{
        let ans = true;
        const decoded = jwt.verify(token, jwtPass);
    } catch (error) {
        ans = false;
    }
    return ans;

}

function decodeJwt(token){
    const decoded = jwt.decode(token);
    if(decoded){
        return true;
    }else{
        return false;
    }
}