import * as JWT from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
const alg = 'HS256';
const auth = {
    authenticate: ['/api/user/info', '/api/user/authenticate'],
    admin: '/api/lessons/admin/',
    tutor: '/api/lessons/tutor/',
    student: '/api/lessons/student/',
    supporter: '/api/lessons/supporter/'
};

export default defineEventHandler(async (event) => {
    const route = event.node.req.url;
    const jwt = getCookie(event, 'jwt') || 0;

    if(route !== undefined && auth.authenticate.includes(route)) {
        try {
            const jwt_decoded = await JWT.jwtVerify(<string>jwt, secret);
            event.context.id = {id: jwt_decoded.payload.id};
        }
        catch {
            event.context.auth = {error: 'not authenticated'};
        }
    }
    else if(route !== undefined) {
        let authorize = [false, false, false, false];
        if(route.includes(auth.admin)) {
            authorize[0] = true;
        }
        else if(route.includes(auth.tutor)) {
            authorize[1] = true;
        }
        else if(route.includes(auth.student)) {
            authorize[2] = true;
        }
        else if(route.includes(auth.supporter)) {
            authorize[3] = true;
        }
        if(authorize.includes(true)) {
            try {
                const jwt_decoded = await JWT.jwtVerify(<string>jwt, secret);
                event.context.id = {id: jwt_decoded.payload.id};
                if(authorize[0] && jwt_decoded.payload.admin === false) {
                    event.context.auth = {error: 'not authorized'};
                }
                else if(authorize[1] && jwt_decoded.payload.tutor === false) {
                    event.context.auth = {error: 'not authorized'};
                }
                else if(authorize[2] && jwt_decoded.payload.student === false) {
                    event.context.auth = {error: 'not authorized'};
                }
                else if(authorize[3] && jwt_decoded.payload.supporter === false) {
                    event.context.auth = {error: 'not authorized'};
                }
            }
            catch {
                event.context.auth = {error: 'not authenticated'};
            }
        }
    }
})