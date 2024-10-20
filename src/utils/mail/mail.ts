import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const emailZoho = process.env.ZOHO_EMAIL;
const passZoho = process.env.ZOHO_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "Zoho",
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: emailZoho,
    pass: passZoho,
  },
  requireTLS: true,
});

const send = async ({
  to,
  subject,
  content,
}: {
  to: string | string[];
  subject: string;
  content: string;
}) => {
  const result = await transporter.sendMail({
    from: emailZoho,
    to,
    subject,
    html: content,
  });

  console.log("Sending email to", to);

  return result;
};

const render = async (template: string, data: any) => {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
    data
  );

  return content as string;
};

export default {
  send,
  render
}