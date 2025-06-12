import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
  const { data, error } = await resend.emails.send({
    from: "Next-Pizza <onboarding@resend.dev>",
    to,
    subject,
    react: template,
  });

  if (error) {
    return Error("Failed to send e-mail");
  }

  return data;
};
