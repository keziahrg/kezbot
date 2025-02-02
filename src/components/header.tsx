import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-2xl flex-row px-5">
      <Link href="/" aria-label="Home" className="block">
        <h1>Kezbot</h1>
      </Link>
    </header>
  );
}
