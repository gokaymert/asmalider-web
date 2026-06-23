import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Lütfen adınızı ve soyadınızı giriniz."),
  email: z.string().trim().email("Lütfen geçerli bir e-posta adresi giriniz."),
  subject: z.string().trim().min(3, "Lütfen mesajınızın konusunu giriniz."),
  message: z.string().trim().min(10, "Mesajınız en az 10 karakter olmalıdır."),
  file: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      if (files.length > 3) return false;
      return true;
    }, "En fazla 3 dosya yükleyebilirsiniz.")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      
      let totalSize = 0;
      if (typeof window !== 'undefined' && files instanceof FileList) {
        for (let i = 0; i < files.length; i++) totalSize += files[i].size;
      } else if (Array.isArray(files)) {
        for (let i = 0; i < files.length; i++) totalSize += files[i].size;
      } else if (files instanceof File) {
        totalSize = files.size;
      }
      
      return totalSize <= MAX_FILE_SIZE;
    }, "Dosyaların toplam boyutu en fazla 5MB olabilir.")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      
      const checkType = (type: string) => ACCEPTED_FILE_TYPES.includes(type);
      
      if (typeof window !== 'undefined' && files instanceof FileList) {
        for (let i = 0; i < files.length; i++) {
          if (!checkType(files[i].type)) return false;
        }
      } else if (Array.isArray(files)) {
        for (let i = 0; i < files.length; i++) {
          if (!checkType(files[i].type)) return false;
        }
      } else if (files instanceof File) {
        return checkType(files.type);
      }
      
      return true;
    }, "Sadece .jpg, .jpeg, .png, .webp ve .pdf formatları kabul edilmektedir."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
