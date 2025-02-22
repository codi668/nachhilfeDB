import {PrismaClient} from "@prisma/client";
import * as nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {name, email, admin, tutor, student, supporter, wage} = await readBody(event);
    if(!name || !email || admin===undefined || tutor===undefined || student===undefined || supporter===undefined || wage===undefined) return {error: "check input"};

    const reset_token = [...Array(40)].map(() => Math.random().toString(36)[2]).join('');
    const tempPassword = [...Array(40)].map(() => Math.random().toString(36)[2]).join('');
    const reset_link = "https://nachhilfe-mms.lter.cc/reset?resetToken=" + reset_token;

    const data = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: tempPassword,
            admin: admin,
            tutor: tutor,
            student: student,
            supporter: supporter,
            reset_token: reset_token,
            wage: <number>wage
        }
    });

    const transporter = await nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const email_res = await transporter.sendMail({
        from: '"Nachhilfesystem HTL St. Pölten" <no-reply@lter.cc>',
        to: email,
        subject: "Willkommen im Nachhilfesystem HTL St. Pölten",
        html: "<div>Liebe(r) " + name + "!</div><br><div>Herzlich Willkommen im Nachhilfesystem HTL St. Pölten!</div><div>Auf" +
            " dieser Plattform kannst du deine Nachhilfestunden einsehen. Zusätzlich bietet die Website die" +
            " Möglichkeit eine Förderung für gehaltenen Nachhilfestunden zu beantragen! </div><br><div>Um Zugang" +
            " zur Platform zu erhalten erstelle dir ein Passwort! <a href=" + reset_link + ">Hier Klicken</a>" +
            " (" + reset_link + ")</div><br><div>Danach kannst du dich jederzeit hier " +
            "<a href='https://nachhilfe-mms.lter.cc'>Anmelden</a>" +
            " (https://nachhilfe-mms.lter.cc)" + "!</div><br><div>Bei Fragen schreib einfach eine Email an" +
            " <a href='mailto:benedikt.walter@htlstp.at'>benedikt.walter@htlstp.at</a></div>" +
            "Liebe Grüße,</div><div>dein Nachhilfeteam</div>"
    });

    console.log("Welcome Email sent to: " + email);
    console.log(email_res);

    return {sucess: "user created"};
})