import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }
    const data = await prisma.lessons.findMany({
        where: {
            tutorID: event.context.id.id,
            canceled: false,
            paid: false
        },
        orderBy: {
            start_date: 'asc'
        }
    });
    return data;
})