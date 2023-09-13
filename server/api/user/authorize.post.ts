import * as JWT from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
const alg = 'HS256';

export default defineEventHandler(async (event) => {
    const jwt = getCookie(event, 'jwt') || 0;
    const authorize = (await readBody(event)).authorize;
    try {
        const jwt_decoded = await JWT.jwtVerify(<string>jwt, secret);
        event.context.id = {id: jwt_decoded.payload.id};
        if(authorize === "admin" && jwt_decoded.payload.admin === false) {
            return {error: 'not authorized'};
        }
        else if(authorize === "tutor" && jwt_decoded.payload.tutor === false) {
            return {error: 'not authorized'};
        }
        else if(authorize === "student" && jwt_decoded.payload.student === false) {
            return {error: 'not authorized'};
        }
        else if(authorize === "supporter" && jwt_decoded.payload.supporter === false) {
            return {error: 'not authorized'};
        }
    }
    catch {
        return  {error: 'not authenticated'};
    }
    return {sucess: 'authorized'};
})