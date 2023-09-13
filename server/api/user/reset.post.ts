import * as JWT from 'jose';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
const alg = 'HS256';

export default defineEventHandler(async (event) => {
    const {password1, password2, reset_token} = await readBody(event);
    if(!reset_token) return {error: "wrong link"};
    if((!password1 || !password2) || (password1 !== password2)) return {error: "check input"};

    const data_check_reset = await prisma.user.findFirst({
        where: {reset_token: reset_token}
    })

    if(data_check_reset === null) return {error: "wrong link"};

    await prisma.user.updateMany({
        where: {reset_token: reset_token},
        data: {password: password1, reset_token: ''}
    })

    const user = await prisma.user.findFirst({
        where: {reset_token: reset_token}
    })

    const jwt = await new JWT.SignJWT({ id: user?.id, admin: user?.admin, tutor: user?.tutor,
        student: user?.student, supporter: user?.supporter})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('30min')
        .setIssuer('server')
        .setAudience(<string>user?.email)
        .sign(secret);

    setCookie(event, 'jwt', jwt);

    return {jwt: jwt};
})