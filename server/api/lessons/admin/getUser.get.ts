import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }
    const data = await prisma.user.findMany({
        select: {
            id: true,
            name: true
        }
    });
    return data;
})