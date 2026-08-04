import { motion } from "framer-motion";

const variantStyles = {
    blue: "btn btn-blue",
    green: "btn btn-green",
    purple: "btn btn-purple",
    amber: "btn btn-amber",
    red: "btn btn-red",
    cyan: "btn btn-cyan",
    teal: "btn btn-teal",
    navy: "btn btn-navy",
    indigo: "btn btn-indigo",
    gold: "btn btn-gold",
    ghost: "btn btn-ghost",
    slate: "btn btn-ghost",
};

export default function GlassButton({
    children,
    className = "",
    icon,
    variant = "blue",
    size = "md",
    ...props
}) {
    const style = variantStyles[variant] || variantStyles.blue;
    const sizeClass =
        size === "sm"
            ? "min-h-[2.4rem] px-3.5 py-2 text-sm"
            : size === "lg"
                ? "min-h-[3.4rem] px-6 py-3 text-[17px]"
                : "";

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`${style} ${sizeClass} ${className}`}
            {...props}
        >
            {icon ? <span className="inline-flex items-center justify-center">{icon}</span> : null}
            {children}
        </motion.button>
    );
}
