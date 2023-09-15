import * as JWT from 'jose';
import {PrismaClient} from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
const alg = 'HS256';

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);
    if(!email || !password) return {error: "check input"};

    const salt_data = await prisma.user.findFirst({
        where: {
            email: <string>email
        },
        select: {
            salt: true
        }
    });
    if(salt_data === null) return {error: "invalid login"};
    const passwordSalt = salt_data.salt;
    const hashedPassword = crypto.createHash('sha256').update((password+passwordSalt)).digest('hex');

    const data = await prisma.user.findFirst({
        where: {
            email: <string>email,
            password: <string>hashedPassword
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