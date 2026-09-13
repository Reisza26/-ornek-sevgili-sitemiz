"use client";
import { useEffect, useState } from "react";

const START_DATE = new Date("2023-06-14T00:00:00");

const memories = [
  { id: 1, title: "Ilk Bulusma", date: "14 Haziran 2023", desc: "Kadikoy'de o kucuk kafede saatlerce konustuk. Yagmur yagiyordu ama umurumuzda degildi.", img: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&auto=format&fit=crop&q=60" },
  { id: 2, title: "Kapadokya Kacamagı", date: "09 Eylul 2023", desc: "Balonlar gun dogumunda gokyuzunu boyarken dilek diledik. Ayni dilek.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=60" },
  { id: 3, title: "Yil Donumu Surprizi", date: "14 Haziran 2024", desc: "Evde hazirladigin o defter. Her sayfasinda bir animiz.", img: "https://images.unsplash.com/photo-1516589177381-26e4a50c6197?w=600&auto=format&fit=crop&q=60" },
  { id: 4, title: "Sahilde Gun Batimi", date: "22 Agustos 2024", desc: "Sarkimiz calarken sadece sustuk ve izledik. En iyi anlar boyle sessiz olanlar.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60" },
  { id: 5, title: "Karlı Pazar", date: "12 Ocak 2025", desc: "Battaniye, film ve sen. Disarida kar, iceride en sicak kis.", img: "https://images.unsplash.com/photo-1491002052546-be051a32d50d?w=600&auto=format&fit=crop&q=60" },
  { id: 6, title: "Son Animiz", date: "11 Mayis 2025", desc: "Dun cekildik. Gulusun hala ayni, kalbim hala ayni hizda.", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=60" },
];

const letters = [
  { id: 1, from: "Ece", to: "Can", date: "14 Sub 2025", preview: "Seni ozlemek, en sevdigim huzun...", full: "Seni ozlemek, en sevdigim huzun. Cunku biliyorum ki ozlemimin sonunda sen varsin. Bugun seni dusunerek uyandim, yine gulumsuyordum. Iyi ki varsin, iyi ki biz olduk.", locked: false },
  { id: 2, from: "Can", to: "Ece", date: "08 Mar 2025", preview: "Bugun sana bir soz veriyorum...", full: "Bugun sana bir soz veriyorum. Her zor gunde elini daha siki tutacagima, her guzel gunde gozlerinin icine ayni heyecanla bakacagima soz veriyorum.", locked: false },
  { id: 3, from: "Ece", to: "Can", date: "Gelecek — 14 Haz 2026", preview: "Ucuncu yil donumumuz icin sakli", full: "Bu mektup ucuncu yil donumumuzde acilacak. Simdilik kalbimde sakli.", locked: true },
];

const questions = {
  today: "Birlikte yaslaninca ilk ne yapmak istersin?",
  answers: [
    { who: "Ece", text: "Ege'de kucuk bir tas ev, bahcede limon agaci ve her sabah seninle cay.", time: "2 saat once" },
    { who: "Can", text: "Torunlara ilk bulusmamizi anlatmak, ayni kafeye tekrar gitmek.", time: "1 saat once" },
  ],
};

const calendarEvents = [
  { day: 14, month: "Haziran", title: "Yil Donumumuz", sub: "821 gun birlikte", type: "Anniversary" },
  { day: 22, month: "Mayis", title: "Ece'nin Dogum Gunu", sub: "9 gun kaldi", type: "Birthday" },
  { day: 3, month: "Temmuz", title: "Konser", sub: "Bilet alindi — 20:30", type: "Event" },
];

/* --- Icons (custom drawn, no emoji) --- */
function IconHeart(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M12 21s-6.2-4.2-8.6-7.6C1.1 10 2.4 5.6 6.4 5.1c2.4-.3 4.5 1 5.6 3 1.1-2 3.2-3.3 5.6-3 4 .5 5.3 4.9 3 8.3C18.2 16.8 12 21 12 21z" />
    </svg>
  );
}
function IconArrow(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={props.className}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCheck(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={props.className}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPlus(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={props.className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function IconPlay(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M8 5.14v14l11-7z" />
    </svg>
  );
}
function IconCalendar(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={props.className}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function IconMail(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={props.className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconLock(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={props.className}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 118 0v3" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconMessage(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={props.className}>
      <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 0121 11.5z" strokeLinejoin="round" />
      <path d="M8 11h8M8 15h5" strokeLinecap="round" />
    </svg>
  );
}
function IconClose(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={props.className}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
function IconClock(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={props.className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  const [toast, setToast] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answerText, setAnswerText] = useState("");

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2600);
  };

  return (
    <div className="min-h-screen bg-[#fdfcfa] text-stone-900">
      {/* Top bar */}
      <div className="hidden md:block border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-[1160px] px-6 h-8 flex items-center justify-between text-[11px] tracking-wide text-stone-500">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Canli demo — tum veriler ornek iceriktir
          </span>
          <span className="font-medium">itemsatis ilanina ozel demo magaza</span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[#fdfcfa]/85 backdrop-blur-xl border-b border-stone-200">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-stone-900 text-white grid place-items-center">
              <IconHeart className="h-4.5 w-4.5" />
            </div>
            <div className="leading-tight">
              <p className="font-serif text-[17px] font-semibold tracking-tight">bizimhikayemiz</p>
              <p className="text-[11px] tracking-[0.16em] uppercase text-stone-500 font-medium -mt-0.5">Ani ve Ask Defteri</p>
            </div>
            <span className="hidden lg:inline-flex ml-3 px-2.5 py-1 rounded-full border border-stone-200 bg-white text-[11px] font-semibold tracking-widest text-stone-600">DEMO</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-stone-600">
            <a href="#anilar" className="hover:text-stone-900 transition">Anilar</a>
            <a href="#takvim" className="hover:text-stone-900 transition">Takvim</a>
            <a href="#mektuplar" className="hover:text-stone-900 transition">Mektuplar</a>
            <a href="#soru" className="hover:text-stone-900 transition">Gunluk Soru</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => showToast("Giris ekrani demo modunda")} className="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-full border border-stone-200 bg-white text-[13px] font-semibold hover:bg-stone-50 transition">
              Giris Yap
            </button>
            <button onClick={() => showToast("Demo baslatiliyor")} className="h-9 sm:h-10 px-5 inline-flex items-center gap-2 rounded-full bg-stone-900 text-white text-[13px] font-semibold hover:bg-black transition">
              Demo Baslat <IconArrow className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1160px] px-4 sm:px-6 pt-8 sm:pt-12 pb-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
          <div className="pt-2 lg:pt-8">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700">
              <span className="h-2 w-2 rounded-full bg-stone-900" />
              Ece ve Can — 14 Haziran 2023’ten beri
              <span className="hidden sm:inline text-stone-400">• Canli hikaye</span>
            </div>

            <h1 className="mt-6 font-serif text-[38px] sm:text-[48px] lg:text-[54px] font-[600] leading-[0.92] tracking-[-0.03em] text-stone-900">
              Ask icin
              <span className="block font-[400] italic text-stone-600">sessiz bir ev</span>
            </h1>

            <p className="mt-4 max-w-[560px] text-[15px] sm:text-[16px] leading-7 text-stone-600">
              Fotograflar, tarihler, mektuplar ve her gun bir soru. Bizim Hikayemiz, birlikte yazdiginiz kitabi duzen icinde saklayan, reklam icermeyen ozel alaniniz.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById("anilar")?.scrollIntoView({ behavior: "smooth" })} className="h-11 px-6 rounded-full bg-stone-900 text-white text-sm font-semibold inline-flex items-center gap-2 hover:bg-black transition">
                Hikayeyi Incele <IconArrow className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => showToast("Tanitim videosu yakinda")} className="h-11 px-5 rounded-full bg-white border border-stone-200 text-sm font-semibold inline-flex items-center gap-2 hover:bg-stone-50 transition">
                <span className="h-7 w-7 rounded-full bg-stone-900 text-white grid place-items-center">
                  <IconPlay className="h-3 w-3 ml-0.5" />
                </span>
                30 saniyede gor
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-stone-200 pt-6">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/100?img=32" alt="" className="h-8 w-8 rounded-full border-2 border-[#fdfcfa] object-cover" />
                <img src="https://i.pravatar.cc/100?img=15" alt="" className="h-8 w-8 rounded-full border-2 border-[#fdfcfa] object-cover" />
                <div className="h-8 w-8 rounded-full bg-stone-900 text-white grid place-items-center text-[10px] font-bold border-2 border-[#fdfcfa]">+2K</div>
              </div>
              <div className="text-sm leading-5">
                <p className="font-semibold text-stone-900">2.400+ cift kullaniyor</p>
                <p className="text-stone-500 text-xs tracking-wide">Ortalama degerlendirme 4.9 / 5.0</p>
              </div>
              <div className="hidden sm:flex ml-auto items-center gap-2 text-xs font-medium text-stone-500 border border-stone-200 rounded-full px-3 py-1.5 bg-white">
                <IconClock className="h-3.5 w-3.5" /> KVKK uyumlu ve reklamsiz
              </div>
            </div>
          </div>

          {/* Counter Card */}
          <div className="relative">
            <div className="rounded-[24px] overflow-hidden bg-white border border-stone-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="relative h-[320px] sm:h-[380px] overflow-hidden bg-stone-100">
                <img src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=900&auto=format&fit=crop&q=60" alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-stone-900 border border-stone-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" /> Canli sayac
                </div>
                <div className="absolute bottom-0 p-6 sm:p-7 text-white">
                  <p className="text-[11px] tracking-[0.18em] uppercase font-semibold opacity-80">Birlikte</p>
                  <p className="font-serif text-[28px] sm:text-[30px] font-semibold leading-none mt-1">821 gun, 14 saat</p>
                  <p className="text-sm opacity-85 mt-1">14 Haziran 2023 — sonsuza kadar</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 p-4 sm:p-5 bg-white">
                {[
                  { v: counter.days, l: "Gun" },
                  { v: String(counter.hours).padStart(2, "0"), l: "Saat" },
                  { v: String(counter.mins).padStart(2, "0"), l: "Dakika" },
                  { v: String(counter.secs).padStart(2, "0"), l: "Saniye" },
                ].map((b) => (
                  <div key={b.l} className="rounded-2xl bg-stone-900 text-white p-3.5 text-center">
                    <div className="font-mono text-[20px] font-semibold leading-none tracking-tight">{b.v}</div>
                    <div className="text-[10px] tracking-[0.14em] uppercase opacity-60 mt-1.5 font-semibold">{b.l}</div>
                  </div>
                ))}
              </div>

              <div className="px-4 sm:px-5 pb-5 flex gap-3">
                <button onClick={() => showToast("Ani ekleme demo modunda")} className="flex-1 h-10 rounded-full bg-stone-900 text-white text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-black transition">
                  <IconPlus className="h-3.5 w-3.5" /> Ani Ekle
                </button>
                <button onClick={() => showToast("Mektup yazma demo modunda")} className="flex-1 h-10 rounded-full border border-stone-200 bg-white text-stone-900 text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-stone-50 transition">
                  <IconMail className="h-3.5 w-3.5" /> Mektup Yaz
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-stone-500">
              <IconClock className="h-3.5 w-3.5" /> Veriler tarayicida saklanir, disari aktarilabilir
            </div>
          </div>
        </div>
      </section>

      {/* Feature bar */}
      <section className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-4 border-y border-stone-200 py-6">
          {[
            { t: "Ani Duvari", d: "Fotograf, tarih ve hikaye. Kronolojik ve aranabilir.", icon: IconCalendar },
            { t: "Gizli Mektuplar", d: "Gelecege kilitli mektuplar. Dogru gunde acilir.", icon: IconMail },
            { t: "Gunluk Soru", d: "Her gun bir soru. Her cevap bir hatiradir.", icon: IconMessage },
          ].map((f) => (
            <div key={f.t} className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-xl border border-stone-200 bg-white grid place-items-center text-stone-700">
                <f.icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-stone-900">{f.t}</p>
                <p className="text-sm leading-5 text-stone-600 mt-1">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Memories */}
      <section id="anilar" className="mx-auto max-w-[1160px] px-4 sm:px-6 pt-10 sm:pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500">Ani Duvari</p>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-semibold tracking-tight mt-1">Kucuk evrenimiz</h2>
            <p className="text-stone-600 mt-2 max-w-xl text-sm sm:text-[15px] leading-6">Her ani bir kart. Demo icinde 6 ani bulunuyor, gercek kullanimda sinirsiz.</p>
          </div>
          <button onClick={() => showToast("Tum anilar demo modunda")} className="hidden sm:inline-flex h-9 px-4 rounded-full border border-stone-200 bg-white text-sm font-semibold hover:bg-stone-50 items-center gap-1.5">
            Tumunu gor <IconArrow className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {memories.map((m) => (
            <article key={m.id} className="group rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-stone-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
              <div className="relative h-[210px] overflow-hidden bg-stone-100">
                <img src={m.img} alt={m.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-700" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur border border-stone-200 text-xs font-semibold text-stone-700">{m.date}</div>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-semibold text-[17px] leading-tight">{m.title}</h3>
                <p className="text-sm leading-5 text-stone-600 mt-1.5 line-clamp-2">{m.desc}</p>
                <button onClick={() => showToast(`${m.title} acildi`)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 hover:gap-2 transition-all">
                  Hikayeyi oku <IconArrow className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Calendar + Question */}
      <section className="mx-auto max-w-[1160px] px-4 sm:px-6 pt-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
        <div id="takvim" className="rounded-2xl bg-stone-900 text-white p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-stone-400">Ortak Takvim</p>
              <h3 className="font-serif text-[24px] font-semibold mt-1">Ozel gunleri kacirma</h3>
            </div>
            <div className="hidden sm:flex h-14 w-14 rounded-xl bg-white text-stone-900 flex-col items-center justify-center leading-none border border-stone-200">
              <span className="text-[11px] font-bold tracking-widest">MAY</span>
              <span className="text-xl font-bold -mt-1">2025</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {calendarEvents.map((e) => (
              <div key={e.title} className="flex items-center gap-4 rounded-xl bg-white/[0.06] border border-white/10 p-4">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-white text-stone-900 grid place-items-center leading-none">
                  <span className="font-bold text-sm">{e.day}</span>
                  <span className="text-[10px] font-semibold tracking-widest -mt-1">{e.month.slice(0, 3).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{e.title}</p>
                  <p className="text-xs text-white/60">{e.sub}</p>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white text-stone-900 text-xs font-semibold">{e.type}</span>
              </div>
            ))}
          </div>

          <button onClick={() => showToast("Takvime etkinlik eklendi")} className="mt-5 w-full h-10 rounded-full bg-white text-stone-900 font-semibold text-sm hover:bg-stone-100 transition inline-flex items-center justify-center gap-1.5">
            <IconPlus className="h-3.5 w-3.5" /> Takvime Ekle
          </button>
        </div>

        <div id="soru" className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-7 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-stone-900 text-white grid place-items-center">
              <IconMessage className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-stone-500">Gunluk Soru</p>
              <p className="text-xs text-stone-500">Her gun 09:00’da yenilenir</p>
            </div>
            <span className="ml-auto px-2.5 py-1 rounded-full bg-stone-900 text-white text-xs font-semibold">12 gun seri</span>
          </div>

          <div className="mt-5 rounded-xl bg-stone-50 border border-stone-200 p-5">
            <p className="font-serif text-[19px] font-semibold leading-tight">“{questions.today}”</p>
          </div>

          <div className="mt-5 space-y-3 flex-1">
            {questions.answers.map((a) => (
              <div key={a.who} className="rounded-xl border border-stone-200 p-4 bg-stone-50">
                <div className="flex items-center gap-2">
                  <img src={a.who === "Ece" ? "https://i.pravatar.cc/100?img=32" : "https://i.pravatar.cc/100?img=15"} alt="" className="h-7 w-7 rounded-full object-cover" />
                  <span className="font-semibold text-sm">{a.who}</span>
                  <span className="text-xs text-stone-500">• {a.time}</span>
                </div>
                <p className="text-sm leading-5 text-stone-700 mt-2">{a.text}</p>
              </div>
            ))}

            {!answered ? (
              <div className="flex gap-2 pt-1">
                <input value={answerText} onChange={(e) => setAnswerText(e.target.value)} placeholder="Cevabini yaz..." className="flex-1 h-10 px-4 rounded-full border border-stone-200 bg-white text-sm outline-none focus:border-stone-300 focus:ring-4 focus:ring-stone-100" />
                <button onClick={() => { if (!answerText.trim()) return showToast("Lutfen bir cevap yaz"); setAnswered(true); showToast("Cevabin kaydedildi"); }} className="h-10 px-5 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-black transition inline-flex items-center gap-1.5">
                  Gonder <IconArrow className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                <p className="text-sm font-semibold text-emerald-900">Cevabin anilara eklendi</p>
                <p className="text-xs text-emerald-800/70 mt-1">“{answerText}”</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Letters */}
      <section id="mektuplar" className="mx-auto max-w-[1160px] px-4 sm:px-6 pt-10">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-stone-500">Mektuplar</p>
              <h3 className="font-serif text-[24px] font-semibold mt-1">Zaman kapsulu</h3>
              <p className="text-sm text-stone-600 mt-1 max-w-xl">Gelecege kilitli mektuplar. Dogru gun gelene kadar acilmaz. Demo icinde kilidi goruntuluyoruz.</p>
            </div>
            <button onClick={() => showToast("Yeni mektup demo modunda")} className="h-9 px-4 rounded-full bg-stone-900 text-white text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-black transition">
              <IconPlus className="h-3.5 w-3.5" /> Yeni Mektup
            </button>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {letters.map((l) => (
              <button key={l.id} onClick={() => (l.locked ? showToast("Bu mektup 14 Haz 2026’da acilacak") : setActiveLetter(l))} className={`text-left rounded-xl border p-5 transition text-sm ${l.locked ? "bg-stone-50 border-dashed border-stone-300" : "bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm"}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${l.locked ? "bg-stone-200 text-stone-700" : "bg-stone-900 text-white"}`}>{l.from} → {l.to}</span>
                  {l.locked && <IconLock className="h-4 w-4 text-stone-500" />}
                </div>
                <p className="text-xs text-stone-500 mt-3">{l.date}</p>
                <p className={`mt-1 leading-5 ${l.locked ? "text-stone-600 italic" : "text-stone-800 font-medium"}`}>{l.preview}</p>
                {!l.locked && <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-stone-900">Mektubu ac <IconArrow className="h-3 w-3" /></span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1160px] px-4 sm:px-6 py-10">
        <div className="rounded-2xl bg-stone-900 text-white overflow-hidden">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
            <div className="p-7 sm:p-9">
              <h3 className="font-serif text-[28px] sm:text-[32px] font-semibold leading-tight">Kendi hikayenizi yazmaya hazir misiniz</h3>
              <p className="text-stone-300 mt-3 text-sm sm:text-[15px] leading-6 max-w-xl">5 dakikada kurulum. Fotograflarinizi yukleyin, tarihi secin. Geri kalanini biz duzenliyoruz. 14 gun ucretsiz, kart gerekmez.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => showToast("Kayit ekrani demo modunda")} className="h-11 px-6 rounded-full bg-white text-stone-900 font-semibold text-sm hover:bg-stone-100 transition inline-flex items-center gap-1.5">
                  Ucretsiz Basla <IconArrow className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => showToast("WhatsApp yonlendirmesi")} className="h-11 px-6 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition">WhatsApp ile Iletisim</button>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-stone-400">
                <span className="inline-flex items-center gap-1.5"><IconCheck className="h-3.5 w-3.5" /> KVKK uyumlu</span>
                <span className="inline-flex items-center gap-1.5"><IconCheck className="h-3.5 w-3.5" /> Disari aktarim</span>
                <span className="inline-flex items-center gap-1.5"><IconCheck className="h-3.5 w-3.5" /> Reklam yok</span>
              </div>
            </div>

            <div className="bg-white text-stone-900 p-6 sm:p-7 lg:border-l border-white/10">
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">Demo Fiyati — itemsatis’a ozel</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-[32px] font-bold tracking-tight">2.900₺</span>
                <span className="text-sm line-through text-stone-500">5.500₺</span>
                <span className="px-2 py-1 rounded-full bg-stone-900 text-white text-xs font-bold">-47%</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {["Tek seferlik kurulum, omur boyu kullanim", "Mobil uyumlu ve PWA destegi", "Domain ve hosting 1 yil dahil", "WhatsApp destek"].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="h-5 w-5 shrink-0 rounded-full bg-stone-900 text-white grid place-items-center mt-0.5">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    <span className="text-stone-700 leading-5">{x}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => showToast("Teklif alindi")} className="mt-6 w-full h-11 rounded-full bg-stone-900 text-white font-semibold text-sm hover:bg-black transition inline-flex items-center justify-center gap-1.5">
                Teklif Al <IconArrow className="h-3.5 w-3.5" />
              </button>
              <p className="text-center text-xs text-stone-500 mt-2.5">itemsatis ilanindan gelenlere ozel indirim</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - professional */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-stone-900 text-white grid place-items-center">
                  <IconHeart className="h-4 w-4" />
                </div>
                <span className="font-serif font-semibold tracking-tight">bizimhikayemiz</span>
              </div>
              <p className="text-sm leading-6 text-stone-600 mt-3">Ciftler icin sade, guvenli ve kalici ani defteri. Verileriniz sizde kalir, dilediginiz an disari aktarabilirsiniz.</p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">Urun</p>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                <li><a href="#anilar" className="hover:text-stone-900">Ani Duvari</a></li>
                <li><a href="#takvim" className="hover:text-stone-900">Ortak Takvim</a></li>
                <li><a href="#mektuplar" className="hover:text-stone-900">Mektuplar</a></li>
                <li><a href="#soru" className="hover:text-stone-900">Gunluk Soru</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">Kurumsal</p>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                <li><button onClick={() => showToast("Gizlilik metni demo")} className="hover:text-stone-900">Gizlilik</button></li>
                <li><button onClick={() => showToast("Kosullar demo")} className="hover:text-stone-900">Kullanim Kosullari</button></li>
                <li><button onClick={() => showToast("KVKK demo")} className="hover:text-stone-900">KVKK</button></li>
                <li><button onClick={() => showToast("Iletisim demo")} className="hover:text-stone-900">Iletisim</button></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">Bulten</p>
              <p className="text-sm text-stone-600 mt-3">Yeni ozellikler icin e-posta birakin.</p>
              <div className="mt-3 flex gap-2">
                <input placeholder="E-posta adresiniz" className="flex-1 h-9 px-3 rounded-full border border-stone-200 bg-stone-50 text-sm outline-none focus:border-stone-300" />
                <button onClick={() => showToast("Bulten kaydi demo")} className="h-9 px-4 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-black inline-flex items-center gap-1">
                  Gonder <IconArrow className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-stone-500">
            <p>© 2026 bizimhikayemiz. Tum haklari saklidir. Demo surum.</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full border border-stone-200 bg-stone-50 font-medium">TR • TRY</span>
              <span className="px-2.5 py-1 rounded-full bg-stone-900 text-white font-semibold">Mobil App • Expo</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Letter Modal */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setActiveLetter(null)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-[#fffdf8] shadow-2xl border border-stone-200 overflow-hidden">
            <div className="h-1 bg-stone-900" />
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">Mektup • {activeLetter.date}</p>
                  <p className="font-serif text-xl font-semibold mt-1">{activeLetter.from} → {activeLetter.to}</p>
                </div>
                <button onClick={() => setActiveLetter(null)} className="h-8 w-8 rounded-full bg-stone-900 text-white grid place-items-center hover:bg-black">
                  <IconClose className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5 rounded-xl bg-white border border-stone-200 p-5 leading-7 text-stone-800 font-serif text-[15px]">{activeLetter.full}</div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-full shadow-xl text-sm font-medium flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/70" />
          {toast}
        </div>
      )}
    </div>
  );
}
