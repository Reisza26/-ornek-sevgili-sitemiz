"use client";
import { useEffect, useState } from "react";

const START_DATE = new Date("2023-06-14T00:00:00");

const memories = [
  { id: 1, title: "Ilk Bulusma", date: "14 Haziran 2023", place: "Kadikoy", desc: "Kucuk kafede saatlerce konustuk.", img: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&auto=format&fit=crop&q=60" },
  { id: 2, title: "Kapadokya", date: "09 Eylul 2023", place: "Goreme", desc: "Balonlar gokyuzunu boyarken dilek diledik.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=60" },
  { id: 3, title: "Yil Donumu", date: "14 Haziran 2024", place: "Ev", desc: "Her sayfasinda bir animiz olan defter.", img: "https://images.unsplash.com/photo-1516589177381-26e4a50c6197?w=600&auto=format&fit=crop&q=60" },
  { id: 4, title: "Sahilde", date: "22 Agustos 2024", place: "Kilyos", desc: "Sarkimiz calarken sustuk ve izledik.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60" },
  { id: 5, title: "Karlı Pazar", date: "12 Ocak 2025", place: "Ev", desc: "Battaniye, film ve sen.", img: "https://images.unsplash.com/photo-1491002052546-be051a32d50d?w=600&auto=format&fit=crop&q=60" },
  { id: 6, title: "Dun", date: "11 Mayis 2025", place: "Bahce", desc: "Gulusun hala ayni.", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=60" },
];

const letters = [
  { id: 1, from: "Ece", to: "Can", date: "14 Sub 2025", title: "Seni ozlemek", text: "Seni ozlemek, en sevdigim huzun. Cunku biliyorum ki ozlemimin sonunda sen varsin. Iyi ki varsin, iyi ki biz olduk.", locked: false },
  { id: 2, from: "Can", to: "Ece", date: "08 Mar 2025", title: "Bir soz", text: "Her zor gunde elini daha siki tutacagima, her guzel gunde gozlerinin icine ayni heyecanla bakacagima soz veriyorum.", locked: false },
  { id: 3, from: "Ece", to: "Can", date: "14 Haz 2026", title: "Ucuncu yil icin", text: "Bu mektup ucuncu yil donumumuzde acilacak.", locked: true },
];

const events = [
  { d: 14, m: "Haz", t: "Yil Donumumuz", s: "14 Haziran" },
  { d: 22, m: "May", t: "Ece'nin Dogum Gunu", s: "22 Mayis" },
  { d: 3, m: "Tem", t: "Konser", s: "3 Temmuz 20:30" },
];

/* icons */
function IHeart(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={p.c}><path d="M12 21s-6.2-4.2-8.6-7.6C1.1 10 2.4 5.6 6.4 5.1c2.4-.3 4.5 1 5.6 3 1.1-2 3.2-3.3 5.6-3 4 .5 5.3 4.9 3 8.3C18.2 16.8 12 21 12 21z" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IArrow(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={p.c}><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IPlus(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={p.c}><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>; }
function ICalendar(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.c}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/></svg>; }
function IMail(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.c}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ILock(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.c}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 118 0v3" strokeLinecap="round"/><circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/></svg>; }
function IMessage(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.c}><path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 0121 11.5z" strokeLinejoin="round"/><path d="M8 11h8M8 15h5" strokeLinecap="round"/></svg>; }
function IImage(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.c}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="M21 15l-5-5L3 21" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IClose(p: { c?: string }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={p.c}><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/></svg>; }

function useCounter() {
  const [d, setD] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const now = Date.now() - START_DATE.getTime();
      setD({ days: Math.floor(now / 86400000), hours: Math.floor(now / 3600000) % 24, mins: Math.floor(now / 60000) % 60, secs: Math.floor(now / 1000) % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return d;
}

type Tab = "anilar" | "takvim" | "mektuplar" | "soru";

export default function Home() {
  const c = useCounter();
  const [tab, setTab] = useState<Tab>("anilar");
  const [letter, setLetter] = useState<(typeof letters)[number] | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [ans, setAns] = useState("");
  const [sent, setSent] = useState(false);
  const show = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2400); };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf8]">
      {/* header - flat, minimal */}
      <header className="h-[56px] shrink-0 border-b border-stone-200 bg-white flex items-center">
        <div className="mx-auto w-full max-w-[1120px] px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-stone-900 text-white grid place-items-center"><IHeart c="h-3.5 w-3.5" /></div>
            <span className="font-serif text-[18px] tracking-tight">Ece ve Can</span>
            <span className="hidden sm:inline text-stone-300">—</span>
            <span className="hidden sm:inline text-xs tracking-[0.14em] uppercase font-medium text-stone-500">14 Haziran 2023</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="hidden md:inline text-xs text-stone-500 mr-2">{c.days} gun birlikte</span>
            <button onClick={() => show("Ayarlar yakinda")} className="h-8 px-3.5 rounded-full border border-stone-200 bg-white text-xs font-medium hover:bg-stone-50">Ayarlar</button>
            <button onClick={() => show("Paylasildi")} className="h-8 px-3.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-black inline-flex items-center gap-1.5">Paylas <IArrow c="h-3 w-3" /></button>
          </div>
        </div>
      </header>

      {/* main - no scroll page, fixed height */}
      <main className="flex-1 flex flex-col mx-auto w-full max-w-[1120px] px-4 sm:px-6 py-4 sm:py-6 gap-4 min-h-0">
        {/* top row: title + counter + tabs */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 shrink-0">
          <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-7 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-stone-500">Bizim Hikayemiz</p>
            <h1 className="font-serif text-[30px] sm:text-[36px] leading-[0.95] tracking-tight mt-1">Her gun, yan yana</h1>
            <p className="text-sm leading-6 text-stone-600 mt-3 max-w-[520px]">Fotograflar, kucuk notlar ve tarihler. Sade bir duzen icinde sakli. Kaydirmadan, sadece ihtiyac olan.</p>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setTab("anilar")} className={`h-9 px-4 rounded-full text-xs font-semibold border ${tab === "anilar" ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-200 hover:bg-stone-50"}`}>Anilar</button>
              <button onClick={() => setTab("mektuplar")} className={`h-9 px-4 rounded-full text-xs font-semibold border ${tab === "mektuplar" ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-200 hover:bg-stone-50"}`}>Mektuplar</button>
              <button onClick={() => setTab("takvim")} className={`h-9 px-4 rounded-full text-xs font-semibold border ${tab === "takvim" ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-200 hover:bg-stone-50"}`}>Takvim</button>
              <button onClick={() => setTab("soru")} className={`h-9 px-4 rounded-full text-xs font-semibold border ${tab === "soru" ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-200 hover:bg-stone-50"}`}>Gunluk Soru</button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-white border border-stone-200 flex">
            <div className="w-[42%] sm:w-[44%] relative bg-stone-100 shrink-0">
              <img src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=700&auto=format&fit=crop&q=60" alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent hidden sm:block" />
            </div>
            <div className="flex-1 p-5 sm:p-6 flex flex-col">
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">Birlikte</p>
              <p className="font-serif text-2xl font-medium leading-none mt-1">{c.days} gun</p>
              <p className="text-xs text-stone-500 mt-1">14 Haziran 2023’ten beri</p>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="rounded-xl bg-stone-900 text-white text-center py-2.5">
                  <div className="font-mono text-sm font-semibold">{String(c.hours).padStart(2, "0")}</div>
                  <div className="text-[10px] tracking-widest opacity-60">SAAT</div>
                </div>
                <div className="rounded-xl bg-stone-900 text-white text-center py-2.5">
                  <div className="font-mono text-sm font-semibold">{String(c.mins).padStart(2, "0")}</div>
                  <div className="text-[10px] tracking-widest opacity-60">DAKIKA</div>
                </div>
                <div className="rounded-xl bg-stone-900 text-white text-center py-2.5">
                  <div className="font-mono text-sm font-semibold">{String(c.secs).padStart(2, "0")}</div>
                  <div className="text-[10px] tracking-widest opacity-60">SANIYE</div>
                </div>
              </div>

              <div className="mt-auto flex gap-2 pt-4">
                <button onClick={() => show("Ani ekleme yakinda")} className="flex-1 h-8 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-black inline-flex items-center justify-center gap-1"><IPlus c="h-3 w-3" /> Ekle</button>
                <button onClick={() => show("Mektup yakinda")} className="flex-1 h-8 rounded-full border border-stone-200 text-xs font-semibold hover:bg-stone-50 inline-flex items-center justify-center gap-1"><IMail c="h-3 w-3" /> Yaz</button>
              </div>
            </div>
          </div>
        </div>

        {/* content area - tab switching, no page scroll */}
        <div className="flex-1 min-h-0 rounded-2xl bg-white border border-stone-200 overflow-hidden flex flex-col">
          {/* tab bar */}
          <div className="h-11 shrink-0 border-b border-stone-200 flex items-center px-2 gap-1 bg-stone-50/60">
            {[
              { k: "anilar", t: "Anilar", i: IImage },
              { k: "takvim", t: "Takvim", i: ICalendar },
              { k: "mektuplar", t: "Mektuplar", i: IMail },
              { k: "soru", t: "Gunluk Soru", i: IMessage },
            ].map((x) => (
              <button key={x.k} onClick={() => setTab(x.k as Tab)} className={`h-7 px-3 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 border ${tab === x.k ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"}`}>
                <x.i c="h-3.5 w-3.5" /> {x.t}
              </button>
            ))}
            <span className="ml-auto hidden sm:inline text-xs text-stone-400">{tab === "anilar" ? "6 ani" : tab === "mektuplar" ? "3 mektup" : tab === "takvim" ? "3 etkinlik" : "Bugun"}</span>
          </div>

          {/* panels */}
          <div className="flex-1 min-h-0 overflow-auto">
            {tab === "anilar" && (
              <div className="p-4 sm:p-5 grid sm:grid-cols-3 gap-4">
                {memories.map((m) => (
                  <div key={m.id} className="rounded-xl border border-stone-200 overflow-hidden bg-white hover:border-stone-300 transition">
                    <div className="h-[140px] overflow-hidden bg-stone-100">
                      <img src={m.img} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-500">{m.date}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-stone-100 border border-stone-200 font-medium">{m.place}</span>
                      </div>
                      <p className="font-serif font-medium leading-tight mt-2">{m.title}</p>
                      <p className="text-xs leading-5 text-stone-600 mt-1 line-clamp-2">{m.desc}</p>
                      <button onClick={() => show(`${m.title} acildi`)} className="mt-3 h-7 px-3 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-black inline-flex items-center gap-1">Oku <IArrow c="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "takvim" && (
              <div className="p-4 sm:p-5 grid sm:grid-cols-3 gap-4">
                {events.map((e) => (
                  <div key={e.t} className="rounded-xl border border-stone-200 p-4 bg-white flex gap-3">
                    <div className="h-12 w-12 rounded-xl bg-stone-900 text-white grid place-items-center leading-none shrink-0">
                      <span className="text-sm font-bold">{e.d}</span>
                      <span className="text-[10px] tracking-widest -mt-1">{e.m}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{e.t}</p>
                      <p className="text-xs text-stone-500">{e.s}</p>
                      <button onClick={() => show("Etkinlik duzenle yakinda")} className="mt-2 h-7 px-3 rounded-full border border-stone-200 text-xs font-medium hover:bg-stone-50 inline-flex items-center gap-1">Duzenle <IArrow c="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
                <button onClick={() => show("Yeni etkinlik yakinda")} className="rounded-xl border border-dashed border-stone-300 p-4 flex flex-col items-center justify-center gap-2 hover:bg-stone-50 text-sm font-medium text-stone-600">
                  <span className="h-8 w-8 rounded-full bg-stone-900 text-white grid place-items-center"><IPlus c="h-4 w-4" /></span> Etkinlik Ekle
                </button>
              </div>
            )}

            {tab === "mektuplar" && (
              <div className="p-4 sm:p-5 grid sm:grid-cols-3 gap-4">
                {letters.map((l) => (
                  <div key={l.id} className={`rounded-xl border p-4 flex flex-col ${l.locked ? "bg-stone-50 border-dashed" : "bg-white"}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-900 text-white">{l.from} → {l.to}</span>
                      {l.locked ? <ILock c="h-4 w-4 text-stone-400" /> : <IMail c="h-4 w-4 text-stone-400" />}
                    </div>
                    <p className="text-xs text-stone-500 mt-3">{l.date}</p>
                    <p className="font-medium text-sm mt-1">{l.title}</p>
                    <p className={`text-xs leading-5 mt-1 flex-1 ${l.locked ? "text-stone-500 italic" : "text-stone-600"}`}>{l.locked ? "Kilitli — dogru gunde acilir" : l.text.slice(0, 90) + "…"}</p>
                    <button onClick={() => (l.locked ? show("Bu mektup 14 Haz 2026’da acilacak") : setLetter(l))} className={`mt-3 h-7 px-3 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${l.locked ? "border border-stone-200 bg-white hover:bg-stone-50" : "bg-stone-900 text-white hover:bg-black"}`}>
                      {l.locked ? "Kilitli" : "Ac"} <IArrow c="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === "soru" && (
              <div className="p-4 sm:p-6 max-w-[720px] mx-auto">
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-5 text-center">
                  <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">Gunluk Soru</p>
                  <p className="font-serif text-xl mt-2">“Birlikte yaslaninca ilk ne yapmak istersin?”</p>
                  <p className="text-xs text-stone-500 mt-1">Her gun 09:00’da yenilenir</p>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {[
                    { n: "Ece", t: "Ege’de kucuk bir tas ev, bahcede limon agaci ve her sabah seninle cay.", ti: "2 saat once" },
                    { n: "Can", t: "Torunlara ilk bulusmamizi anlatmak, ayni kafeye tekrar gitmek.", ti: "1 saat once" },
                  ].map((a) => (
                    <div key={a.n} className="rounded-xl border border-stone-200 p-4 bg-white">
                      <div className="flex items-center gap-2">
                        <img src={a.n === "Ece" ? "https://i.pravatar.cc/100?img=32" : "https://i.pravatar.cc/100?img=15"} alt="" className="h-7 w-7 rounded-full" />
                        <span className="font-medium text-sm">{a.n}</span>
                        <span className="text-xs text-stone-500">• {a.ti}</span>
                      </div>
                      <p className="text-sm leading-5 text-stone-700 mt-2">{a.t}</p>
                      <button onClick={() => show("Yanit duzenle yakinda")} className="mt-3 h-7 px-3 rounded-full border border-stone-200 text-xs font-medium hover:bg-stone-50">Duzenle</button>
                    </div>
                  ))}
                </div>

                {!sent ? (
                  <div className="mt-4 flex gap-2">
                    <input value={ans} onChange={(e) => setAns(e.target.value)} placeholder="Cevabini yaz..." className="flex-1 h-9 px-4 rounded-full border border-stone-200 bg-white text-sm outline-none focus:border-stone-300" />
                    <button onClick={() => { if (!ans.trim()) return show("Lutfen cevap yaz"); setSent(true); show("Cevabin kaydedildi"); }} className="h-9 px-5 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-black inline-flex items-center gap-1.5">Gonder <IArrow c="h-3 w-3" /></button>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl bg-stone-900 text-white p-4 text-center text-sm">Cevabin kaydedildi — “{ans}”</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="shrink-0 border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-[1120px] px-6 h-10 flex items-center justify-between text-xs text-stone-500">
          <span>© 2026 Ece ve Can</span>
          <span className="hidden sm:inline">Gizlilik • Kosullar • Iletisim</span>
          <span>TR • Türkçe</span>
        </div>
      </footer>

      {letter && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setLetter(null)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-[#fffdf8] border border-stone-200 shadow-xl overflow-hidden">
            <div className="h-1 bg-stone-900" />
            <div className="p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">{letter.date}</p>
                  <p className="font-serif text-lg font-medium mt-1">{letter.from} → {letter.to}</p>
                </div>
                <button onClick={() => setLetter(null)} className="h-8 w-8 rounded-full bg-stone-900 text-white grid place-items-center"><IClose c="h-4 w-4" /></button>
              </div>
              <p className="font-serif text-[15px] leading-7 text-stone-800 mt-4">{letter.text}</p>
              <div className="mt-5 flex gap-2">
                <button onClick={() => show("Yanit yaz yakinda")} className="h-8 px-4 rounded-full bg-stone-900 text-white text-xs font-semibold inline-flex items-center gap-1">Yanit Yaz <IArrow c="h-3 w-3" /></button>
                <button onClick={() => setLetter(null)} className="h-8 px-4 rounded-full border border-stone-200 text-xs font-medium">Kapat</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">{toast}</div>}
    </div>
  );
}
