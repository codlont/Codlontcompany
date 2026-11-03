
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

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: string;
  cover_image?: string;
  created_at?: string;
  updated_at?: string;
};

type MediaItem = {
  id: number;
  file_name: string;
  file_url: string;
  mime_type?: string;
  created_at?: string;
};

type ResearchFolder = {
  id: number;
  name: string;
  description?: string;
};

type ResearchItem = {
  id: number;
  file_name: string;
  original_name?: string;
  mime_type?: string;
  folder_id?: number | null;
  created_at?: string;
};

type ActivityItem = {
  id: number;
  action: string;
  details?: string;
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
    width: 245,
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
    minWidth: 0,
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
  danger: {
    border: "1px solid #fecaca",
    borderRadius: 8,
    background: "#fff",
    color: "#b91c1c",
    padding: "10px 13px",
    cursor: "pointer",
  },
  label: {
    display: "block",
    fontWeight: 700,
    fontSize: 14,
    marginTop: 12,
  },
  navButton: {
    width: "100%",
    textAlign: "left",
    marginBottom: 8,
    color: "#fff",
    borderColor: "transparent",
    background: "transparent",
  },
};

export default function Manager() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [section, setSection] = useState("overview");
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [draft, setDraft] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [folders, setFolders] = useState<ResearchFolder[]>([]);
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  // Blog editor
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogStatus, setBlogStatus] = useState("draft");
  const [blogCover, setBlogCover] = useState("");

  // Media library
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  // Research repository
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [researchFile, setResearchFile] = useState<File | null>(null);
  const [selectedFolder, setSelectedFolder] = useState("");

  function clearMessages() {
    setNotice("");
    setError("");
  }

  async function request(
    path: string,
    options: RequestInit = {},
    authToken = token
  ) {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
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

  async function loadBlog() {
    const result = await request("/api/admin/blog");
    setBlogPosts(result.posts || []);
  }

  async function loadMedia() {
    const result = await request("/api/admin/media");
    setMedia(result.media || []);
  }

  async function loadResearch() {
    const [folderResult, researchResult] = await Promise.all([
      request("/api/admin/research/folders"),
      request("/api/admin/research"),
    ]);

    setFolders(folderResult.folders || []);
    setResearch(researchResult.items || researchResult.research || []);
  }

  async function loadActivity() {
    const result = await request("/api/admin/activity");
    setActivity(result.activity || []);
  }

  async function refreshCurrentSection() {
    clearMessages();
    setLoading(true);

    try {
      await loadDashboard(token);

      if (section === "blog") await loadBlog();
      if (section === "media") await loadMedia();
      if (section === "research") await loadResearch();
      if (section === "activity") await loadActivity();

      setNotice("Data refreshed successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not refresh data.");
    } finally {
      setLoading(false);
    }
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
    clearMessages();
  }, [section, content]);

  useEffect(() => {
    if (!token) return;

    async function loadSelectedSection() {
      try {
        if (section === "blog") await loadBlog();
        if (section === "media") await loadMedia();
        if (section === "research") await loadResearch();
        if (section === "activity") await loadActivity();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load this section.");
      }
    }

    void loadSelectedSection();
  }, [section, token]);

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
    clearMessages();

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

    clearMessages();

    try {
      await request(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages((previous) => previous.filter((item) => item.id !== id));
      setNotice("Contact message deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete message.");
    }
  }

  // BLOG MANAGEMENT

  function resetBlogForm() {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogSlug("");
    setBlogExcerpt("");
    setBlogContent("");
    setBlogStatus("draft");
    setBlogCover("");
  }

  function editBlog(post: BlogPost) {
    setEditingBlogId(post.id);
    setBlogTitle(post.title || "");
    setBlogSlug(post.slug || "");
    setBlogExcerpt(post.excerpt || "");
    setBlogContent(post.content || "");
    setBlogStatus(post.status || "draft");
    setBlogCover(post.cover_image || "");
    clearMessages();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveBlog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();
    setLoading(true);

    const payload = {
      title: blogTitle,
      slug: blogSlug,
      excerpt: blogExcerpt,
      content: blogContent,
      status: blogStatus,
      cover_image: blogCover,
    };

    try {
      if (editingBlogId) {
        await request(`/api/admin/blog/${editingBlogId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setNotice("Blog post updated successfully.");
      } else {
        await request("/api/admin/blog", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setNotice("Blog post created successfully.");
      }

      resetBlogForm();
      await loadBlog();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save blog post.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlog(id: number) {
    if (!window.confirm("Delete this blog post permanently?")) return;

    clearMessages();

    try {
      await request(`/api/admin/blog/${id}`, { method: "DELETE" });
      setBlogPosts((previous) => previous.filter((post) => post.id !== id));
      setNotice("Blog post deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete blog post.");
    }
  }

  // MEDIA LIBRARY

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!mediaFile) {
      setError("Choose an image to upload first.");
      return;
    }

    clearMessages();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", mediaFile);

      await request("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      setMediaFile(null);
      setNotice("Media uploaded successfully.");
      await loadMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Media upload failed.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMedia(id: number) {
    if (!window.confirm("Delete this media file permanently?")) return;

    clearMessages();

    try {
      await request(`/api/admin/media/${id}`, { method: "DELETE" });
      setMedia((previous) => previous.filter((item) => item.id !== id));
      setNotice("Media file deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete media.");
    }
  }

  // PRIVATE RESEARCH REPOSITORY

  async function createFolder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!folderName.trim()) {
      setError("Enter a folder name.");
      return;
    }

    clearMessages();
    setLoading(true);

    try {
      await request("/api/admin/research/folders", {
        method: "POST",
        body: JSON.stringify({
          name: folderName,
          description: folderDescription,
        }),
      });

      setFolderName("");
      setFolderDescription("");
      setNotice("Research folder created.");
      await loadResearch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create folder.");
    } finally {
      setLoading(false);
    }
  }

  async function uploadResearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!researchFile) {
      setError("Choose a research file first.");
      return;
    }

    clearMessages();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", researchFile);

      if (selectedFolder) {
        formData.append("folder_id", selectedFolder);
      }

      await request("/api/admin/research/upload", {
        method: "POST",
        body: formData,
      });

      setResearchFile(null);
      setNotice("Research file uploaded to private storage.");
      await loadResearch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Research upload failed.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadResearch(id: number) {
    clearMessages();

    try {
      const result = await request(`/api/admin/research/${id}/download`);

      if (!result.url) {
        throw new Error("The backend did not return a download link.");
      }

      window.open(result.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not download file.");
    }
  }

  async function deleteResearch(id: number) {
    if (!window.confirm("Permanently delete this research file?")) return;

    clearMessages();

    try {
      await request(`/api/admin/research/${id}`, { method: "DELETE" });
      setResearch((previous) => previous.filter((item) => item.id !== id));
      setNotice("Research file deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete research file.");
    }
  }

  function logout() {
    window.localStorage.removeItem("codlont_manager_token");
    setToken("");
    setContent({});
    setMessages([]);
    setBlogPosts([]);
    setMedia([]);
    setFolders([]);
    setResearch([]);
    setActivity([]);
    setNotice("");
    setError("");
  }

  function navButton(key: string, label: string) {
    return (
      <button
        key={key}
        onClick={() => setSection(key)}
        style={{
          ...styles.secondary,
          ...styles.navButton,
          background: section === key ? "#3730a3" : "transparent",
        }}
      >
        {label}
      </button>
    );
  }

  if (!token) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f6fa",
          display: "grid",
          placeItems: "center",
          padding: 20,
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
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
            <p role="alert" style={{ color: "#b91c1c" }}>
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, width: "100%" }}
          >
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
        <div style={styles.brand}>
          CODLONT<span style={{ color: "#a5b4fc" }}>.</span>
        </div>

        <p style={{ ...styles.muted, marginBottom: 35 }}>MANAGER CONSOLE</p>
        <p style={styles.muted}>WORKSPACE</p>

        {navButton("overview", "◫ Overview")}

        <p style={{ ...styles.muted, marginTop: 25 }}>WEBSITE CONTENT</p>

        {sections.map((item) => navButton(item.key, item.label))}

        <p style={{ ...styles.muted, marginTop: 25 }}>MANAGEMENT TOOLS</p>

        {navButton("messages", `✉ Contact messages (${messages.length})`)}
        {navButton("media", "▧ Media library")}
        {navButton("research", "▣ Research repository")}
        {navButton("activity", "◷ Activity history")}

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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <p style={{ color: "#5145cd", fontWeight: 700, fontSize: 12 }}>
              CODLONT / MANAGER
            </p>

            <h1 style={{ fontSize: 30, margin: "8px 0" }}>
              {section === "overview"
                ? "Dashboard overview"
                : section === "messages"
                ? "Contact messages"
                : section === "media"
                ? "Media library"
                : section === "research"
                ? "Private research repository"
                : section === "activity"
                ? "Activity history"
                : currentSection?.label || "Website manager"}
            </h1>

            <p style={{ color: "#64748b", margin: 0 }}>
              Manage your website, media, research files and enquiries.
            </p>
          </div>

          <button
            style={styles.secondary}
            onClick={refreshCurrentSection}
            disabled={loading}
          >
            {loading ? "Refreshing…" : "Refresh data"}
          </button>
        </div>

        {notice && (
          <p role="status" style={{ color: "#166534", marginTop: 20 }}>
            {notice}
          </p>
        )}

        {error && (
          <p role="alert" style={{ color: "#b91c1c", marginTop: 20 }}>
            {error}
          </p>
        )}

        {/* OVERVIEW */}

        {section === "overview" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 16,
                marginTop: 25,
              }}
            >
              {[
                ["Content sections", sections.length],
                ["Contact messages", messages.length],
                [
                  "Research projects",
                  Array.isArray(content.projects) ? content.projects.length : 0,
                ],
                ["Blog posts", blogPosts.length],
                ["Media files", media.length],
                ["Research files", research.length],
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
                Use the sidebar to manage website content, blog posts, media
                uploads, private research files and visitor enquiries.
              </p>
              <p style={{ color: "#b45309", lineHeight: 1.7 }}>
                Your website's public pages must also use the relevant API
                endpoints before newly saved content appears to visitors.
              </p>
            </div>
          </>
        )}

        {/* EXISTING WEBSITE CONTENT EDITOR */}

        {currentSection && (
          <div style={styles.card}>
            <h2>Edit {currentSection.label}</h2>

            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Edit the section data below. This editor uses JSON format, so
              keep the braces, quotation marks, commas and square brackets
              valid. For projects and blog posts, use a JSON array.
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

            <button
              style={styles.button}
              disabled={loading}
              onClick={saveContent}
            >
              {loading ? "Saving…" : "Save changes"}
            </button>
          </div>
        )}

        {/* CONTACT MESSAGES */}

        {section === "messages" && (
          <div style={styles.card}>
            <h2>Visitor enquiries</h2>

            {messages.length === 0 && (
              <p style={{ color: "#64748b" }}>
                No contact messages have been submitted yet.
              </p>
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
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 6px" }}>
                      {item.subject || "Website enquiry"}
                    </h3>

                    <p style={{ color: "#64748b", margin: "0 0 12px" }}>
                      {item.name} · {item.email}
                    </p>
                  </div>

                  <button
                    style={styles.danger}
                    onClick={() => deleteMessage(item.id)}
                  >
                    Delete
                  </button>
                </div>

                <p style={{ lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {item.message}
                </p>

                <small style={{ color: "#64748b" }}>
                  {new Date(item.created_at).toLocaleString()}
                </small>
              </article>
            ))}
          </div>
        )}

        {/* BLOG EDITOR */}

        {section === "blog" && (
          <>
            <div style={styles.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <h2>{editingBlogId ? "Edit blog post" : "Create a blog post"}</h2>

                {editingBlogId && (
                  <button style={styles.secondary} onClick={resetBlogForm}>
                    Cancel editing
                  </button>
                )}
              </div>

              <form onSubmit={saveBlog}>
                <label style={styles.label} htmlFor="blog-title">
                  Post title
                </label>
                <input
                  id="blog-title"
                  style={styles.input}
                  required
                  value={blogTitle}
                  onChange={(event) => {
                    setBlogTitle(event.target.value);
                    if (!editingBlogId) {
                      setBlogSlug(
                        event.target.value
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")
                      );
                    }
                  }}
                  placeholder="Enter your article title"
                />

                <label style={styles.label} htmlFor="blog-slug">
                  URL slug
                </label>
                <input
                  id="blog-slug"
                  style={styles.input}
                  required
                  value={blogSlug}
                  onChange={(event) => setBlogSlug(event.target.value)}
                  placeholder="example-article-title"
                />

                <label style={styles.label} htmlFor="blog-excerpt">
                  Short description
                </label>
                <textarea
                  id="blog-excerpt"
                  style={{ ...styles.input, minHeight: 80 }}
                  value={blogExcerpt}
                  onChange={(event) => setBlogExcerpt(event.target.value)}
                  placeholder="A short introduction to your article"
                />

                <label style={styles.label} htmlFor="blog-cover">
                  Cover image URL
                </label>
                <input
                  id="blog-cover"
                  style={styles.input}
                  value={blogCover}
                  onChange={(event) => setBlogCover(event.target.value)}
                  placeholder="Paste an uploaded media URL here"
                />

                <label style={styles.label} htmlFor="blog-content">
                  Article content
                </label>
                <textarea
                  id="blog-content"
                  required
                  style={{
                    ...styles.input,
                    minHeight: 240,
                    lineHeight: 1.6,
                  }}
                  value={blogContent}
                  onChange={(event) => setBlogContent(event.target.value)}
                  placeholder="Write your full article here..."
                />

                <label style={styles.label} htmlFor="blog-status">
                  Publication status
                </label>
                <select
                  id="blog-status"
                  style={styles.input}
                  value={blogStatus}
                  onChange={(event) => setBlogStatus(event.target.value)}
                >
                  <option value="draft">Save as draft</option>
                  <option value="published">Publish article</option>
                </select>

                <button type="submit" style={styles.button} disabled={loading}>
                  {loading
                    ? "Saving…"
                    : editingBlogId
                    ? "Update blog post"
                    : "Create blog post"}
                </button>
              </form>
            </div>

            <div style={styles.card}>
              <h2>Existing blog posts ({blogPosts.length})</h2>

              {blogPosts.length === 0 && (
                <p style={{ color: "#64748b" }}>
                  No blog posts have been created yet.
                </p>
              )}

              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  style={{
                    borderTop: "1px solid #e5e9f1",
                    padding: "18px 0",
                    overflowWrap: "anywhere",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 7px" }}>{post.title}</h3>
                      <p style={{ color: "#64748b", margin: 0 }}>
                        /{post.slug} · {post.status}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        style={styles.secondary}
                        onClick={() => editBlog(post)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.danger}
                        onClick={() => deleteBlog(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {post.excerpt && (
                    <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </>
        )}

        {/* MEDIA LIBRARY */}

        {section === "media" && (
          <>
            <div style={styles.card}>
              <h2>Upload media</h2>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                Upload images for use on the Codlont website and in blog posts.
              </p>

              <form onSubmit={uploadMedia}>
                <label style={styles.label} htmlFor="media-file">
                  Choose image
                </label>

                <input
                  id="media-file"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  style={styles.input}
                  onChange={(event) =>
                    setMediaFile(event.target.files?.[0] || null)
                  }
                />

                {mediaFile && (
                  <p style={{ color: "#64748b" }}>
                    Selected: {mediaFile.name}
                  </p>
                )}

                <button
                  type="submit"
                  style={styles.button}
                  disabled={loading || !mediaFile}
                >
                  {loading ? "Uploading…" : "Upload image"}
                </button>
              </form>
            </div>

            <div style={styles.card}>
              <h2>Uploaded media ({media.length})</h2>

              {media.length === 0 && (
                <p style={{ color: "#64748b" }}>
                  No media files have been uploaded yet.
                </p>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                  gap: 18,
                }}
              >
                {media.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid #e5e9f1",
                      borderRadius: 10,
                      padding: 12,
                      minWidth: 0,
                    }}
                  >
                    <img
                      src={item.file_url}
                      alt={item.file_name}
                      style={{
                        width: "100%",
                        height: 140,
                        objectFit: "cover",
                        borderRadius: 7,
                        background: "#f1f5f9",
                      }}
                    />

                    <p
                      style={{
                        fontSize: 13,
                        overflowWrap: "anywhere",
                        color: "#475569",
                      }}
                    >
                      {item.file_name}
                    </p>

                    <button
                      style={{
                        ...styles.secondary,
                        width: "100%",
                        marginBottom: 8,
                      }}
                      onClick={() => {
                        void navigator.clipboard.writeText(item.file_url);
                        setNotice("Image URL copied.");
                        setError("");
                      }}
                    >
                      Copy image URL
                    </button>

                    <button
                      style={{ ...styles.danger, width: "100%" }}
                      onClick={() => deleteMedia(item.id)}
                    >
                      Delete image
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PRIVATE RESEARCH REPOSITORY */}

        {section === "research" && (
          <>
            <div style={styles.card}>
              <h2>Create research folder</h2>

              <form onSubmit={createFolder}>
                <label style={styles.label} htmlFor="folder-name">
                  Folder name
                </label>
                <input
                  id="folder-name"
                  style={styles.input}
                  required
                  value={folderName}
                  onChange={(event) => setFolderName(event.target.value)}
                  placeholder="e.g. Product Development"
                />

                <label style={styles.label} htmlFor="folder-description">
                  Description
                </label>
                <textarea
                  id="folder-description"
                  style={{ ...styles.input, minHeight: 75 }}
                  value={folderDescription}
                  onChange={(event) => setFolderDescription(event.target.value)}
                  placeholder="What is this folder for?"
                />

                <button
                  type="submit"
                  style={styles.button}
                  disabled={loading}
                >
                  Create folder
                </button>
              </form>
            </div>

            <div style={styles.card}>
              <h2>Upload research file</h2>

              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                Research files are stored in private storage. Downloads require
                an authenticated manager session.
              </p>

              <form onSubmit={uploadResearch}>
                <label style={styles.label} htmlFor="research-folder">
                  Destination folder
                </label>

                <select
                  id="research-folder"
                  style={styles.input}
                  value={selectedFolder}
                  onChange={(event) => setSelectedFolder(event.target.value)}
                >
                  <option value="">No folder / Main repository</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>

                <label style={styles.label} htmlFor="research-file">
                  Choose research file
                </label>

                <input
                  id="research-file"
                  type="file"
                  style={styles.input}
                  onChange={(event) =>
                    setResearchFile(event.target.files?.[0] || null)
                  }
                />

                {researchFile && (
                  <p style={{ color: "#64748b" }}>
                    Selected: {researchFile.name}
                  </p>
                )}

                <button
                  type="submit"
                  style={styles.button}
                  disabled={loading || !researchFile}
                >
                  {loading ? "Uploading…" : "Upload research file"}
                </button>
              </form>
            </div>

            <div style={styles.card}>
              <h2>Research folders ({folders.length})</h2>

              {folders.length === 0 && (
                <p style={{ color: "#64748b" }}>
                  No research folders have been created.
                </p>
              )}

              {folders.map((folder) => (
                <div
                  key={folder.id}
                  style={{
                    borderTop: "1px solid #e5e9f1",
                    padding: "14px 0",
                  }}
                >
                  <strong>{folder.name}</strong>
                  {folder.description && (
                    <p style={{ color: "#64748b", marginBottom: 0 }}>
                      {folder.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div style={styles.card}>
              <h2>Stored research files ({research.length})</h2>

              {research.length === 0 && (
                <p style={{ color: "#64748b" }}>
                  No research files have been uploaded yet.
                </p>
              )}

              {research.map((item) => (
                <article
                  key={item.id}
                  style={{
                    borderTop: "1px solid #e5e9f1",
                    padding: "16px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div style={{ minWidth: 0, overflowWrap: "anywhere" }}>
                    <strong>{item.original_name || item.file_name}</strong>
                    <p style={{ color: "#64748b", fontSize: 13, margin: "6px 0" }}>
                      {item.mime_type || "Research file"}
                      {item.created_at
                        ? ` · ${new Date(item.created_at).toLocaleDateString()}`
                        : ""}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={styles.secondary}
                      onClick={() => downloadResearch(item.id)}
                    >
                      Download
                    </button>

                    <button
                      style={styles.danger}
                      onClick={() => deleteResearch(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* ACTIVITY HISTORY */}

        {section === "activity" && (
          <div style={styles.card}>
            <h2>Manager activity</h2>

            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              A record of management actions recorded by the backend.
            </p>

            {activity.length === 0 && (
              <p style={{ color: "#64748b" }}>
                No activity records are available yet.
              </p>
            )}

            {activity.map((item) => (
              <article
                key={item.id}
                style={{
                  borderTop: "1px solid #e5e9f1",
                  padding: "16px 0",
                }}
              >
                <strong>{item.action}</strong>

                {item.details && (
                  <p style={{ color: "#64748b", margin: "7px 0" }}>
                    {item.details}
                  </p>
                )}

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
