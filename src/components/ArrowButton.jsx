import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ArrowButton({ direction = "left", onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous screenshot" : "Next screenshot"}
      className="shrink-0 rounded-full border border-white/15 bg-white/10 backdrop-blur-md p-1.5 text-white/70 shadow-lg transition-all hover:scale-110 hover:text-white hover:border-white/30 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:p-2"
    >
      <Icon size={28} strokeWidth={2.5} aria-hidden="true" className="md:hidden" />
      <Icon size={40} strokeWidth={2.5} aria-hidden="true" className="hidden md:block" />
    </button>
  );
}
