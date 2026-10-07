"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const N = ["Aria", "Noah", "Mia", "Liam", "Zoe", "Ethan", "Ava", "Leo"], L = ["Stone", "Hart", "Cruz", "Patel", "Kim", "Reed", "Singh", "Moore"];
const S = ["Active", "Pending", "Done"];
const nm = (i) => `${N[i % 8]} ${L[(i * 3) % 8]}`;
const day = (i) => `2026-${String(1 + ((i * 5) % 12)).padStart(2, "0")}-${String(1 + ((i * 7) % 28)).padStart(2, "0")}`;
const cfg = {
  projects: ["Projects", ["Name", "Owner", "Status", "Budget ($)", "Due"], (i) => [`Project ${["Atlas", "Nova", "Orbit", "Pixel", "Lumen"][i % 5]} ${i + 1}`, nm(i), S[i % 3], 5000 + ((i * 1373) % 40000), day(i)]],
  campaigns: ["Campaigns", ["Name", "Channel", "Status", "Spend ($)", "Clicks"], (i) => [`Campaign ${i + 1}`, ["Email", "Search", "Social", "Display"][i % 4], S[(i + 1) % 3], 800 + ((i * 611) % 9000), 120 + ((i * 397) % 5000)]],
  documents: ["Documents", ["Name", "Type", "Owner", "Size (KB)", "Updated"], (i) => [`Doc-${100 + i}`, ["PDF", "Sheet", "Slides", "Doc"][i % 4], nm(i), 40 + ((i * 173) % 2000), day(i + 3)]],
  followers: ["Followers", ["Name", "Email", "Country", "Joined", "Status"], (i) => [nm(i), nm(i).toLowerCase().replace(" ", ".") + "@mail.com", ["India", "USA", "Canada", "UK", "Germany"][i % 5], day(i + 9), S[(i + 2) % 3]]],
};
const badge = { Active: "bg-emerald-500/15 text-emerald-600", Pending: "bg-amber-500/15 text-amber-600", Done: "bg-sky-500/15 text-sky-600" };
const PER = 8;

export default function Page() {
  const { slug } = useParams();
  const c = cfg[slug];
  const [q, setQ] = useState(""), [sort, setSort] = useState({ k: 0, d: 1 }), [pg, setPg] = useState(0);
  const rows = useMemo(() => (c ? Array.from({ length: 37 }, (_, i) => c[2](i)) : []), [c]);
  const view = useMemo(() => {
    const f = rows.filter((r) => r.join(" ").toLowerCase().includes(q.toLowerCase()));
    return f.sort((a, b) => { const x = a[sort.k], y = b[sort.k]; return (typeof x === "number" ? x - y : String(x).localeCompare(y)) * sort.d; });
  }, [rows, q, sort]);

  if (!c) return (
    <main className="p-6"><div className="card p-10 text-center">
      <h1 className="text-lg font-medium capitalize">{String(slug)}</h1>
      <p className="text-sm text-mute mt-2">This page isn't built yet. Add its content in <code>app/[slug]/page.js</code>.</p>
    </div></main>
  );

  const pages = Math.max(1, Math.ceil(view.length / PER)), cur = Math.min(pg, pages - 1);
  const exportCsv = () => {
    const csv = [c[1], ...view].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `${slug}.csv`; a.click();
  };

  return (
    <main className="p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-sm font-medium">{c[0]} <span className="text-mute">({view.length})</span></h1>
        <div className="flex gap-2">
          <input value={q} onChange={(e) => { setQ(e.target.value); setPg(0); }} placeholder={`Search ${c[0].toLowerCase()}`} className="bg-soft rounded-lg px-3 h-8 text-sm outline-none w-44 placeholder:text-mute" />
          <button onClick={exportCsv} className="h-8 px-3 rounded-lg bg-ink text-bg text-sm">Export CSV</button>
        </div>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead><tr className="text-left text-mute border-b border-line">
            {c[1].map((h, k) => (
              <th key={h} className="p-3 font-normal"><button onClick={() => setSort({ k, d: sort.k === k ? -sort.d : 1 })}>{h}{sort.k === k ? (sort.d > 0 ? " ↑" : " ↓") : ""}</button></th>
            ))}
          </tr></thead>
          <tbody>
            {view.slice(cur * PER, cur * PER + PER).map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0 hover:bg-soft">
                {r.map((v, j) => <td key={j} className="p-3">{badge[v] ? <span className={`px-2 py-0.5 rounded-full text-xs ${badge[v]}`}>{v}</span> : typeof v === "number" ? v.toLocaleString("en-US") : v}</td>)}
              </tr>
            ))}
            {!view.length && <tr><td colSpan={5} className="p-8 text-center text-mute">No results for "{q}". Try a different search.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-3 text-sm">
        <span className="text-mute">Page {cur + 1} of {pages}</span>
        <div className="flex gap-2">
          <button disabled={cur === 0} onClick={() => setPg(cur - 1)} className="card px-3 py-1 disabled:opacity-40">Previous</button>
          <button disabled={cur >= pages - 1} onClick={() => setPg(cur + 1)} className="card px-3 py-1 disabled:opacity-40">Next</button>
        </div>
      </div>
    </main>
  );
}
