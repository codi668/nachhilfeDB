import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {id} = await readBody(event);
    if(!id) return {error: "checl input"};

    await prisma.lessons.updateMany({
        where: {
            id: id,
            tutorID: event.context.id.id,
            canceled: false,
            paid: false
        },
        data: {
            canceled: true
        }
    });

    return {sucess: "lesson canceled"};
})