export default function GlassInput({ label, icon, className = "", ...props }) {
    return (
        <label className="group relative block w-full">
            {label ? (
                <span className="mb-2 block text-sm font-semibold text-[#B9C6D6] transition-colors group-focus-within:text-[#FDB813]">
                    {label}
                </span>
            ) : null}

            {icon ? (
                <div className="input-icon">
                    <span className="icon">{icon}</span>
                    <input {...props} className={`input ${className}`} />
                </div>
            ) : (
                <input {...props} className={`input ${className}`} />
            )}
        </label>
    );
}
