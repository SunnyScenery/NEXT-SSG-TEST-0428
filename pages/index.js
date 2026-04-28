import Link from "next/link";

export default function Home() {
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem" }}>
      <h1>Env Var Validation</h1>
      <ul style={{ lineHeight: "2" }}>
        <li>
          <Link href="/build-time">Build-time env vars</Link> — captured once
          during <code>next build</code>, frozen in the bundle
        </li>
        <li>
          <Link href="/run-time">Run-time env vars</Link> — read fresh on every
          request via SSR
        </li>
      </ul>
    </main>
  );
}
