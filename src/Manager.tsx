
import { useEffect, useState, type FormEvent } from "react";

const API = "https://codlont-manager-backend.onrender.com";

const sections = [
  { key: "homepage", label: "Homepage" },
  { key: "about", label: "About" },
  { key: "projects", label: "Research projects" },
  { key: "blog", label: "Blog posts" },
  { key: "contact", label: "Contact details" },
];

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    background: "#f4f6fa",
    color: "#172033",
    fontFamily: "Inter, Arial, sans-serif",
  },
  sidebar: {
    width: 230,
    background: "#111827",
    color: "#fff",
    padding: 24,
    boxSizing: "border-box",
    flexShrink: 0,
  },
  brand: { fontSize: 23, fontWeight: 800, letterSpacing: 1 },
  muted: { color: "#94a3b8", fontSize: 13 },
  main: { flex: 1, padding: "32px 5%", minWidth: 0 },
  card: {
    background: "#fff",
    border: "1px solid #e5e9f1",
    borderRadius: 14,
    padding: 24,
    marginTop: 22,
    boxShadow: "0 3px 12px rgba(15,23,42,.03)",
  },
  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d8deea",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginTop: 7,
    marginBottom: 17,
    background: "#fff",
    color: "#172033",
  },
  button: {
    border: 0,
    borderRadius: 8,
    background: "#5145cd",
    color: "#fff",
    padding: "11px 16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondary: {
    border: "1px solid #d8deea",
    borderRadius: 8,
    background: "#fff",
    color: "#172033",
    padding: "10px 13px",
    cursor: "pointer",
  },
};

export default function Manager() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("homepage");
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function request(
    path: string,
    options: RequestInit = {},
    authToken = token
  ) {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    return data;
  }

  async function loadDashboard(activeToken: string) {
    const [contentResult, messageResult] = await Promise.all([
      request("/api/content", {}, activeToken),
      request("/api/admin/messages", {}, activeToken),
    ]);

    const savedContent = contentResult.content || {};
    setContent(savedContent);
    setDraft(JSON.stringify(savedContent[section] ?? {}, null, 2));
    setMessages(messageResult.messages || []);
  }

  useEffect(() => {
    const savedToken = window.localStorage.getItem("codlont_manager_token");
    if (!savedToken) return;

    let active = true;

    async function restoreSession() {
      try {
        await request("/api/auth/me", {}, savedToken!);
        if (!active) return;
        setToken(savedToken!);
        await loadDashboard(savedToken!);
      } catch {
        window.localStorage.removeItem("codlont_manager_token");
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setDraft(JSON.stringify(content[section] ?? {}, null, 2));
    setNotice("");
    setError("");
  }, [section, content]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const result = await request(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
        ""
      );

      window.localStorage.setItem("codlont_manager_token", result.token);
      setToken(result.token);
      setPassword("");
      await loadDashboard(result.token);
    } catch (err) {
      setLoginError(
        err instanceof Error ? err.message : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveContent() {
    setNotice("");
    setError("");

    let parsed: unknown;
    try {
      parsed = JSON.parse(draft);
    } catch {
      setError("The content isn't valid JSON. Please check the text and try again.");
      return;
    }

    setLoading(true);
    try {
      await request(`/api/admin/content/${section}`, {
        method: "PUT",
        body: JSON.stringify({ content: parsed }),
      });

      setContent((previous) => ({ ...previous, [section]: parsed }));
      setNotice("Changes saved successfully to the database.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save changes.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id: number) {
    if (!window.confirm("Delete this contact message permanently?")) return;

    try {
      await request(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages((previous) => previous.filter((item) => item.id !== id));
      setNotice("Contact message deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete message.");
    }
  }

  function logout() {
    window.localStorage.removeItem("codlont_manager_token");
    setToken("");
    setContent({});
    setMessages([]);
    setNotice("");
    setError("");
  }

  if (!token) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#f4f6fa",
        display: "grid",
        placeItems: "center",
        padding: 20,
        fontFamily: "Inter, Arial, sans-serif",
      }}>
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            maxWidth: 420,
            boxSizing: "border-box",
            background: "#fff",
            border: "1px solid #e5e9f1",
            borderRadius: 18,
            padding: 32,
            boxShadow: "0 15px 50px rgba(15,23,42,.08)",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, color: "#5145cd" }}>
            CODLONT<span style={{ color: "#172033" }}>.</span>
          </div>
          <p style={{ color: "#64748b", marginBottom: 30 }}>
            Website manager · Secure sign in
          </p>

          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: "#64748b", marginBottom: 25 }}>
            Sign in with your configured manager account.
          </p>

          <label htmlFor="manager-email">Email address</label>
          <input
            id="manager-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={styles.input}
          />

          <label htmlFor="manager-password">Password</label>
          <input
            id="manager-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.input}
          />

          {loginError && (
            <p role="alert" style={{ color: "#b91c1c" }}>{loginError}</p>
          )}

          <button type="submit" disabled={loading} style={{ ...styles.button, width: "100%" }}>
            {loading ? "Signing in…" : "Sign in to dashboard"}
          </button>

          <p style={{ color: "#64748b", fontSize: 12, marginTop: 22 }}>
            Your credentials are checked by the Codlont backend.
          </p>
        </form>
      </div>
    );
  }

  const currentSection = sections.find((item) => item.key === section);

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>CODLONT<span style={{ color: "#a5b4fc" }}>.</span></div>
        <p style={{ ...styles.muted, marginBottom: 35 }}>MANAGER CONSOLE</p>

        <p style={styles.muted}>WORKSPACE</p>

        <button
          onClick={() => setSection("overview")}
          style={{
            ...styles.secondary,
            width: "100%",
            textAlign: "left",
            marginBottom: 8,
            background: section === "overview" ? "#3730a3" : "transparent",
            color: "#fff",
            borderColor: "transparent",
          }}
        >
          ◫ Overview
        </button>

        {sections.map((item) => (
          <button
            key={item.key}
            onClick={() => setSection(item.key)}
            style={{
              ...styles.secondary,
              width: "100%",
              textAlign: "left",
              marginBottom: 8,
              background: section === item.key ? "#3730a3" : "transparent",
              color: "#fff",
              borderColor: "transparent",
            }}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={() => setSection("messages")}
          style={{
            ...styles.secondary,
            width: "100%",
            textAlign: "left",
            marginTop: 12,
            background: section === "messages" ? "#3730a3" : "transparent",
            color: "#fff",
            borderColor: "transparent",
          }}
        >
          ✉ Contact messages ({messages.length})
        </button>

        <div style={{ marginTop: 45 }}>
          <button
            onClick={logout}
            style={{ ...styles.secondary, width: "100%" }}
          >
            Sign out
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}>
          <div>
            <p style={{ color: "#5145cd", fontWeight: 700, fontSize: 12 }}>
              CODLONT / MANAGER
            </p>
            <h1 style={{ fontSize: 30, margin: "8px 0" }}>
              {section === "overview"
                ? "Dashboard overview"
                : section === "messages"
                ? "Contact messages"
                : currentSection?.label || "Website manager"}
            </h1>
            <p style={{ color: "#64748b", margin: 0 }}>
              Manage your website content and enquiries.
            </p>
          </div>
          <button style={styles.secondary} onClick={() => loadDashboard(token)}>
            Refresh data
          </button>
        </div>

        {notice && <p role="status" style={{ color: "#166534", marginTop: 20 }}>{notice}</p>}
        {error && <p role="alert" style={{ color: "#b91c1c", marginTop: 20 }}>{error}</p>}

        {section === "overview" && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              marginTop: 25,
            }}>
              {[
                ["Content sections", sections.length],
                ["Contact messages", messages.length],
                ["Research projects", Array.isArray(content.projects) ? content.projects.length : 0],
                ["Blog posts", Array.isArray(content.blog) ? content.blog.length : 0],
              ].map(([label, value]) => (
                <div key={label} style={styles.card}>
                  <p style={{ color: "#64748b", fontSize: 14 }}>{label}</p>
                  <strong style={{ fontSize: 30 }}>{value}</strong>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <h2>Welcome to your manager</h2>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>
                Choose a section in the sidebar to view or edit its saved content.
                Use Contact messages to read enquiries submitted by visitors.
              </p>
              <p style={{ color: "#b45309", lineHeight: 1.7 }}>
                Note: saving content stores it in the database. The public
                website must also be connected to these API endpoints before
                those edits appear on the live homepage.
              </p>
            </div>
          </>
        )}

        {currentSection && (
          <div style={styles.card}>
            <h2>Edit {currentSection.label}</h2>
            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Edit the section data below. This editor uses JSON format, so keep
              the braces, quotation marks, commas, and square brackets valid.
              For projects and blog posts, use a JSON array.
            </p>
            <textarea
              aria-label={`${currentSection.label} content JSON`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              spellCheck={false}
              style={{
                ...styles.input,
                minHeight: 300,
                fontFamily: "Consolas, monospace",
                lineHeight: 1.6,
                resize: "vertical",
              }}
            />
            <button style={styles.button} disabled={loading} onClick={saveContent}>
              {loading ? "Saving…" : "Save changes"}
            </button>
          </div>
        )}

        {section === "messages" && (
          <div style={styles.card}>
            <h2>Visitor enquiries</h2>
            {messages.length === 0 && (
              <p style={{ color: "#64748b" }}>No contact messages have been submitted yet.</p>
            )}

            {messages.map((item) => (
              <article
                key={item.id}
                style={{
                  borderTop: "1px solid #e5e9f1",
                  padding: "20px 0",
                  overflowWrap: "anywhere",
                }}
              >
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: 12,
                }}>
                  <div>
                    <h3 style={{ margin: "0 0 6px" }}>{item.subject || "Website enquiry"}</h3>
                    <p style={{ color: "#64748b", margin: "0 0 12px" }}>
                      {item.name} · {item.email}
                    </p>
                  </div>
                  <button
                    style={styles.secondary}
                    onClick={() => deleteMessage(item.id)}
                  >
                    Delete
                  </button>
                </div>
                <p style={{ lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.message}</p>
                <small style={{ color: "#64748b" }}>
                  {new Date(item.created_at).toLocaleString()}
                </small>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
