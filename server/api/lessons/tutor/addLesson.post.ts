import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {student_name, studentID, subject, date, start_time, end_time} = await readBody(event);
    if(!student_name || !studentID || !subject || !date || !start_time || !end_time) return {error: "check input"};
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const start_hour = start_time.slice(0, 2);
    const start_minute = start_time.slice(3, 5);
    const end_hour = end_time.slice(0, 2);
    const end_minute = end_time.slice(3, 5);
    const start_date = new Date(Date.UTC(year, month-1, day, start_hour, start_minute));
    const end_date = new Date(Date.UTC(year, month-1, day, end_hour, end_minute));

    if(start_date.getTime() >= end_date.getTime()) {
        return {error: "check input"};
    }
    const minutes:number = (end_date.getTime() - start_date.getTime())/60000;
    console.log(minutes)

    const tutor_info = (await prisma.user.findFirst({
        where: {
            id: event.context.id.id
        },
        select: {
            name: true,
            wage: true
        }
    }));
    const tutor_name = tutor_info?.name || '';
    const tutor_wage:number = <number>(tutor_info?.wage) || 0;

    const price:number = tutor_wage*(minutes/60);

    const data = await prisma.lessons.create({
        data: {
            student_name: student_name,
            tutor_name: tutor_name,
            studentID: studentID,
            tutorID: event.context.id.id,
            start_date: start_date,
            end_date: end_date,
            subject: subject,
            canceled: false,
            paid: false,
            req_support: false,
            grant_support: false,
            price: price
        }
    });
    return {sucess: "lesson created"};
})