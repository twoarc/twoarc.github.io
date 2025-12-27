export default function AppCard({ app }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
      <div className="p-5 flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-amber-300 shadow-lg shadow-fuchsia-500/20 grid place-items-center shrink-0">
          <span className="text-xl font-black">{app.iconLetter}</span>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-extrabold tracking-tight">{app.name}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-black/30 border border-white/10 text-white/70">
              {app.tag}
            </span>
          </div>
          <p className="text-sm text-white/70 mt-1">{app.desc}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {app.badges.map((b) => (
              <span
                key={b}
                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            <a
              href={app.playUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:opacity-90 transition"
            >
              View on Play Store
            </a>
            <button
              className="px-4 py-2 rounded-xl bg-black/30 border border-white/10 text-sm font-semibold text-white/80 hover:text-white hover:bg-black/40 transition"
              onClick={() => alert("Coming soon: app details page ✨")}
            >
              Details
            </button>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 opacity-60 group-hover:opacity-100 transition" />
    </div>
  );
}
