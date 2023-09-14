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
            studentID: event.context.id.id,
            canceled: false,
            paid: true,
            req_support: false
        },
        data: {
            req_support: true
        }
    });

    if(res.count === 1) return {sucess: "support requested"};
    else return {error: "wrong submit"};
})