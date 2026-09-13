"use client";

import { useEffect, useState } from "react";

// --- Mock Data ---
const START_DATE = new Date("2023-06-14T00:00:00");

const memories = [
  {
    id: 1,
    title: "İlk Buluşma",
    date: "14 Haziran 2023",
    desc: "Kadıköy’de o küçük kafede saatlerce konuşmuştuk. Yağmur yağıyordu ama umurumuzda değildi.",
    img: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&auto=format&fit=crop&q=60",
    color: "from-rose-400 to-pink-500",
  },
  {
    id: 2,
    title: "Kapadokya Kaçamağı",
    date: "09 Eylül 2023",
    desc: "Balonlar gün doğumunda gökyüzünü boyarken dilek diledik. Aynı dilek.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=60",
    color: "from-orange-400 to-rose-500",
  },
  {
    id: 3,
    title: "Yıl Dönümü Sürprizi",
    date: "14 Haziran 2024",
    desc: "Evde hazırladığın o defter… Her sayfasında bir anımız. Ağlamamak imkansızdı.",
    img: "https://images.unsplash.com/photo-1516589177381-26e4a50c6197?w=600&auto=format&fit=crop&q=60",
    color: "from-violet-400 to-fuchsia-500",
  },
  {
    id: 4,
    title: "Sahilde Gün Batımı",
    date: "22 Ağustos 2024",
    desc: "Şarkımız çalarken sadece sustuk ve izledik. En iyi anlar böyle sessiz olanlar.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60",
    color: "from-sky-400 to-indigo-500",
  },
  {
    id: 5,
    title: "Karlı Pazar",
    date: "12 Ocak 2025",
    desc: "Battaniye, film ve sen. Dışarıda kar, içeride en sıcak kış.",
    img: "https://images.unsplash.com/photo-1491002052546-be051a32d50d?w=600&auto=format&fit=crop&q=60",
    color: "from-slate-400 to-zinc-600",
  },
  {
    id: 6,
    title: "Son Anımız",
    date: "11 Mayıs 2025",
    desc: "Dün çekildik. Gülüşün hala aynı, kalbim hala aynı hızda.",
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=60",
    color: "from-emerald-400 to-teal-600",
  },
];

const letters = [
  {
    id: 1,
    from: "Ece",
    to: "Can",
    date: "14 Şub 2025",
    preview: "Seni özlemek, en sevdiğim hüzün...",
    full: "Seni özlemek, en sevdiğim hüzün. Çünkü biliyorum ki özlemimin sonunda sen varsın. Bugün seni düşünerek uyandım, yine gülümsüyordum. İyi ki varsın, iyi ki biz olduk.",
    locked: false,
  },
  {
    id: 2,
    from: "Can",
    to: "Ece",
    date: "08 Mar 2025",
    preview: "Bugün sana bir söz veriyorum...",
    full: "Bugün sana bir söz veriyorum. Her zor günde elini daha sıkı tutacağıma, her güzel günde gözlerinin içine aynı heyecanla bakacağıma söz veriyorum.",
    locked: false,
  },
  {
    id: 3,
    from: "Ece",
    to: "Can",
    date: "Gelecek — 14 Haz 2026",
    preview: "3. yıl dönümümüz için... 🔒",
    full: "Bu mektup 3. yıl dönümümüzde açılacak. Şimdilik kalbimde saklı.",
    locked: true,
  },
];

const questions = {
  today: "Birlikte yaşlanınca ilk ne yapmak istersin?",
  answers: [
    { who: "Ece", text: "Ege’de küçük bir taş ev, bahçede limon ağacı ve her sabah seninle çay.", time: "2 saat önce" },
    { who: "Can", text: "Torunlara ilk buluşmamızı anlatmak, aynı kafeye tekrar gitmek.", time: "1 saat önce" },
  ],
};

const calendarEvents = [
  { day: 14, month: "Haziran", title: "Yıl Dönümümüz", type: "anniversary", count: "821 gün" },
  { day: 22, month: "Mayıs", title: "Ece'nin Doğum Günü", type: "birthday", count: "9 gün kaldı" },
  { day: 3, month: "Temmuz", title: "Konser — Sezen Aksu", type: "plan", count: "Bilet alındı" },
];

function useCounter() {
  const [diff, setDiff] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const d = now.getTime() - START_DATE.getTime();
      setDiff({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d / (1000 * 60 * 60)) % 24),
        mins: Math.floor((d / (1000 * 60)) % 60),
        secs: Math.floor((d / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return diff;
}

export default function Home() {
  const counter = useCounter();
  const [activeLetter, setActiveLetter] = useState<(typeof letters)[number] | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answerText, setAnswerText] = useState("");

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fff7f9] text-zinc-800">
      {/* NAV */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-rose-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 grid place-items-center text-white font-serif text-xl shadow-lg shadow-rose-200">
              ♥
            </div>
            <div className="leading-tight">
              <p className="font-serif font-bold text-[17px] tracking-tight">bizimhikayemiz</p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-rose-400 font-semibold -mt-1">Anı & Aşk Defteri</p>
            </div>
            <span className="hidden sm:inline-flex ml-3 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold tracking-widest">DEMO</span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
            <a href="#anilar" className="hover:text-rose-600 transition">Anılar</a>
            <a href="#takvim" className="hover:text-rose-600 transition">Takvim</a>
            <a href="#mektuplar" className="hover:text-rose-600 transition">Mektuplar</a>
            <a href="#soru" className="hover:text-rose-600 transition">Günlük Soru</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => triggerToast("Demo: Giriş yapma ekranı yakında")}
              className="hidden sm:inline-flex text-sm font-semibold text-zinc-700 hover:text-black transition px-3"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => triggerToast("Demo: Ücretsiz denemeye yönlendiriliyorsun...")}
              className="inline-flex h-9 sm:h-10 px-4 sm:px-5 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-black transition shadow-lg gap-2"
            >
              <span>Demo’yu Dene</span>
              <span className="hidden sm:inline">→</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50" />
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-rose-200 to-pink-300 blur-3xl opacity-40" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-200 to-fuchsia-200 blur-3xl opacity-40" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm text-xs font-semibold text-rose-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Ece & Can • Canlı hikaye
              <span className="hidden sm:inline text-zinc-400 font-normal">• 14.06.2023’ten beri</span>
            </div>

            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-[56px] font-[800] leading-[0.95] tracking-tight text-zinc-900">
              Aşkımız için
              <span className="block font-normal italic text-rose-500">dijital bir ev</span>
            </h1>
            <p className="mt-4 text-[15px] sm:text-base leading-6 sm:leading-7 text-zinc-600 max-w-xl">
              Fotoğraflar, mektuplar, takvim ve her gün bir soru. <b>Bizim Hikayemiz</b> sadece bir site değil — birlikte yazdığınız kitabı sonsuza kadar saklayan özel alanınız.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("anilar")?.scrollIntoView({ behavior: "smooth" })}
                className="h-12 px-7 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white font-semibold shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-[1.02] transition flex items-center gap-2"
              >
                Hikayemizi Keşfet <span>♥</span>
              </button>
              <button
                onClick={() => triggerToast("Video demo yakında")}
                className="h-12 px-6 rounded-full bg-white border border-zinc-200 font-semibold flex items-center gap-2 hover:bg-zinc-50 transition"
              >
                <span className="h-8 w-8 rounded-full bg-zinc-900 text-white grid place-items-center text-xs">▶</span>
                30 sn’de gör
              </button>
            </div>

            <div className="mt-7 flex items-center gap-4 text-xs text-zinc-500">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/100?img=32" alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                <img src="https://i.pravatar.cc/100?img=15" alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                <div className="h-8 w-8 rounded-full bg-rose-500 text-white grid place-items-center text-[10px] font-bold border-2 border-white">+2k</div>
              </div>
              <p>
                <b className="text-zinc-900">2.400+</b> çift hikayesini burada saklıyor
                <span className="hidden sm:inline"> • ★ 4.9/5 memnuniyet</span>
              </p>
            </div>
          </div>

          {/* Right Counter Card */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-[420px] lg:ml-auto">
              {/* Polaroid stack behind */}
              <div className="absolute inset-0 rotate-3 rounded-[28px] bg-white shadow-xl border border-zinc-100 hidden sm:block" />
              <div className="absolute inset-0 -rotate-2 rounded-[28px] bg-rose-50 shadow-xl border border-rose-100 hidden sm:block" />

              <div className="relative rounded-[28px] overflow-hidden bg-white shadow-2xl border border-zinc-100">
                <div className="relative h-[280px] sm:h-[340px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&auto=format&fit=crop&q=60"
                    alt="Couple"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 p-5 sm:p-6 text-white">
                    <p className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-semibold">Birlikte</p>
                    <p className="font-serif text-2xl sm:text-3xl font-bold leading-none mt-1">821 gün, 14 saat</p>
                    <p className="text-xs sm:text-sm opacity-80 mt-1">14 Haziran 2023 — sonsuza kadar ♾️</p>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-zinc-900 shadow">
                    ● Canlı sayaç
                  </div>
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur grid place-items-center shadow">
                    <span className="text-rose-500 animate-heartbeat">♥</span>
                  </div>
                </div>

                {/* Counter grid */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 p-4 sm:p-5 bg-white">
                  {[
                    { v: counter.days, l: "GÜN" },
                    { v: String(counter.hours).padStart(2, "0"), l: "SAAT" },
                    { v: String(counter.mins).padStart(2, "0"), l: "DAKİKA" },
                    { v: String(counter.secs).padStart(2, "0"), l: "SANİYE" },
                  ].map((b) => (
                    <div key={b.l} className="rounded-2xl bg-zinc-900 text-white p-3 sm:p-3.5 text-center">
                      <div className="font-mono font-bold text-xl sm:text-2xl leading-none tracking-tight">{b.v}</div>
                      <div className="text-[9px] tracking-[0.16em] opacity-60 mt-1 font-semibold">{b.l}</div>
                    </div>
                  ))}
                </div>

                <div className="px-4 sm:px-5 pb-5 flex gap-2">
                  <button
                    onClick={() => triggerToast("Anı eklendi (demo)")}
                    className="flex-1 h-10 rounded-full bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 transition"
                  >
                    + Anı Ekle
                  </button>
                  <button
                    onClick={() => triggerToast("Mektup yazma ekranı")}
                    className="flex-1 h-10 rounded-full bg-zinc-100 text-zinc-900 text-sm font-bold hover:bg-zinc-200 transition"
                  >
                    ✉ Mektup Yaz
                  </button>
                </div>
              </div>

              {/* floating badges */}
              <div className="hidden sm:flex absolute -left-6 top-16 bg-white rounded-2xl shadow-xl border border-zinc-100 p-3 gap-3 items-center animate-float">
                <div className="h-10 w-10 rounded-xl bg-emerald-500 grid place-items-center text-white">✓</div>
                <div className="pr-2">
                  <p className="text-xs font-bold leading-none">Yeni mektup!</p>
                  <p className="text-[11px] text-zinc-500">Ece sana yazdı</p>
                </div>
              </div>
              <div className="hidden sm:flex absolute -right-4 bottom-20 bg-white rounded-2xl shadow-xl border border-zinc-100 p-3 gap-2 items-center animate-float" style={{ animationDelay: "1.5s" }}>
                <span className="text-lg">🎵</span>
                <div className="pr-2">
                  <p className="text-xs font-bold leading-none">Şarkımız</p>
                  <p className="text-[11px] text-zinc-500">Sertab — Sevdam Ağlıyor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-2">
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
          {[
            { t: "Anı Duvarı", d: "Fotoğraf, tarih ve hikaye. Sonsuza kadar kronolojik.", i: "🖼️", c: "bg-rose-500" },
            { t: "Gizli Mektuplar", d: "Geleceğe kilitli mektuplar. Doğru günde açılır.", i: "✉️", c: "bg-violet-500" },
            { t: "Günlük Soru", d: "Her gün bir soru, her cevap bir hatıra.", i: "💬", c: "bg-amber-500" },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl bg-white border border-zinc-100 p-4 sm:p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition">
              <div className={`h-10 w-10 shrink-0 rounded-xl ${f.c} grid place-items-center text-white shadow`}>{f.i}</div>
              <div>
                <p className="font-bold text-sm">{f.t}</p>
                <p className="text-sm text-zinc-500 leading-5 mt-1">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANILAR */}
      <section id="anilar" className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-rose-500 uppercase">Anı Duvarı</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1">Bizim küçük evrenimiz</h2>
            <p className="text-zinc-500 mt-2 max-w-xl text-sm sm:text-base">Her anı bir kart. Üzerine gel, hikayesini oku. Demo’da 6 anı var — gerçek sitede sınırsız.</p>
          </div>
          <button onClick={() => triggerToast("Tüm anılar (demo)")} className="hidden sm:inline-flex h-10 px-5 rounded-full border border-zinc-200 bg-white font-semibold text-sm hover:bg-zinc-50">
            Tümünü gör →
          </button>
        </div>

        <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {memories.map((m) => (
            <article
              key={m.id}
              className="group rounded-[22px] overflow-hidden bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img src={m.img} alt={m.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-br ${m.color} text-white text-[11px] font-bold shadow`}>{m.date}</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-serif font-bold text-lg leading-tight">{m.title}</h3>
                <p className="text-sm text-zinc-500 leading-5 mt-1.5 line-clamp-2">{m.desc}</p>
                <button
                  onClick={() => triggerToast(`"${m.title}" anısı açıldı`)}
                  className="mt-3 text-sm font-bold text-rose-600 hover:text-rose-700"
                >
                  Hikayeyi oku →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TAKVİM + SORU */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-6">
        {/* Takvim */}
        <div id="takvim" className="rounded-[24px] bg-zinc-900 text-white p-5 sm:p-7 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-500/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.18em] text-rose-300 font-bold uppercase">Ortak Takvim</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">Hiçbir özel günü unutma</h3>
              </div>
              <div className="hidden sm:grid place-items-center h-12 w-12 rounded-2xl bg-white text-zinc-900 font-bold text-sm leading-none">MAY<br /><span className="text-xl">2025</span></div>
            </div>

            <div className="mt-6 grid gap-3">
              {calendarEvents.map((e) => (
                <div key={e.title} className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-4 hover:bg-white/15 transition">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-white text-zinc-900 grid place-items-center leading-none">
                    <span className="font-bold text-lg">{e.day}</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase -mt-1">{e.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base truncate">{e.title}</p>
                    <p className="text-xs sm:text-sm text-white/60">{e.count}</p>
                  </div>
                  <span className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold ${e.type === "anniversary" ? "bg-rose-500" : e.type === "birthday" ? "bg-violet-500" : "bg-emerald-500"}`}>
                    {e.type === "anniversary" ? "★ Yıl dönümü" : e.type === "birthday" ? "🎂 Doğum günü" : "🎟 Plan"}
                  </span>
                </div>
              ))}
            </div>

            <button onClick={() => triggerToast("Takvime etkinlik eklendi (demo)")} className="mt-5 w-full h-11 rounded-full bg-white text-zinc-900 font-bold text-sm hover:bg-zinc-100 transition">
              + Takvime Ekle
            </button>
          </div>
        </div>

        {/* Günlük soru */}
        <div id="soru" className="rounded-[24px] bg-white border border-zinc-100 p-5 sm:p-7 shadow-sm flex flex-col">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-400 grid place-items-center text-white font-bold">?</div>
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-amber-600 uppercase">Günlük Soru</p>
              <p className="text-xs text-zinc-500">Her gün 09:00’da yenilenir</p>
            </div>
            <span className="ml-auto px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">🔥 12 gün seri</span>
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-5">
            <p className="font-serif text-xl sm:text-2xl font-bold leading-tight text-zinc-900">“{questions.today}”</p>
          </div>

          <div className="mt-5 space-y-3 flex-1">
            {questions.answers.map((a) => (
              <div key={a.who} className="rounded-2xl border border-zinc-100 p-4 bg-zinc-50/70">
                <div className="flex items-center gap-2">
                  <img src={a.who === "Ece" ? "https://i.pravatar.cc/100?img=32" : "https://i.pravatar.cc/100?img=15"} alt={a.who} className="h-7 w-7 rounded-full object-cover" />
                  <span className="font-bold text-sm">{a.who}</span>
                  <span className="text-xs text-zinc-400">• {a.time}</span>
                </div>
                <p className="text-sm text-zinc-700 leading-5 mt-2">{a.text}</p>
              </div>
            ))}

            {!answered ? (
              <div className="flex gap-2 pt-2">
                <input
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Sen de cevapla..."
                  className="flex-1 h-11 px-4 rounded-full border border-zinc-200 bg-white text-sm outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                />
                <button
                  onClick={() => {
                    if (!answerText.trim()) return triggerToast("Önce bir şey yaz knk 🙂");
                    setAnswered(true);
                    triggerToast("Cevabın kaydedildi ♥");
                  }}
                  className="h-11 px-6 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-black transition"
                >
                  Gönder
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                <p className="text-sm font-bold text-emerald-800">Harika! Cevabın anılara eklendi ♥</p>
                <p className="text-xs text-emerald-700/70 mt-1">“{answerText}”</p>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-zinc-400 mt-4">💡 İpucu: Cevaplar otomatik olarak anı duvarına eklenir</p>
        </div>
      </section>

      {/* MEKTUPLAR */}
      <section id="mektuplar" className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-12">
        <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 p-[1px] shadow-xl">
          <div className="rounded-[23px] sm:rounded-[27px] bg-gradient-to-br from-[#fff7f9] to-white p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-rose-500 uppercase">Mektuplar</p>
                <h3 className="font-serif text-3xl font-bold tracking-tight mt-1">Zaman kapsülü</h3>
                <p className="text-zinc-500 text-sm sm:text-base mt-1.5">Geleceğe kilitli mektuplar. Doğru gün gelene kadar kimse açamaz — demo’da kilidi gösteriyoruz.</p>
              </div>
              <button onClick={() => triggerToast("Yeni mektup yaz (demo)")} className="h-10 px-5 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-black transition">
                ✉ Yeni Mektup Yaz
              </button>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {letters.map((l) => (
                <button
                  key={l.id}
                  onClick={() => (l.locked ? triggerToast("🔒 Bu mektup 14 Haz 2026’da açılacak") : setActiveLetter(l))}
                  className={`text-left rounded-2xl border p-5 relative overflow-hidden transition hover:shadow-md group ${l.locked ? "bg-zinc-50 border-zinc-200 border-dashed" : "bg-white border-zinc-100 hover:border-rose-200"}`}
                >
                  {l.locked && <div className="absolute top-3 right-3 text-lg">🔒</div>}
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-500">
                    <span className={`${l.locked ? "bg-zinc-200" : "bg-rose-100 text-rose-700"} px-2 py-1 rounded-full`}>{l.from} → {l.to}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-3">{l.date}</p>
                  <p className={`mt-1 text-sm leading-5 ${l.locked ? "text-zinc-500 italic" : "text-zinc-700 font-medium"}`}>{l.preview}</p>
                  {!l.locked && <p className="mt-3 text-xs font-bold text-rose-600 group-hover:gap-1 flex items-center gap-1">Mektubu aç →</p>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        <div className="rounded-[24px] sm:rounded-[28px] bg-zinc-900 text-white p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">Kendi hikayenizi<br />yazmaya hazır mısınız?</h3>
              <p className="text-white/70 mt-3 text-sm sm:text-base leading-6">5 dakikada kurulum. Fotoğraflarınızı yükleyin, tarihi seçin — biz gerisini güzelleştiriyoruz. <b className="text-white">14 gün ücretsiz</b>, kart gerekmez.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => triggerToast("Kayıt ekranı (demo)")} className="h-12 px-7 rounded-full bg-white text-zinc-900 font-bold hover:bg-zinc-100 transition">Ücretsiz Başla — Demo</button>
                <button onClick={() => triggerToast("WhatsApp’a yönlendiriliyorsun")} className="h-12 px-7 rounded-full border border-white/20 font-bold hover:bg-white/10 transition">WhatsApp’tan Yaz</button>
              </div>
              <p className="text-xs text-white/40 mt-3">✓ KVKK uyumlu • ✓ İstediğin zaman dışa aktar • ✓ Reklam yok</p>
            </div>
            <div className="bg-white rounded-2xl p-5 text-zinc-900 shadow-xl">
              <p className="font-bold text-sm">Demo fiyatı — itemsatış’a özel</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-black tracking-tight">2.900₺</span>
                <span className="text-sm text-zinc-500 line-through">5.500₺</span>
                <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">-47%</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {["Tek seferlik kurulum, ömür boyu kullanım", "Mobil uyumlu + PWA (uygulama gibi)", "Domain + hosting 1 yıl dahil", "WhatsApp destek"].map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> {x}</li>
                ))}
              </ul>
              <button onClick={() => triggerToast("Teklif alındı! (demo)")} className="mt-5 w-full h-11 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold hover:shadow-lg transition">Teklif Al →</button>
              <p className="text-center text-xs text-zinc-400 mt-2">itemsatış ilanından gelenlere özel indirim</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© 2026 bizimhikayemiz.demo — Sevgili Sitesi Demo • itemsatış ilan demo projesi</p>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); triggerToast("Gizlilik (demo)"); }} className="hover:text-zinc-900">Gizlilik</a>
            <a href="#" onClick={(e) => { e.preventDefault(); triggerToast("İletişim (demo)"); }} className="hover:text-zinc-900">İletişim</a>
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold">Mobil App de var → Expo</span>
          </div>
        </div>
      </footer>

      {/* Letter Modal */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setActiveLetter(null)} />
          <div className="relative w-full max-w-lg rounded-[24px] bg-[#fffbf0] shadow-2xl border border-amber-100 overflow-hidden animate-float" style={{ animationDuration: "0s" }}>
            <div className="h-2 bg-gradient-to-r from-rose-400 to-pink-500" />
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-amber-700 uppercase">Mektup • {activeLetter.date}</p>
                  <p className="font-serif text-2xl font-bold mt-1">{activeLetter.from} → {activeLetter.to}</p>
                </div>
                <button onClick={() => setActiveLetter(null)} className="h-9 w-9 rounded-full bg-zinc-900 text-white grid place-items-center">×</button>
              </div>
              <div className="mt-6 rounded-2xl bg-white border border-amber-100 p-5 leading-7 text-zinc-700 font-serif text-[15px] shadow-inner">
                {activeLetter.full}
              </div>
              <p className="text-center text-2xl mt-4">♥</p>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-5 py-3 rounded-full shadow-2xl text-sm font-medium flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {showToast}
        </div>
      )}
    </div>
  );
}
