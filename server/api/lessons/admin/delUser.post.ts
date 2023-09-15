import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {id} = await readBody(event);
    if(!id) return {error: "check input"};

    const data = await prisma.user.delete({
        where: {
            id: id
        }
    });
    return data;
})