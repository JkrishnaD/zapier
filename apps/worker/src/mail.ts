import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (email: string, body: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jayak5063@gmail.com",
    subject: "Mail from zapier",
    html: `<p>${body}</p>`,
  });
};
