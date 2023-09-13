import * as JWT from 'jose';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
const alg = 'HS256';

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }
    const data = await prisma.lessons.findMany({
        where: {
            studentID: event.context.id.id,
            canceled: false,
            paid: false,
            req_support: false,
            grant_support: false
        }
    });
    return data;
})