"use server";

import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations/contact";

// RESEND_API_KEY .env.local dosyasında olmalıdır
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      file: formData.getAll("file"), // Çoklu dosya desteği
    };

    // Zod validation
    const parsed = contactFormSchema.safeParse(data);

    if (!parsed.success) {
      return { success: false, error: "Geçersiz form verisi. Lütfen alanları kontrol ediniz." };
    }

    const { name, email, subject, message, file } = parsed.data;

    const attachments = [];

    // Dosyaları Buffer'a çevirip Resend attachment dizisine ekliyoruz
    if (file) {
      const filesArray = Array.isArray(file) ? file : [file];
      for (const f of filesArray) {
        if (f instanceof File && f.size > 0) {
          const buffer = Buffer.from(await f.arrayBuffer());
          attachments.push({
            filename: f.name,
            content: buffer,
          });
        }
      }
    }

    // Mail Gönderimi
    const result = await resend.emails.send({
      from: "Asmalider Iletisim <info@asmalider.org.tr>",
      to: "info@asmalider.org.tr",
      replyTo: email as string,
      subject: `${subject}`,
      html: `
        <h2>Asmalı Derneği İletişim</h2>
        <p><strong>Gönderen:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <hr />
        <p><strong>Mesaj:</strong></p>
        <p>${(message as string).replace(/\n/g, '<br>')}</p>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return { success: false, error: "Mail gönderilirken bir hata oluştu. Daha sonra tekrar deneyin." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    return { success: false, error: "Sunucu tarafında beklenmeyen bir hata oluştu." };
  }
}
