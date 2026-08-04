export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        panel
        rounded-3xl
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
