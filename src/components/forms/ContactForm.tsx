"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validations/contact";
import { sendContactEmail } from "@/actions/contact";
import { Loader2, CheckCircle2, X } from "lucide-react";

const formatTitleCase = (text: string) => {
  return text
    .split(' ')
    .map(word => {
      if (!word) return "";
      return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
    })
    .join(' ');
};

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    register("file");
  }, [register]);

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    setIsSuccess(false);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    const result = await sendContactEmail(formData);

    if (result.success) {
      setIsSuccess(true);
      setSelectedFiles([]);
      reset();
    } else {
      setServerError(result.error || "Bir hata oluştu.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...selectedFiles, ...newFiles];

      setSelectedFiles(updatedFiles);
      setValue('file', updatedFiles, { shouldValidate: true });
    }
    // Aynı dosyayı tekrar seçebilmek için inputu sıfırla
    e.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, idx) => idx !== indexToRemove);
    setSelectedFiles(updatedFiles);

    if (updatedFiles.length === 0) {
      setValue('file', undefined, { shouldValidate: true });
    } else {
      setValue('file', updatedFiles, { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
          Ad Soyad
        </label>
        <input
          {...register("name", {
            onBlur: (e) => {
              const val = e.target.value;
              if (val) {
                setValue("name", formatTitleCase(val), { shouldValidate: true });
              }
            }
          })}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ\s]/g, "");
          }}
          type="text"
          id="name"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${errors.name ? "border-red-500" : "border-slate-300"
            }`}
          placeholder="Adınız ve Soyadınız"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.name.message as string}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
          E-posta
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${errors.email ? "border-red-500" : "border-slate-300"
            }`}
          placeholder="ornek@email.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.email.message as string}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1.5">
          Konu
        </label>
        <input
          {...register("subject")}
          type="text"
          id="subject"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${errors.subject ? "border-red-500" : "border-slate-300"
            }`}
          placeholder="Mesajınızın konusu"
        />
        {errors.subject && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.subject.message as string}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
          Mesaj
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${errors.message ? "border-red-500" : "border-slate-300"
            }`}
          placeholder="Mesajınızı buraya yazınız..."
        ></textarea>
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.message.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Dosya Eki (Opsiyonel)
        </label>

        <input
          type="file"
          id="file"
          multiple
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <label
          htmlFor="file"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer text-sm border border-slate-200"
        >
          Dosya Seç
        </label>

        <p className="mt-2 text-xs text-slate-500">Maksimum 3 dosya, toplam 5MB (.jpg, .png, .pdf, .docx)</p>

        {errors.file && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.file.message as string}</p>
        )}

        {/* Seçilen Dosyaların Listesi */}
        {selectedFiles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <span className="truncate max-w-[120px] font-medium">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-600 p-0.5 rounded-full transition-colors cursor-pointer"
                  title="Dosyayı kaldır"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sunucu / API Hata Mesajı */}
      {serverError && (
        <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200">
          {serverError}
        </div>
      )}

      {/* Başarı Mesajı */}
      {isSuccess && (
        <div className="p-4 text-sm text-green-800 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-6 rounded-xl shadow-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          "Gönder"
        )}
      </button>
    </form>
  );
}
