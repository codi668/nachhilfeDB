import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {id} = await readBody(event);
    if(!id) return {error: "check input"};

    const res = await prisma.lessons.updateMany({
        where: {
            id: id,
            tutorID: event.context.id.id,
            canceled: false,
            paid: false
        },
        data: {
            paid: true
        }
    });

    if(res.count === 1) return {sucess: "lesson paid"};
    else return {error: "wrong submit"};
})