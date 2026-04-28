export default function Home({ buildEnv }) {
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem" }}>
      <h1>Next.js SSG Environment Variable Test</h1>
      <p>
        These values were read from environment variables at <strong>build time</strong> and baked
        into the static HTML. If they show the expected values, the remote build system injected
        them correctly.
      </p>
      <table
        style={{ borderCollapse: "collapse", marginTop: "1rem" }}
        aria-label="Build-time environment variables"
      >
        <thead>
          <tr>
            <th style={thStyle}>Variable</th>
            <th style={thStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {buildEnv.map(({ name, value }) => (
            <tr key={name}>
              <td style={tdStyle}>{name}</td>
              <td style={tdStyle} data-testid={name}>
                {value ?? <em>(not set)</em>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const thStyle = { border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" };
const tdStyle = { border: "1px solid #ccc", padding: "0.5rem" };

// These env var names are what the remote build system should set.
// NEXT_PUBLIC_* vars are the standard Next.js way to expose env vars to the client bundle,
// but since we read them server-side in getStaticProps, any name works.
const ENV_VARS = [
  "NEXT_PUBLIC_BUILD_ENV",
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_FEATURE_FLAG",
  "MY_SECRET_VAR",
];

export async function getStaticProps() {
  return {
    props: {
      buildEnv: ENV_VARS.map((name) => ({
        name,
        value: process.env[name] ?? null,
      })),
    },
  };
}
