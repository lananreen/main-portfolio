export default function BrowserMockup({ url, children }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-neutral-200 shadow-lg">
      <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 md:px-4 md:py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400 md:h-3 md:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 md:h-3 md:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400 md:h-3 md:w-3" />

        <div className="mx-2 min-w-0 flex-1 break-all rounded-md bg-white px-2 py-0.5 text-[10px] text-neutral-500 md:mx-4 md:px-3 md:py-1 md:text-xs">
          {url}
        </div>
      </div>

      <div className="relative aspect-[4/3] bg-white md:aspect-[16/9]">
        {children}
      </div>
    </div>
  );
}
