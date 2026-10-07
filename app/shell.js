"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Icon = ({ d, c = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const I = {
  menu: "M4 6h16M4 12h16M4 18h16", sun: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
  moon: "M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z", bell: "M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3", chev: "M9 6l6 6-6 6", x: "M6 6l12 12M18 6L6 18",
};
const nav = [
  ["Dashboards", [["Overview", "/"], ["eCommerce", "/ecommerce"], ["Projects", "/projects"]]],
  ["Pages", [["User Profile", null, [["Overview", "/"], ["Projects", "/projects"], ["Campaigns", "/campaigns"], ["Documents", "/documents"], ["Followers", "/followers"]]],
    ["Account", "/account"], ["Corporate", "/corporate"], ["Blog", "/blog"], ["Social", "/social"]]],
];
const first = [
  { t: "You fixed a bug.", w: "Just now", r: false }, { t: "New user registered.", w: "59 minutes ago", r: false },
  { t: "You fixed a bug.", w: "12 hours ago", r: true }, { t: "Andi Lane subscribed to you.", w: "Today, 11:59 AM", r: true },
];

function Sidebar({ open, setOpen, q }) {
  const path = usePathname();
  const [exp, setExp] = useState({ "User Profile": true });
  const match = (s) => s.toLowerCase().includes(q.toLowerCase());
  const row = (on) => `block w-full text-left text-sm py-2 rounded-lg ${on ? "bg-soft font-medium" : "hover:bg-soft"}`;
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed lg:sticky top-0 z-40 h-screen w-60 shrink-0 bg-card border-r border-line p-4 overflow-y-auto transition-transform ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-sm"><span className="w-7 h-7 rounded-full bg-ink text-bg grid place-items-center text-[10px] font-semibold">B</span>ByeWind</div>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><Icon d={I.x} /></button>
        </div>
        {nav.map(([h, items]) => (
          <div key={h} className="mb-5">
            <div className="text-sm text-mute mb-1">{h}</div>
            {items.filter(([n, , ch]) => match(n) || ch?.some(([c]) => match(c))).map(([n, href, ch]) => (
              <div key={n}>
                {ch ? (
                  <button onClick={() => setExp({ ...exp, [n]: !exp[n] })} className={`${row(false)} flex items-center gap-2 px-2`}>
                    <Icon d={I.chev} c={`w-3 h-3 text-mute transition ${exp[n] ? "rotate-90" : ""}`} /><span className="w-4 h-4 rounded border border-mute/60" />{n}
                  </button>
                ) : (
                  <Link href={href} onClick={() => setOpen(false)} className={`${row(path === href)} flex items-center gap-2 px-2 pl-7`}>
                    <span className="w-4 h-4 rounded border border-mute/60" />{n}
                  </Link>
                )}
                {ch && exp[n] && ch.filter(([c]) => match(c)).map(([c, href2]) => (
                  <Link key={c} href={href2} onClick={() => setOpen(false)} className={`${row(path === href2)} pl-11`}>{c}</Link>
                ))}
              </div>
            ))}
          </div>
        ))}
        <div className="mt-8 text-center text-sm font-semibold text-sky-500">❄ SnowUI</div>
      </aside>
    </>
  );
}

export default function Shell({ children }) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [bell, setBell] = useState(false);
  const [ns, setNs] = useState(first);
  const path = usePathname();
  const unread = ns.filter((n) => !n.r).length;

  useEffect(() => {
    try { const d = localStorage.getItem("theme") === "dark"; setDark(d); document.documentElement.classList.toggle("dark", d); } catch {}
  }, []);
  const toggleTheme = () => {
    const d = !dark; setDark(d); document.documentElement.classList.toggle("dark", d);
    try { localStorage.setItem("theme", d ? "dark" : "light"); } catch {}
  };
  const crumb = path === "/" ? "Default" : path.slice(1).replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen} q={q} />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-card/90 backdrop-blur border-b border-line px-4 sm:px-6 h-14 flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Icon d={I.menu} c="w-5 h-5" /></button>
          <div className="hidden sm:flex text-sm gap-2"><span className="text-mute">Dashboards</span><span className="text-mute">/</span><span>{crumb}</span></div>
          <div className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-2 bg-soft rounded-lg px-3 h-8 w-36 sm:w-52 text-sm">
              <Icon d={I.search} c="w-3.5 h-3.5 text-mute" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search menu" className="bg-transparent outline-none w-full placeholder:text-mute" />
            </label>
            <button onClick={toggleTheme} aria-label="Toggle theme"><Icon d={dark ? I.moon : I.sun} c="w-[18px] h-[18px]" /></button>
            <div className="relative">
              <button onClick={() => setBell(!bell)} aria-label="Notifications" className="relative">
                <Icon d={I.bell} c="w-[18px] h-[18px]" />
                {unread > 0 && <i className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 rounded-full bg-red-500 text-white text-[9px] grid place-items-center not-italic">{unread}</i>}
              </button>
              {bell && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setBell(false)} />
                  <div className="absolute right-0 top-8 z-20 w-72 card p-3 shadow-lg text-sm">
                    <div className="flex justify-between mb-2"><b className="font-medium">Notifications</b>
                      <button className="text-xs text-sky-500" onClick={() => setNs(ns.map((n) => ({ ...n, r: true })))}>Mark all as read</button></div>
                    {ns.map((n, i) => (
                      <button key={i} onClick={() => setNs(ns.map((m, j) => (j === i ? { ...m, r: true } : m)))} className="w-full text-left flex gap-2 p-2 rounded-lg hover:bg-soft">
                        <i className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.r ? "bg-transparent" : "bg-sky-500"}`} />
                        <span>{n.t}<span className="block text-xs text-mute">{n.w}</span></span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
