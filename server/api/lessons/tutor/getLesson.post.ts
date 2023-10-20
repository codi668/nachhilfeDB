import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {lessonID} = await readBody(event);
    if(!lessonID) return {error: "check input"};
    const data = await prisma.lessons.findFirst({
        where: {
            id: parseInt(lessonID),
            tutorID: <number>event.context.id.id,
            canceled: false,
            paid: false
        },
        select: {
            start_date: true,
            end_date: true
        }
    });
    return data;
})