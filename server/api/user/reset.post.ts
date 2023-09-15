import * as JWT from 'jose';
import {PrismaClient} from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
const alg = 'HS256';

export default defineEventHandler(async (event) => {
    const {password1, password2, reset_token} = await readBody(event);
    if(!reset_token) return {error: "wrong link"};
    if((!password1 || !password2) || (password1 !== password2)) return {error: "check input"};

    const user = await prisma.user.findFirst({
        where: {reset_token: reset_token}
    })

    if(user === null) return {error: "wrong link"};

    const passwordSalt = [...Array(20)].map(() => Math.random().toString(36)[2]).join('');
    const hashedPassword = crypto.createHash('sha256').update((password1+passwordSalt)).digest('hex');

    await prisma.user.updateMany({
        where: {reset_token: reset_token},
        data: {password: hashedPassword, salt: passwordSalt, reset_token: ''}
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

    return {sucess: jwt};
})