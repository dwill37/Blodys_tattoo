/** Typographic "Blodys" wordmark with a single crimson drop for the dot. No logo file was provided. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`display inline-flex items-end leading-none text-bone ${className}`}>
      Blodys
      <span
        aria-hidden="true"
        className="mb-[0.1em] ml-[0.08em] inline-block h-[0.17em] w-[0.17em] rotate-45 rounded-[0_50%_50%_50%] bg-blood-bright"
      />
    </span>
  );
}
