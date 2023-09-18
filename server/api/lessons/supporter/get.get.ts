import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }
    const data = await prisma.lessons.findMany({
        where: {
            canceled: false,
            paid: true,
            req_support: true,
            grant_support: false
        },
        orderBy: {
            start_date: 'asc'
        }
    });
    return data;
})