import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

function useAnimatedNumber(target, duration = 1200) {
    const [value, setValue] = useState(0);
    const raf = useRef(null);

    useEffect(() => {
        const start = performance.now();
        const from = 0;

        const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(from + (target - from) * eased));
            if (progress < 1) raf.current = requestAnimationFrame(tick);
        };

        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
    }, [target, duration]);

    return value;
}

export default function StatCard({
    label,
    value = 0,
    icon: Icon,
    gradient = "from-[#0F4C81] to-[#1E6FB8]",
    trend = "up",
    trendLabel = "Live backend data",
    suffix = "",
    delay = 0,
}) {
    const animated = useAnimatedNumber(value);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="premium-card p-6"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#7C8CA3]">
                        {label}
                    </p>
                    <p className="mt-3 text-4xl font-extrabold tracking-tight text-white">
                        {animated.toLocaleString()}
                        {suffix}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                        {trend === "up" ? (
                            <TrendingUp size={16} className="trend-up" />
                        ) : (
                            <TrendingDown size={16} className="trend-down" />
                        )}
                        <span className="text-[#B9C6D6]">{trendLabel}</span>
                    </div>
                </div>

                <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-[0_14px_40px_-14px_rgba(15,76,129,0.8)]`}
                >
                    <Icon size={26} className="text-white" />
                </div>
            </div>

            {/* Small trend sparkline */}
            <div className="mt-5 flex h-8 items-end gap-1">
                {[34, 48, 40, 62, 55, 74, 66, 88].map((h, i) => (
                    <motion.span
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.6, delay: delay + 0.3 + i * 0.05 }}
                        className="w-full rounded-sm bg-gradient-to-t from-[#FDB813]/30 to-[#FDB813]/70"
                    />
                ))}
            </div>
        </motion.div>
    );
}
