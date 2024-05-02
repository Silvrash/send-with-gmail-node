import fs from "fs";
import { google } from "googleapis";
import MailComposer from "nodemailer/lib/mail-composer";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import credentials from "./credentials.json";

export class Gmail {
    public async sendEmail(email: string, subject: string, body: string): Promise<void> {
        const gmail = this.get_gmail_service();
        const rawMessage = await this.create_mail({
            from: "me",
            to: email,
            subject,
            text: body,
        });
        await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: rawMessage,
            },
        });

        console.log("Email sent");
    }

    private get_gmail_service() {
        const tokens = require("./token.json");
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        oAuth2Client.setCredentials(tokens);
        const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
        return gmail;
    }

    private encode_message(message: Buffer | string) {
        return Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    private async create_mail(options: Mail.Options) {
        const mailComposer = new MailComposer(options);
        const message = await mailComposer.compile().build();
        return this.encode_message(message);
    }

    public async authorizeApplication(authorizationCode?: string) {
        if (!authorizationCode) return this.get_authorization_code();

        await this.save_token(authorizationCode);
    }

    private get_authorization_code() {
        // Replace with the code you received from Google
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        const GMAIL_SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

        const url = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            scope: GMAIL_SCOPES,
        });

        console.log("Authorize this app by visiting this url:", url);
    }

    private async save_token(authorizationCode: string) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        return oAuth2Client.getToken(authorizationCode).then(({ tokens }) => {
            const tokenPath = path.join(__dirname, "token.json");
            fs.writeFileSync(tokenPath, JSON.stringify(tokens));
            console.log("Access token and refresh token stored to token.json");
        });
    }
}
