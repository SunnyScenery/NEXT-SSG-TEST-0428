import Link from "next/link";

export default function RunTime({ env }) {
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem" }}>
      <Link href="/">← Home</Link>
      <h1>Run-time Environment Variables</h1>
      <p>
        These values are read fresh from the environment on every request.
        Change them without rebuilding to see updated values.
      </p>
      <EnvTable data={env} />
      <p style={{ marginTop: "1rem", color: "#666" }}>
        Refresh the page — <code>RUN_TIMESTAMP</code> changes every time.
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
  return {
    props: {
      env: {
        RUNTIME_ENV: process.env.RUNTIME_ENV ?? null,
        RUNTIME_API_URL: process.env.RUNTIME_API_URL ?? null,
        RUNTIME_SECRET: process.env.RUNTIME_SECRET ?? null,
        RUN_TIMESTAMP: new Date().toISOString(),
      },
    },
  };
}
