import {PrismaClient} from "@prisma/client";
import {asNumber} from "simple-git/dist/src/lib/utils";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {student_name, studentID, subject, date, start_time, end_time} = await readBody(event);
    if(!student_name || !studentID || !subject || !date || !start_time || !end_time) return {error: "check input"};
    const tutor_name = (await prisma.user.findFirst({
        where: {
            id: event.context.id.id
        },
        select: {
            name: true
        }
    }))?.name || ''
    const data = await prisma.lessons.create({
        data: {
            student_name: student_name,
            tutor_name: tutor_name,
            studentID: studentID,
            tutorID: event.context.id.id,
            start_date: new Date(date+"T"+start_time),
            end_date: new Date(date+"T"+end_time),
            subject: subject,
            canceled: false,
            paid: false,
            req_support: false,
            grant_support: false
        }
    });
    return data;
})