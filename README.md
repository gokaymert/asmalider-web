# Asmalıder Web Platformu 🚀

Asmalı Köyü Kültür ve Dayanışma Derneği (Asmalıder) için modern web standartlarına uygun olarak sıfırdan geliştirilmiş, yüksek performanslı ve tam dinamik kurumsal web platformudur. 

Proje, son kullanıcılar için optimize edilmiş hızlı bir önyüz (frontend) ile dernek yönetiminin tüm içerikleri tek bir platformdan yönetebilmesini sağlayan gömülü bir Headless CMS (Sanity) mimarisini tek bir kod tabanında harmanlamaktadır.

## 🛠 Teknoloji Yığını (Tech Stack)

* **Framework:** Next.js 16 (App Router)
* **Dil:** TypeScript (v5+, Strict Mode)
* **Stil & UI:** Tailwind CSS v4, `@tailwindcss/typography`
* **İçerik Yönetimi (CMS):** Sanity v5.28 (Embedded Studio)
* **Form & Validasyon:** React Hook Form, Zod
* **E-Posta Servisi:** Resend API

---

## 🏗 Mimari Yaklaşımlar ve Özellikler

### 1. Ölçeklenebilir Klasör Mimarisi ve Route Groups
Proje klasik bir yapı yerine **Domain-Driven Component Architecture** (Özellik/Etki alanı bazlı bileşen mimarisi) ile kurgulanmıştır. `src/components` dizini altındaki bileşenler işlevlerine göre (about, forms, layout vb.) izole edilmiştir. Ayrıca Next.js'in `Route Groups` özelliği kullanılarak son kullanıcı arayüzü `(site)` ile CMS yönetim paneli tamamen birbirinden ayrıştırılmıştır.

### 2. Gömülü Headless CMS (Embedded Studio)
Dernek yöneticilerinin içerik girmek için farklı bir platforma gitmesine gerek kalmamıştır. Sanity CMS, `next-sanity` entegrasyonu ile projenin içine (`/studio` rotasına) gömülmüş, böylece içerik yönetimi ve önyüz aynı domain altında birleştirilmiştir. 

* **Esnek Veri Modelleri:** 17'den fazla özel Sanity şeması yazılmıştır. "Destekçilerimiz" veya "İletişim" gibi benzersiz sayfalar için **Singleton Pattern** uygulanarak hatalı veri girişlerinin önüne geçilmiştir.
* **Koşullu Görsel Algoritmaları:** Sanity'den gelen dış kaynaklı görseller için optimize edilmiş özel `<SanityImage>` bileşeni yazılmış; lokal SVG avatarlar ile dinamik logoları hatasız harmanlayan akıllı render mantıkları kurulmuştur.

### 3. Üst Düzey Performans ve SEO
* **Server Components (RSC):** Next.js App Router'ın gücü kullanılarak statik arayüzler ve Layout'lar sunucuda derlenmiş, istemci tarafındaki (client-side) JavaScript yükü minimize edilmiştir.
* **Proaktif SEO:** `Root Layout` üzerinden kurgulanan dinamik metadata şablonlarına ek olarak, arama motorları için otomatize edilmiş `sitemap.ts` ve `robots.ts` dosyaları entegre edilmiştir.

### 4. Güvenli İletişim Altyapısı
İletişim formu, gereksiz re-render işlemlerini önlemek adına `React Hook Form` ile optimize edilmiş, kullanıcıdan alınan tüm veriler sunucuya gönderilmeden önce `Zod` ile şema doğrulamasına tabi tutulmuştur. Onaylanan veriler `Resend API` üzerinden kurumsal mail adresine güvenli bir şekilde iletilmektedir.

---

## ⚙️ Geliştirici Ortamı (Local Setup)
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Repoyu bilgisayarınıza klonlayın:
git clone [https://github.com/gokaymert/asmalider-web.git](https://github.com/gokaymert/asmalider-web.git)

2. Gerekli paketleri yükleyin:
npm install

3. Kök dizinde yer alan .env.example dosyasının adını .env.local olarak değiştirin ve ilgili API anahtarlarını (Sanity ve Resend) doldurun.

4. Geliştirme sunucusunu başlatın:
npm run dev

Uygulama http://localhost:3000 adresinde, Sanity Studio paneli ise http://localhost:3000/studio adresinde çalışmaya başlayacaktır.