import { Resend } from "resend";
import { supabase } from "./supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(name: string, email: string, message: string) {
  await supabase.from("messages").insert([{ name, email, message }]);

  return resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "mohammedishmamu@gmail.com",
    subject: `New message from ${name}`,
    html: `
      <h2>New Portfolio Message</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
}