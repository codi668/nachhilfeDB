import * as JWT from 'jose';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
const alg = 'HS256';

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);
    if(!email || !password) return {error: "check input"};

    const data = await prisma.user.findFirst({
        where: {
            email: <string>email,
            password: <string>password
        }
    });
    if(data === null) return {error: "invalid login"};

    const jwt = await new JWT.SignJWT({ id: data?.id, admin: data?.admin, tutor: data?.tutor,
        student: data?.student, supporter: data?.supporter})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('30min')
        .setIssuer('server')
        .setAudience(<string>data?.email)
        .sign(secret);

    setCookie(event, 'jwt', jwt);

    return {jwt: jwt};
})