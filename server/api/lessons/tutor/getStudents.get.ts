import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }
    const data = await prisma.user.findMany({
        where: {
            student: true
        },
        select: {
            id: true,
            name: true
        }
    });

    for(let i = 0; i < data.length; i++) {
        const [vorname, nachname] = data[i].name.split(" ");
        data[i].name = nachname.substring(0,3) + vorname.substring(0,3);
    }

    return data;
})