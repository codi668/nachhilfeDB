import {PrismaClient} from "@prisma/client";
import * as nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.auth !== undefined) {
        return event.context.auth;
    }

    const {id} = await readBody(event);
    if(!id) return {error: "check input"};

    const user_data = await prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });
    if(user_data === null) return {error: "wrong user"};
    const name = user_data.name;
    const email = user_data.email;

    const reset_token = [...Array(40)].map(() => Math.random().toString(36)[2]).join('');
    const reset_link = "https://nachhilfe-mms.lter.cc/reset?resetToken=" + reset_token;

    const data = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            reset_token: reset_token
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
        from: '"Nachhilfesystem HTL ST. Pölten" <no-reply@lter.cc>',
        to: email,
        subject: "Willkommen im Nachhilfesystem HTL St. Pölten",
        html: "<div>Liebe(r) " + name + "!</div><br><div>Dein Link zum Passwort zurücksetzen!</div><div>Um ein neues" +
            " Passwort erstellen klicke auf den Link! <a href=" + reset_link + ">Hier Klicken</a>" +
            " (" + reset_link + ")</div><br><div>Danach kannst du dich jederzeit hier " +
            "<a href='https://nachhilfe-mms.lter.cc'>Anmelden</a>" +
            " (https://nachhilfe-db.lter.cc)" + "!</div><br><div>Bei Fragen schreib einfach eine Email an" +
            " <a href='mailto:benedikt.walter@htlstp.at'>benedikt.walter@htlstp.at</a></div><br><div>" +
            "Liebe Grüße,</div><div>dein Nachhilfeteam</div>"
    });

    console.log("Reset password Email sent to: " + email);
    console.log(email_res);

    return {sucess: "user reset"};
})