import { useState } from 'react';
import Manager from './Manager';
import {
  Atom,
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FlaskConical,
  Globe2,
  Mail,
  Menu,
  Microscope,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

type Page = 'Home' | 'About' | 'Research' | 'Blog' | 'Contact' | 'Manager Login';

const navigation: Page[] = [
  'Home',
  'About',
  'Research',
  'Blog',
  'Contact',
  'Manager Login',
];

const researchAreas = [
  {
    icon: ShieldCheck,
    number: '01',
    title: 'Safety Technology',
    description:
      'Exploring practical technologies that can help people identify risks and make safer decisions.',
  },
  {
    icon: Microscope,
    number: '02',
    title: 'Scientific Research',
    description:
      'Investigating ideas, testing concepts, and turning research questions into useful knowledge.',
  },
  {
    icon: Cpu,
    number: '03',
    title: 'Smart Engineering',
    description:
      'Developing thoughtful engineering concepts that combine creativity, electronics, and technology.',
  },
  {
    icon: BrainCircuit,
    number: '04',
    title: 'Intelligent Systems',
    description:
      'Exploring how software, sensors, and data can support better real-world solutions.',
  },
];

const articles = [
  {
    category: 'RESEARCH',
    title: 'From a curious question to a working concept',
    description:
      'A look at how observation, research, and careful experimentation can shape a new idea.',
    date: 'Research notes',
  },
  {
    category: 'ENGINEERING',
    title: 'Why prototypes matter in innovation',
    description:
      'Understanding how early models help teams discover challenges before building a final solution.',
    date: 'Engineering insights',
  },
  {
    category: 'TECHNOLOGY',
    title: 'Building technology around real problems',
    description:
      'Why useful innovation starts by understanding the people and environments a solution serves.',
    date: 'Technology journal',
  },
];

function App() {
  const [page, setPage] = useState<Page>('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(nextPage: Page) {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => navigate('Home')}
          aria-label="Codlont home"
        >
          <span className="brand-mark">
            <Atom size={25} strokeWidth={1.8} />
          </span>
          <span className="brand-name">
            CODLONT<span className="brand-dot">.</span>
            <small>RESEARCH & INNOVATION</small>
          </span>
        </button>

        <div className="header-right">
          <span className="header-status">
            <span className="status-dot" />
            CURIOUS MINDS. PRACTICAL IDEAS.
          </span>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="dropdown-menu" aria-label="Main navigation">
            <p className="menu-eyebrow">EXPLORE CODLONT</p>
            {navigation.map((item, index) => (
              <button
                key={item}
                className={`menu-link ${page === item ? 'active' : ''}`}
                onClick={() => navigate(item)}
              >
                <span className="menu-index">0{index + 1}</span>
                <span>{item}</span>
                <ChevronRight size={17} />
              </button>
            ))}
            <div className="menu-footer">Research. Create. Discover.</div>
          </nav>
        )}
      </header>

      <main>
        {page === 'Home' && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="eyebrow-line" />
                  AN INDEPENDENT RESEARCH INITIATIVE
                </div>
                <h1>
                  Ideas today.
                  <br />
                  <span>Innovations</span>
                  <br />
                  for tomorrow.
                </h1>
                <p className="hero-description">
                  We explore science, research, and emerging technology to
                  develop creative ideas for a safer and smarter world.
                </p>
                <div className="hero-actions">
                  <button
                    className="button button-dark"
                    onClick={() => navigate('Research')}
                  >
                    Explore our research <ArrowRight size={17} />
                  </button>
                  <button
                    className="button button-light"
                    onClick={() => navigate('About')}
                  >
                    Discover Codlont
                  </button>
                </div>
                <div className="hero-note">
                  <span className="note-icon">
                    <Sparkles size={16} />
                  </span>
                  Driven by curiosity. Built around possibilities.
                </div>
              </div>

              <div className="hero-visual" aria-label="Abstract scientific illustration">
                <div className="visual-glow" />
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />
                <div className="science-core">
                  <Atom size={112} strokeWidth={0.85} />
                </div>
                <div className="floating-card floating-card-top">
                  <span className="floating-icon purple">
                    <FlaskConical size={19} />
                  </span>
                  <span>
                    <strong>Research</strong>
                    <small>Explore the unknown</small>
                  </span>
                </div>
                <div className="floating-card floating-card-bottom">
                  <span className="floating-icon green">
                    <ShieldCheck size={19} />
                  </span>
                  <span>
                    <strong>Real-world impact</strong>
                    <small>Ideas with purpose</small>
                  </span>
                </div>
                <div className="visual-caption">
                  <span>01 / THE POSSIBLE</span>
                  <span>SCIENCE × CREATIVITY</span>
                </div>
                <span className="visual-plus plus-one">+</span>
                <span className="visual-plus plus-two">+</span>
              </div>

              <div className="hero-bottom">
                <span>INQUISITIVE BY NATURE</span>
                <ArrowDown size={16} />
                <span>SCROLL TO EXPLORE</span>
              </div>
            </section>

            <section className="intro-strip">
              <div className="intro-label">OUR PURPOSE</div>
              <p>
                Good questions lead to better discoveries. We bring research,
                creative thinking, and technology together to explore what is
                possible.
              </p>
              <div className="intro-symbol">
                <Globe2 size={31} strokeWidth={1.2} />
              </div>
            </section>

            <section className="section research-section">
              <div className="section-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-line" />
                    WHAT WE EXPLORE
                  </div>
                  <h2>
                    Curiosity is our
                    <br />
                    <span>starting point.</span>
                  </h2>
                </div>
                <p>
                  From early research to technology concepts, our interests
                  connect scientific thinking with meaningful challenges.
                </p>
              </div>

              <div className="research-grid">
                {researchAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <article className="research-card" key={area.number}>
                      <div className="research-card-top">
                        <span className="research-icon">
                          <Icon size={25} strokeWidth={1.6} />
                        </span>
                        <span className="card-number">{area.number}</span>
                      </div>
                      <h3>{area.title}</h3>
                      <p>{area.description}</p>
                      <button
                        className="text-link"
                        onClick={() => navigate('Research')}
                      >
                        Learn more <ArrowRight size={15} />
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="feature-section">
              <div className="feature-art">
                <div className="feature-art-ring ring-a" />
                <div className="feature-art-ring ring-b" />
                <div className="feature-art-ring ring-c" />
                <div className="feature-art-center">
                  <BrainCircuit size={82} strokeWidth={1.1} />
                </div>
                <span className="feature-chip chip-a">IDEAS</span>
                <span className="feature-chip chip-b">RESEARCH</span>
                <span className="feature-chip chip-c">DISCOVERY</span>
              </div>
              <div className="feature-copy">
                <div className="eyebrow">
                  <span className="eyebrow-line" />
                  HOW WE THINK
                </div>
                <h2>
                  Big questions.
                  <br />
                  <span>Thoughtful answers.</span>
                </h2>
                <p>
                  Innovation is more than a finished product. It begins with
                  understanding a problem, investigating the evidence, testing
                  possibilities, and learning from every result.
                </p>
                <ul className="principle-list">
                  <li>
                    <CheckCircle2 size={19} />
                    <span>Research before assumptions</span>
                  </li>
                  <li>
                    <CheckCircle2 size={19} />
                    <span>Experimentation with purpose</span>
                  </li>
                  <li>
                    <CheckCircle2 size={19} />
                    <span>Practical thinking and continuous learning</span>
                  </li>
                </ul>
                <button
                  className="button button-dark"
                  onClick={() => navigate('About')}
                >
                  Get to know us <ArrowRight size={17} />
                </button>
              </div>
            </section>

            <section className="section journal-section">
              <div className="section-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-line" />
                    IDEAS IN PROGRESS
                  </div>
                  <h2>
                    Notes from the
                    <br />
                    <span>world of discovery.</span>
                  </h2>
                </div>
                <button
                  className="button button-light"
                  onClick={() => navigate('Blog')}
                >
                  Visit the journal <ArrowRight size={16} />
                </button>
              </div>
              <div className="article-grid">
                {articles.map((article, index) => (
                  <article className="article-card" key={article.title}>
                    <div className={`article-art article-art-${index + 1}`}>
                      {index === 0 && <Microscope size={48} />}
                      {index === 1 && <Cpu size={48} />}
                      {index === 2 && <Atom size={48} />}
                      <span className="article-art-number">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="article-content">
                      <span className="article-category">{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      <button
                        className="text-link"
                        onClick={() => navigate('Blog')}
                      >
                        Read journal <ArrowRight size={15} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="contact-banner">
              <div className="banner-icon">
                <Mail size={27} />
              </div>
              <div>
                <div className="eyebrow">HAVE A QUESTION OR AN IDEA?</div>
                <h2>Let's start a conversation.</h2>
                <p>We welcome thoughtful questions, research ideas, and enquiries.</p>
              </div>
              <button
                className="button button-white"
                onClick={() => navigate('Contact')}
              >
                Contact Codlont <ArrowRight size={17} />
              </button>
            </section>
          </>
        )}

        {page === 'About' && (
          <section className="inner-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              WHO WE ARE
            </div>
            <h1>
              A curious mind.
              <br />
              <span>A world of possibilities.</span>
            </h1>
            <p className="inner-lead">
              Codlont is a research and innovation initiative focused on
              exploring scientific ideas and developing technology concepts
              with practical value.
            </p>
            <div className="inner-feature-grid">
              <article className="inner-feature">
                <Atom size={32} />
                <h3>Our mission</h3>
                <p>
                  To investigate useful ideas and explore how science and
                  technology can help address real-world challenges.
                </p>
              </article>
              <article className="inner-feature">
                <Globe2 size={32} />
                <h3>Our vision</h3>
                <p>
                  A future where curiosity, thoughtful research, and responsible
                  innovation help people make progress.
                </p>
              </article>
              <article className="inner-feature">
                <FlaskConical size={32} />
                <h3>Our approach</h3>
                <p>
                  Ask questions, investigate carefully, test ideas, and keep
                  learning as concepts develop.
                </p>
              </article>
            </div>
            <button
              className="button button-dark"
              onClick={() => navigate('Research')}
            >
              Explore our research <ArrowRight size={17} />
            </button>
          </section>
        )}

        {page === 'Research' && (
          <section className="inner-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              RESEARCH & DEVELOPMENT
            </div>
            <h1>
              Exploring ideas.
              <br />
              <span>Creating possibilities.</span>
            </h1>
            <p className="inner-lead">
              Our areas of interest bring scientific curiosity together with
              engineering, software, and safety-focused technology concepts.
              These are focus areas, not a claim that every concept is already
              a finished or commercially available product.
            </p>
            <div className="research-grid inner-research-grid">
              {researchAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <article className="research-card" key={area.number}>
                    <div className="research-card-top">
                      <span className="research-icon">
                        <Icon size={25} />
                      </span>
                      <span className="card-number">{area.number}</span>
                    </div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="research-note">
              <ShieldCheck size={24} />
              <div>
                <h3>Research with responsibility</h3>
                <p>
                  Safety-related concepts require appropriate testing,
                  independent validation, and clear communication of
                  limitations before real-world use.
                </p>
              </div>
            </div>
          </section>
        )}

        {page === 'Blog' && (
          <section className="inner-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE CODLONT JOURNAL
            </div>
            <h1>
              Ideas worth
              <br />
              <span>exploring.</span>
            </h1>
            <p className="inner-lead">
              Notes on science, engineering, research methods, and the process
              of turning questions into useful concepts.
            </p>
            <div className="article-grid inner-article-grid">
              {articles.map((article, index) => (
                <article className="article-card" key={article.title}>
                  <div className={`article-art article-art-${index + 1}`}>
                    {index === 0 && <Microscope size={48} />}
                    {index === 1 && <Cpu size={48} />}
                    {index === 2 && <Atom size={48} />}
                    <span className="article-art-number">0{index + 1}</span>
                  </div>
                  <div className="article-content">
                    <span className="article-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <span className="article-date">{article.date}</span>
                  </div>
                </article>
              ))}
            </div>
            <p className="journal-disclaimer">
              These are introductory journal topics. Full articles can be
              published here as your research and writing develop.
            </p>
          </section>
        )}

        {page === 'Contact' && (
          <section className="inner-page contact-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              GET IN TOUCH
            </div>
            <h1>
              Every good idea
              <br />
              <span>starts somewhere.</span>
            </h1>
            <p className="inner-lead">
              Have a question, a research suggestion, or an idea you would like
              to discuss? We would be glad to hear from you.
            </p>
            <div className="contact-method-card">
              <span className="contact-method-icon">
                <Mail size={27} />
              </span>
              <div>
                <h3>Email Codlont</h3>
                <p>
                  Replace the placeholder address below with your official
                  company email before publishing.
                </p>
                <a href="mailto:YOUR_EMAIL@example.com">
                  YOUR_EMAIL@example.com <ArrowRight size={15} />
                </a>
              </div>
            </div>
            <div className="contact-method-card">
              <span className="contact-method-icon">
                <Sparkles size={27} />
              </span>
              <div>
                <h3>Email support</h3>
                <p>
                  Our contact link opens your email application so you can send
                  your enquiry. Automated replies and live chat are not
                  configured yet.
                </p>
                <button
                  className="text-link"
                  onClick={() => {
                    window.location.href = 'mailto:YOUR_EMAIL@example.com';
                  }}
                >
                  Start an email <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </section>
        )}

        {page === 'Manager Login' && <Manager />}
      </main>

      <footer className="site-footer">
        <button className="footer-brand" onClick={() => navigate('Home')}>
          <span className="brand-mark">
            <Atom size={23} />
          </span>
          <span>
            CODLONT<span className="brand-dot">.</span>
          </span>
        </button>
        <p>Researching ideas. Exploring technology. Creating possibilities.</p>
        <div className="footer-links">
          {(['About', 'Research', 'Blog', 'Contact'] as Page[]).map((item) => (
            <button key={item} onClick={() => navigate(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Codlont. All rights reserved.</span>
          <span>BUILT ON CURIOSITY <span className="footer-star">✳</span></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
