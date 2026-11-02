
import { useState } from 'react';
import Manager from './Manager';
import {
  Atom,
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  FlaskConical,
  Globe2,
  Mail,
  Menu,
  Microscope,
  ShieldCheck,
  Sparkles,
  BriefcaseBusiness,
  Wallet,
  X,
} from 'lucide-react';

type Page =
  | 'Home'
  | 'About'
  | 'Businesses'
  | 'Research'
  | 'Blog'
  | 'Contact'
  | 'Manager Login';

const navigation: Page[] = [
  'Home',
  'About',
  'Businesses',
  'Research',
  'Blog',
  'Contact',
  'Manager Login',
];

const businesses = [
  {
    icon: Globe2,
    number: '01',
    name: 'NEARBY',
    category: 'SOCIAL TECHNOLOGY',
    description:
      'A social technology platform designed to bring people closer through communication, location-based connections and digital communities.',
    status: 'CODLONT PRODUCT',
  },
  {
    icon: Wallet,
    number: '02',
    name: 'CODVEST',
    category: 'FINANCIAL TECHNOLOGY',
    description:
      'A financial technology platform focused on developing digital financial tools and services.',
    status: 'CODLONT PRODUCT',
  },
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
          aria-label="Codlont Group home"
        >
          <span className="brand-mark">
            <Atom size={25} strokeWidth={1.8} />
          </span>
          <span className="brand-name">
            CODLONT<span className="brand-dot">.</span>
            <small>TECHNOLOGY & INNOVATION</small>
          </span>
        </button>

        <div className="header-right">
          <span className="header-status">
            <span className="status-dot" />
            BUILDING TECHNOLOGIES. CREATING POSSIBILITIES.
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
            <p className="menu-eyebrow">EXPLORE CODLONT GROUP</p>

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

            <div className="menu-footer">
              Technology. Research. Innovation.
            </div>
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
                  INTRODUCING CODLONT GROUP
                </div>

                <h1>
                  Building
                  <br />
                  <span>technology.</span>
                  <br />
                  Creating possibilities.
                </h1>

                <p className="hero-description">
                  We develop innovative technologies, create digital
                  platforms and build businesses that shape the future.
                  Our work connects technology, research and creativity.
                </p>

                <div className="hero-actions">
                  <button
                    className="button button-dark"
                    onClick={() => navigate('Businesses')}
                  >
                    Explore our businesses <ArrowRight size={17} />
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
                  Driven by innovation. Built around possibilities.
                </div>
              </div>

              <div
                className="hero-visual"
                aria-label="Abstract scientific illustration"
              >
                <div className="visual-glow" />
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />

                <div className="science-core">
                  <Atom size={112} strokeWidth={0.85} />
                </div>

                <div className="floating-card floating-card-top">
                  <span className="floating-icon purple">
                    <Code2 size={19} />
                  </span>
                  <span>
                    <strong>Technology</strong>
                    <small>Building digital solutions</small>
                  </span>
                </div>

                <div className="floating-card floating-card-bottom">
                  <span className="floating-icon green">
                    <FlaskConical size={19} />
                  </span>
                  <span>
                    <strong>Innovation</strong>
                    <small>Exploring new possibilities</small>
                  </span>
                </div>

                <div className="visual-caption">
                  <span>01 / THE FUTURE</span>
                  <span>SCIENCE × TECHNOLOGY</span>
                </div>

                <span className="visual-plus plus-one">+</span>
                <span className="visual-plus plus-two">+</span>
              </div>

              <div className="hero-bottom">
                <span>INNOVATION BY DESIGN</span>
                <ArrowDown size={16} />
                <span>SCROLL TO EXPLORE</span>
              </div>
            </section>

            <section className="intro-strip">
              <div className="intro-label">WHO WE ARE</div>
              <p>
                Codlont Group is a technology and innovation company
                focused on creating digital products, developing
                new technologies and building sustainable businesses.
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
                    OUR BUSINESS PORTFOLIO
                  </div>
                  <h2>
                    Ideas transformed
                    <br />
                    <span>into businesses.</span>
                  </h2>
                </div>

                <p>
                  We develop and manage technology products designed
                  to address real-world needs and create new opportunities.
                </p>
              </div>

              <div className="research-grid">
                {businesses.map((business) => {
                  const Icon = business.icon;

                  return (
                    <article className="research-card" key={business.number}>
                      <div className="research-card-top">
                        <span className="research-icon">
                          <Icon size={25} strokeWidth={1.6} />
                        </span>
                        <span className="card-number">{business.number}</span>
                      </div>

                      <span className="article-category">
                        {business.category}
                      </span>

                      <h3>{business.name}</h3>
                      <p>{business.description}</p>

                      <span className="article-date">
                        {business.status}
                      </span>
                    </article>
                  );
                })}
              </div>

              <button
                className="button button-dark"
                onClick={() => navigate('Businesses')}
              >
                Discover our businesses <ArrowRight size={17} />
              </button>
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
                  RESEARCH & DEVELOPMENT
                </div>

                <h2>
                  Big questions.
                  <br />
                  <span>Thoughtful answers.</span>
                </h2>

                <p>
                  We believe meaningful innovation begins with
                  understanding problems, investigating possibilities
                  and developing practical solutions. Research and
                  experimentation remain central to our approach.
                </p>

                <ul className="principle-list">
                  <li>
                    <CheckCircle2 size={19} />
                    <span>Research before assumptions</span>
                  </li>
                  <li>
                    <CheckCircle2 size={19} />
                    <span>Technology with purpose</span>
                  </li>
                  <li>
                    <CheckCircle2 size={19} />
                    <span>Continuous innovation and learning</span>
                  </li>
                </ul>

                <button
                  className="button button-dark"
                  onClick={() => navigate('Research')}
                >
                  Explore our research <ArrowRight size={17} />
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
                    Research, ideas
                    <br />
                    <span>and discoveries.</span>
                  </h2>
                </div>

                <button
                  className="button button-light"
                  onClick={() => navigate('Blog')}
                >
                  Visit our journal <ArrowRight size={16} />
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
                      <span className="article-category">
                        {article.category}
                      </span>
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
                <div className="eyebrow">
                  HAVE A QUESTION OR BUSINESS IDEA?
                </div>
                <h2>Let's build something meaningful.</h2>
                <p>
                  Contact Codlont for enquiries, support and business
                  partnerships.
                </p>
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
              ABOUT CODLONT GROUP
            </div>

            <h1>
              Building technology.
              <br />
              <span>Creating possibilities.</span>
            </h1>

            <p className="inner-lead">
              Codlont Group is a technology and innovation company
              focused on developing digital platforms, researching
              new technologies and building businesses with
              long-term potential.
            </p>

            <div className="inner-feature-grid">
              <article className="inner-feature">
                <Atom size={32} />
                <h3>Our mission</h3>
                <p>
                  To create useful technologies and innovative
                  businesses that address real-world challenges.
                </p>
              </article>

              <article className="inner-feature">
                <Globe2 size={32} />
                <h3>Our vision</h3>
                <p>
                  To become an internationally recognised technology
                  group with products and businesses serving people
                  around the world.
                </p>
              </article>

              <article className="inner-feature">
                <FlaskConical size={32} />
                <h3>Our approach</h3>
                <p>
                  Research carefully, develop responsibly, test
                  thoroughly and continuously improve.
                </p>
              </article>
            </div>

            <button
              className="button button-dark"
              onClick={() => navigate('Businesses')}
            >
              Explore our businesses <ArrowRight size={17} />
            </button>
          </section>
        )}

        {page === 'Businesses' && (
          <section className="inner-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              OUR BUSINESSES & PRODUCTS
            </div>

            <h1>
              Creating products.
              <br />
              <span>Building businesses.</span>
            </h1>

            <p className="inner-lead">
              Codlont develops and owns technology products designed
              to connect people, create opportunities and deliver
              useful digital services.
            </p>

            <div className="research-grid inner-research-grid">
              {businesses.map((business) => {
                const Icon = business.icon;

                return (
                  <article className="research-card" key={business.number}>
                    <div className="research-card-top">
                      <span className="research-icon">
                        <Icon size={27} />
                      </span>
                      <span className="card-number">{business.number}</span>
                    </div>

                    <span className="article-category">
                      {business.category}
                    </span>

                    <h3>{business.name}</h3>
                    <p>{business.description}</p>

                    <span className="article-date">
                      {business.status}
                    </span>
                  </article>
                );
              })}
            </div>

            <div className="research-note">
              <BriefcaseBusiness size={24} />
              <div>
                <h3>More businesses are part of our vision</h3>
                <p>
                  Codlont plans to expand its portfolio through
                  technology development, research, innovation
                  and future business ventures.
                </p>
              </div>
            </div>
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
              Our areas of interest bring scientific curiosity
              together with engineering, software and technology
              concepts. These are focus areas, not a claim that
              every concept is already a finished product.
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
                  independent validation and clear communication of
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
              Updates and insights on technology, engineering,
              innovation, research and the development of our products.
            </p>

            <div className="article-grid inner-article-grid">
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
                    <span className="article-category">
                      {article.category}
                    </span>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <span className="article-date">{article.date}</span>
                  </div>
                </article>
              ))}
            </div>

            <p className="journal-disclaimer">
              These are introductory journal topics. Full articles
              can be published as our research and writing develop.
            </p>
          </section>
        )}

        {page === 'Contact' && (
          <section className="inner-page contact-page">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              CONTACT CODLONT GROUP
            </div>

            <h1>
              Let's start
              <br />
              <span>a conversation.</span>
            </h1>

            <p className="inner-lead">
              Whether you have a general enquiry, need assistance
              or want to explore a business partnership, we would
              be glad to hear from you.
            </p>

            <div className="contact-method-card">
              <span className="contact-method-icon">
                <Mail size={27} />
              </span>
              <div>
                <h3>General enquiries</h3>
                <p>
                  For general information and questions about
                  Codlont Group.
                </p>
                <a href="mailto:info@codlont.com">
                  info@codlont.com <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="contact-method-card">
              <span className="contact-method-icon">
                <Sparkles size={27} />
              </span>
              <div>
                <h3>Customer support</h3>
                <p>
                  For assistance with Codlont products and services.
                </p>
                <a href="mailto:support@codlont.com">
                  support@codlont.com <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="contact-method-card">
              <span className="contact-method-icon">
                <BriefcaseBusiness size={27} />
              </span>
              <div>
                <h3>Business partnerships</h3>
                <p>
                  For collaborations, business opportunities,
                  partnerships and commercial enquiries.
                </p>
                <a href="mailto:partnerships@codlont.com">
                  partnerships@codlont.com <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </section>
        )}

        {page === 'Manager Login' && <Manager />}
      </main>

      <footer className="site-footer">
        <button
          className="footer-brand"
          onClick={() => navigate('Home')}
        >
          <span className="brand-mark">
            <Atom size={23} />
          </span>
          <span>
            CODLONT<span className="brand-dot">.</span>
          </span>
        </button>

        <p>
          Building technologies. Creating possibilities.
        </p>

        <div className="footer-links">
          {(
            ['About', 'Businesses', 'Research', 'Blog', 'Contact'] as Page[]
          ).map((item) => (
            <button key={item} onClick={() => navigate(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="footer-links">
          <a href="mailto:info@codlont.com">General enquiries</a>
          <a href="mailto:support@codlont.com">Customer support</a>
          <a href="mailto:partnerships@codlont.com">
            Partnerships
          </a>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Codlont Group. All rights reserved.
          </span>
          <span>
            BUILT ON INNOVATION <span className="footer-star">✳</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
