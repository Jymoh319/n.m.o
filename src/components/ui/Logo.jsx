export default function Logo({ size = "md", showText = true }) {
    const dims = {
        sm: { box: "h-11 w-11", text: "text-base", sub: "text-[9px]" },
        md: { box: "h-14 w-14", text: "text-xl", sub: "text-[10px]" },
        lg: { box: "h-16 w-16", text: "text-2xl", sub: "text-[11px]" },
    }[size];

    return (
        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <div
                className={`relative shrink-0 ${dims.box} rounded-2xl border border-[rgba(253,184,19,0.4)] bg-gradient-to-br from-[#0F4C81] to-[#0A2A47] flex items-center justify-center overflow-hidden shadow-[0_18px_50px_-20px_rgba(253,184,19,0.5)]`}
            >
                <img
                    src="/nmo-logo.png"
                    alt="N.M.O Logo"
                    className="h-full w-full object-contain p-1"
                    draggable={false}
                />
            </div>

            {showText && (
                <div className="flex min-w-0 flex-col leading-none">
                    <span className={`${dims.text} font-extrabold tracking-tight text-white truncate`}>
                        N.M.O
                    </span>
                    <span className={`${dims.sub} font-semibold uppercase tracking-[0.3em] text-[#7C8CA3] mt-1 truncate`}>
                        MineCert Pro
                    </span>
                </div>
            )}
        </div>
    );
}
