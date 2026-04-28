import Link from "next/link";

const CAPTURED_AT_BUILD = {
  BUILD_ENV: process.env.BUILD_ENV ?? null,
  BUILD_API_URL: process.env.BUILD_API_URL ?? null,
  BUILD_SECRET: process.env.BUILD_SECRET ?? null,
  BUILD_TIMESTAMP: new Date().toISOString(),
};

export default function BuildTime({ env }) {
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem" }}>
      <Link href="/">← Home</Link>
      <h1>Build-time Environment Variables</h1>
      <p>
        These values were captured once during <code>next build</code> and are
        frozen in the server bundle. They never change between requests.
      </p>
      <EnvTable data={env} />
      <p style={{ marginTop: "1rem", color: "#666" }}>
        Refresh the page — <code>BUILD_TIMESTAMP</code> stays the same.
      </p>
    </main>
  );
}

function EnvTable({ data }) {
  return (
    <table style={{ borderCollapse: "collapse", marginTop: "1rem" }}>
      <thead>
        <tr>
          <th style={cell}>Variable</th>
          <th style={cell}>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([k, v]) => (
          <tr key={k}>
            <td style={cell}>{k}</td>
            <td style={cell} data-testid={k}>{v ?? <em>(not set)</em>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const cell = { border: "1px solid #ccc", padding: "0.5rem" };

export async function getServerSideProps() {
  return { props: { env: CAPTURED_AT_BUILD } };
}
