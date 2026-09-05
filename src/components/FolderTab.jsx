export default function FolderTab({ label, arrow = "↳", side = "left", bgClassName }) {
  const positionClasses = side === "left" ? "left-1 md:left-2" : "right-1 md:right-2";

  return (
    <div
      className={`absolute -top-16 ${positionClasses} z-10 flex items-center gap-3 rounded-t-tab px-12 py-4 text-2xl font-medium text-neutral-800 ${bgClassName}`}
    >
      <span aria-hidden="true">{arrow}</span>
      <span>{label}</span>
    </div>
  );
}