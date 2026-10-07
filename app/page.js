"use client";
import { useState } from "react";

const statsByRange = {
  "Today": [["Views", "7,265", "+11.01%", 1, "t1"], ["Visits", "3,671", "-0.03%", 0, "t2"], ["New Users", "156", "+15.03%", 1, "t1"], ["Active Users", "2,318", "+6.08%", 1, "t2"]],
  "This week": [["Views", "41,820", "+8.4%", 1, "t1"], ["Visits", "22,104", "+2.1%", 1, "t2"], ["New Users", "1,094", "-1.2%", 0, "t1"], ["Active Users", "9,870", "+4.5%", 1, "t2"]],
  "This month": [["Views", "168,300", "+12.7%", 1, "t1"], ["Visits", "91,450", "+5.6%", 1, "t2"], ["New Users", "4,880", "+9.3%", 1, "t1"], ["Active Users", "38,200", "-0.8%", 0, "t2"]],
};
const series = {
  "Total Users": [[11, 14, 18, 15, 22, 18, 24], [9, 17, 10, 14, 27, 20, 29]],
  "Total Projects": [[6, 9, 8, 14, 12, 18, 16], [8, 6, 12, 10, 15, 13, 20]],
  "Operating Status": [[20, 18, 22, 25, 21, 26, 28], [15, 19, 17, 20, 23, 22, 24]],
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const sites = [["Google", 80], ["YouTube", 60], ["Instagram", 45], ["Pinterest", 100], ["Facebook", 35], ["Twitter", 55]];
const devices = [["Linux", 18], ["Mac", 30], ["iOS", 22], ["Windows", 31], ["Android", 14], ["Other", 26]];
const devColors = ["#a8c5e8", "#6ee7c8", "#111", "#7ab8ff", "#b497e8", "#6edb8a"];
const locs = [["United States", 52.1, "#222"], ["Canada", 22.8, "#7ab8ff"], ["Mexico", 13.9, "#8fe3b0"], ["Other", 11.2, "#a8c5e8"]];
const notifs = [["You fixed a bug.", "Just now"], ["New user registered.", "59 minutes ago"], ["You fixed a bug.", "12 hours ago"], ["Andi Lane subscribed to you.", "Today, 11:59 AM"]];
const acts = [["Changed the style.", "Just now", "#c084fc"], ["Released a new version.", "59 minutes ago", "#34d399"], ["Submitted a bug.", "12 hours ago", "#60a5fa"], ["Modified A data in Page X.", "Today, 11:59 AM", "#f59e0b"], ["Deleted a page in Project X.", "Feb 2, 2026", "#38bdf8"]];
const contacts = [["Natali Craig", "#f472b6"], ["Drew Cano", "#fbbf24"], ["Andi Lane", "#60a5fa"], ["Koray Okumus", "#34d399"], ["Kate Morrison", "#a78bfa"], ["Melody Macy", "#fb7185"]];
const nav = [
  ["Dashboards", [["Overview"], ["eCommerce"], ["Projects"]]],
  ["Pages", [["User Profile", ["Overview", "Projects", "Campaigns", "Documents", "Followers"]], ["Account"], ["Corporate"], ["Blog"], ["Social"]]],
];

const Icon = ({ d, c = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const I = {
  menu: "M4 6h16M4 12h16M4 18h16", sun: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
  moon: "M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z", bell: "M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3", chev: "M9 6l6 6-6 6", x: "M6 6l12 12M18 6L6 18",
};
const smooth = (p) => p.reduce((d, [x, y], i, a) => {
  if (!i) return `M${x},${y}`;
  const cx = (a[i - 1][0] + x) / 2;
  return `${d} C${cx},${a[i - 1][1]} ${cx},${y} ${x},${y}`;
}, "");
const Avatar = ({ n, c, s = "w-7 h-7" }) => (
  <span className={`${s} rounded-full shrink-0 grid place-items-center text-[10px] font-semibold text-white`} style={{ background: c }}>{n[0]}</span>
);

function RightPanel({ className = "" }) {
  const Title = ({ t }) => <h3 className="text-sm font-medium mb-3">{t}</h3>;
  return (
    <div className={`space-y-6 text-sm ${className}`}>
      <div><Title t="Notifications" />
        {notifs.map(([a, t], i) => <div key={i} className="flex gap-3 mb-3"><span className="w-6 h-6 rounded-lg bg-t1 shrink-0" /><div><div>{a}</div><div className="text-xs text-mute">{t}</div></div></div>)}
      </div>
      <div><Title t="Activities" />
        {acts.map(([a, t, c], i) => <div key={i} className="flex gap-3 mb-3"><Avatar n={a} c={c} s="w-6 h-6" /><div><div>{a}</div><div className="text-xs text-mute">{t}</div></div></div>)}
      </div>
      <div><Title t="Contacts" />
        {contacts.map(([n, c]) => <div key={n} className="flex items-center gap-3 mb-3"><Avatar n={n} c={c} s="w-6 h-6" />{n}</div>)}
      </div>
    </div>
  );
}

function LineChart({ tab, year }) {
  const [a, b] = series[tab];
  const pts = (arr) => arr.map((v, i) => [40 + i * 90, 200 - (v / 30) * 180]);
  const [hover, setHover] = useState(null);
  return (
    <svg viewBox="0 0 620 240" className="w-full h-auto">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".12" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
      {[0, 10, 20, 30].map((v) => (
        <g key={v}><text x="0" y={204 - (v / 30) * 180} className="fill-mute text-[11px]">{v}K</text>
          <line x1="36" x2="610" y1={200 - (v / 30) * 180} y2={200 - (v / 30) * 180} className="stroke-line" /></g>
      ))}
      {months.map((m, i) => <text key={m} x={40 + i * 90} y="228" textAnchor="middle" className="fill-mute text-[11px]">{m}</text>)}
      {year.last && <path d={smooth(pts(b))} fill="none" stroke="#a5a8f5" strokeWidth="1.5" strokeDasharray="4 4" />}
      {year.this && <>
        <path d={`${smooth(pts(a))} L580,200 L40,200Z`} fill="url(#g)" className="text-ink" />
        <path d={smooth(pts(a))} fill="none" className="stroke-ink" strokeWidth="1.8" />
        {pts(a).map(([x, y], i) => (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <circle cx={x} cy={y} r="14" fill="transparent" />
            {hover === i && <><circle cx={x} cy={y} r="4" className="fill-ink" /><rect x={x - 22} y={y - 30} width="44" height="20" rx="6" className="fill-ink" /><text x={x} y={y - 16} textAnchor="middle" className="fill-bg text-[11px]">{a[i]}K</text></>}
          </g>
        ))}
      </>}
    </svg>
  );
}

function Donut() {
  const C = 2 * Math.PI * 40;
  let off = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90 shrink-0">
      {locs.map(([n, p, c]) => { const el = <circle key={n} cx="50" cy="50" r="40" fill="none" stroke={c} strokeWidth="18" strokeDasharray={`${(p * C) / 100 - 1} ${C}`} strokeDashoffset={-off} />; off += (p * C) / 100; return el; })}
    </svg>
  );
}

export default function Page() {
  const [tab, setTab] = useState("Total Users");
  const [year, setYear] = useState({ this: true, last: true });
  const [range, setRange] = useState("Today");
  const stats = statsByRange[range];

  return (
    <div className="flex flex-1 min-w-0">
      <main className="flex-1 min-w-0 p-4 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-medium">Overview</h1>
              <select value={range} onChange={(e) => setRange(e.target.value)} className="text-xs bg-transparent text-mute outline-none">
                {["Today", "This week", "This month"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>

            <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map(([l, v, d, up, t]) => (
                <div key={l} className={`rounded-2xl p-5 bg-${t}`} style={{ background: `var(--${t})` }}>
                  <div className="text-sm">{l}</div>
                  <div className="flex items-end justify-between mt-2 gap-2 flex-wrap">
                    <span className="text-2xl font-semibold">{v}</span>
                    <span className="text-xs">{d} {up ? "↗" : "↘"}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="grid lg:grid-cols-3 gap-4">
              <div className="card p-5 lg:col-span-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
                  {Object.keys(series).map((t) => <button key={t} onClick={() => setTab(t)} className={tab === t ? "font-medium" : "text-mute"}>{t}</button>)}
                  <span className="hidden sm:block h-3 w-px bg-line" />
                  {[["this", "This year"], ["last", "Last year"]].map(([k, l]) => (
                    <button key={k} onClick={() => setYear({ ...year, [k]: !year[k] })} className={`text-xs flex items-center gap-1.5 ${year[k] ? "" : "opacity-40"}`}>
                      <i className="w-1.5 h-1.5 rounded-full bg-ink" />{l}
                    </button>
                  ))}
                </div>
                <LineChart tab={tab} year={year} />
              </div>
              <div className="card p-5">
                <h3 className="text-sm font-medium mb-4">Traffic by Website</h3>
                <div className="space-y-4">
                  {sites.map(([n, w]) => (
                    <div key={n} className="flex items-center justify-between text-xs gap-3">
                      <span>{n}</span>
                      <span className="flex h-1 w-24 rounded bg-soft overflow-hidden"><i className="bg-ink" style={{ width: `${w * 0.5}%` }} /><i className="bg-mute/50" style={{ width: `${w * 0.2}%` }} /></span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="text-sm font-medium mb-4">Traffic by Device</h3>
                <div className="flex items-end justify-between gap-2 sm:gap-4 h-44">
                  {devices.map(([n, v], i) => (
                    <div key={n} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                      <span className="text-[10px] text-mute opacity-0 group-hover:opacity-100">{v}K</span>
                      <div className="w-full max-w-9 rounded-lg transition-all" style={{ height: `${(v / 32) * 100}%`, background: devColors[i] }} />
                      <span className="text-[11px] text-mute">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <h3 className="text-sm font-medium mb-4">Traffic by Location</h3>
                <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
                  <Donut />
                  <ul className="flex-1 min-w-[150px] space-y-2 text-xs">
                    {locs.map(([n, p, c]) => <li key={n} className="flex justify-between"><span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />{n}</span><span>{p}%</span></li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section className="card p-5">
              <h3 className="text-sm font-medium mb-4">Marketing &amp; SEO</h3>
              <div className="flex items-end gap-2 h-24">
                {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60, 85, 50].map((h, i) => <div key={i} className="flex-1 rounded-md bg-t2" style={{ height: `${h}%` }} />)}
              </div>
            </section>

            <RightPanel className="xl:hidden card p-5" />
          </main>
          <aside className="hidden xl:block w-72 shrink-0 border-l border-line bg-card p-5 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <RightPanel />
          </aside>
    </div>
  );
}
