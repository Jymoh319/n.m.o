import { X } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Modal({ open, onClose, title, children, footer, size = "md" }) {
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    const sizes = {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                className="absolute inset-0 bg-[#040B14]/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative w-full ${sizes[size]} panel-strong max-h-[90vh] flex flex-col overflow-hidden`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(255,255,255,0.08)]">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/5 text-[#B9C6D6] transition hover:bg-white/10 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

                {footer && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
                        {footer}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
