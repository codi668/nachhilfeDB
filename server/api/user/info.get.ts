import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }
    const data = await prisma.user.findFirst({
        where: {
            id: event.context.id.id
        }
    });
    return data;
})