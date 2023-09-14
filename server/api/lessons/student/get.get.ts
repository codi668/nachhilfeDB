import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }
    const data = await prisma.lessons.findMany({
        where: {
            studentID: event.context.id.id,
            canceled: false,
            grant_support: false
        }
    });
    return data;
})