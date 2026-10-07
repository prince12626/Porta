import Link from "next/link";

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.04em] text-[#f2f2f2]"
      aria-label="Porta home"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="9"
          fill="#e1e1e1"
        />
        <path
          d="M11 23V9h6.4a4.2 4.2 0 0 1 0 8.4H11"
          stroke="#1c1c1c"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
        <path
          d="M21.5 22.5h-1.8a3.6 3.6 0 0 1 0-7.2h1.8"
          stroke="#1c1c1c"
          strokeLinecap="round"
          strokeWidth="2.4"
        />
      </svg>
      Porta
    </Link>
  );
}
