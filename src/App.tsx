import { FormEvent, useEffect, useMemo, useState } from 'react'

const A = '/assets/'

const routes = [
  ['Manifiesto', '/manifiesto'],
  ['Proyectos', '/proyectos'],
  ['Servicios', '/servicios'],
  ['Hablemos', '/hablemos'],
] as const

const cases = {
  'know-your-buyer': {
    title: 'Know Your Buyer',
    category: 'Diseño de juego de mesa',
    intro: 'Un juego de cartas ilustrado para descubrir personalidades, provocar conversaciones y mirarnos de otra forma.',
    credit: 'Diseño de juego - Sofía Garza',
    problem: 'Los arquetipos suelen sentirse lejanos. Queríamos volverlos claros, cercanos y, sobre todo, divertidos.',
    process: 'Investigamos cada personalidad. Después, construimos un lenguaje de color e ilustración que las hace únicas sin dejar de sentirse parte de la misma familia.',
    processImages: ['proceso-know-your-buyer-rebelde.webp', 'proceso-know-your-buyer-gobernante.webp'],
    result: 'Un objeto para jugar, conversar y reconocerte. Cada carta guarda una pequeña historia.',
    hero: 'ea376.webp',
    images: ['ea8a6.webp', '544b6.webp', '6bf8a.webp', '43044.webp', '10c00.webp', 'f9946.webp', '2454e.webp', '8d5d7.webp'],
  },
  'en-la-ciudad': {
    title: 'En la ciudad',
    category: 'Fotografía lifestyle urbano',
    intro: 'Una mirada a Monterrey desde lo cotidiano: sus silencios, sus gestos y las historias que pasan junto a ti.',
    credit: 'Fotografía lifestyle urbano - Ivanna Espinoza',
    problem: 'La ciudad suele contarse a través de sus edificios. Nos propusimos encontrar a quienes la viven y los instantes que casi siempre pasan de largo.',
    process: 'Caminamos sin prisa. Editamos cada fotografía para que los blancos, los negros y la luz construyeran una secuencia honesta.',
    processImages: ['proceso-en-la-ciudad.webp'],
    result: 'Una serie íntima y urbana. Monterrey aparece como escenario, memoria y personaje.',
    hero: '6a33d.webp',
    images: ['76053.webp', 'b3d6c.webp', '57b1a.webp', 'c2b6f.webp', '0047d.webp', '32592.webp', 'f649f.webp', 'ea31b.webp', '40b4f.webp'],
    mono: true,
  },
  aristeo: {
    title: 'Aristeo',
    category: 'Identidad visual y naming',
    intro: 'Una identidad mexicana para una hidromiel que mezcla oficio, carácter y una energía inesperada.',
    credit: 'Identidad visual - Ivanna Espinoza y Sofía Garza',
    problem: 'La hidromiel necesitaba una voz propia: artesanal sin nostalgia, mexicana sin caer en lugares comunes.',
    process: 'Exploramos símbolos, competencia, materiales y relatos. El nombre y la imagen nacieron juntos.',
    processImages: ['proceso-aristeo.webp'],
    result: 'Una marca viva y reconocible. Naranja encendido, azul profundo y un universo gráfico listo para crecer.',
    hero: 'eff96.webp',
    images: ['8b738.webp', '6c4df.webp', 'af473.webp', '64662.webp', 'a95e5.webp'],
  },
} as const

type CaseKey = keyof typeof cases

function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  history.pushState({}, '', href)
  dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Link({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className} onClick={(e) => navigate(e, href)}>{children}</a>
}

function Logo() {
  return <Link href="/" className="logo" aria-label="50 Estudio"><img src={`${A}logo-50-estudio.webp`} alt="50 Estudio" /></Link>
}

function Header({ dark = false }: { dark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className={`site-header ${dark ? 'on-dark' : ''}`}>
      <nav aria-label="Navegación principal">
        <div className="nav-side nav-left">{routes.slice(0, 2).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        <Logo />
        <div className="nav-side nav-right">{routes.slice(2).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span>Menú</span>
          <span className="menu-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </nav>
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        {routes.map(([label, href], index) => <Link key={href} href={href}><small>0{index + 1}</small>{label}</Link>)}
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand"><img className="footer-logo" src={`${A}logo-50-estudio.webp`} alt="50 Estudio" /><p>Instantes reales.<br />Recuerdos extraordinarios.</p></div>
      <div><strong>Explora</strong>{routes.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><strong>Dirección</strong><p>Monterrey, N.L.<br />México</p></div>
      <div><strong>Contacto</strong><a href="mailto:50estudio@contacto.mx">50estudio@contacto.mx</a><a href="tel:+528234343843">+52 823 434 3843</a><a href="https://instagram.com/50estudio">Instagram · @50estudio</a></div>
    </footer>
  )
}

function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="button" href={href}>{children}</Link>
}

function Stamp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`stamp ${className}`}>{children}</div>
}

function Home() {
  const steps = [
    'Primero, conocemos tu idea, tus necesidades y lo que quieres transmitir.',
    'Después, exploramos caminos, texturas y posibilidades.',
    'Por último, hacemos una imagen que se siente tuya.',
  ]
  const [step, setStep] = useState(0)
  return (
    <>
      <Header dark />
      <main className="home">
        <section className="home-hero">
          <img src={`${A}ed468.webp`} alt="Paisaje verde bajo un cielo nublado" />
          <div className="hero-wordmark"><img src={`${A}logo-50-estudio.webp`} alt="50 Estudio" /></div>
        </section>

        <section className="featured cream-section">
          <div className="section-kicker">Selección 2026</div>
          <h2>Proyectos <em>Destacados</em></h2>
          <div className="featured-grid">
            <Link href="/proyectos/know-your-buyer" className="framed-project oval">
              <span>01</span><div><img className="photo" src={`${A}6bf8a.webp`} alt="Juego Know Your Buyer" /><img className="frame" src={`${A}9d95b.webp`} alt="" /></div>
              <h3>Know Your Buyer</h3><small>Diseño de juego · 2026</small>
            </Link>
            <Link href="/proyectos/en-la-ciudad" className="framed-project">
              <span>02</span><div><img className="photo" src={`${A}c2b6f.webp`} alt="Fotografía urbana en blanco y negro" /><img className="frame" src={`${A}87241.webp`} alt="" /></div>
              <h3>En la ciudad</h3><small>Fotografía · 2026</small>
            </Link>
          </div>
        </section>

        <section className="identity">
          <div><h2>¿Qué nos <em>identifica?</em></h2><p>Capturamos lo auténtico. Preservamos lo extraordinario. Convertimos cada instante en un recuerdo eterno.</p></div>
          <b>¿?</b>
        </section>

        <section className="process" onClick={() => setStep((step + 1) % steps.length)}>
          <div className="process-number">0{step + 1}</div>
          <p>{steps[step]}</p>
        </section>

        <section className="postal-section">
          <div className="postal">
            <div><h2>¿Interesado?</h2></div>
            <Stamp><span className="stamp-brackets">[ ]</span><small>MTY · MX</small></Stamp>
            <div className="postal-lines"><label>De:<input aria-label="Nombre" placeholder="Tu nombre" /></label><label>Correo:<input aria-label="Correo" placeholder="hola@correo.mx" /></label></div>
            <Button href="/hablemos">Contáctanos</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Manifesto() {
  const people = [
    ['a6e77.webp', 'Ivanna Espinoza', 'Dirección creativa'],
    ['7354c.webp', 'Sofía Garza', 'Producción creativa'],
    ['22533.webp', 'Camila Legaspi', 'Fotografía'],
    ['3aad9.webp', 'Alan Cantú', 'Programación'],
  ]
  return (
    <>
      <Header dark />
      <main>
        <section className="manifesto-title"><h1>Manifiesto</h1></section>
        <section className="manifesto-photo"><img src={`${A}c1054.webp`} alt="Escena urbana en blanco y negro" /><p>Instantes reales. Recuerdos extraordinarios.</p></section>
        <section className="team cream-section"><h2>Nuestro <em>equipo</em></h2><div className="team-grid">{people.map(([img, name, role]) => <article key={name}><Stamp><img src={`${A}${img}`} alt={name} /><h3>{name}</h3><p>{role}</p></Stamp></article>)}</div></section>
        <section className="values cream-section"><h2>Nuestros <em>valores</em></h2><div className="diagonal wine reveal">Curiosidad</div><div className="diagonal berry reveal">Atención al detalle</div><div className="diagonal peach reveal">Responsabilidad</div></section>
        <section className="disciplines"><h2>Disciplinas</h2><Stamp><b>[</b><ul><li>Fotografía</li><li>Identidad visual</li><li>Diseño de juego</li></ul><b>]</b></Stamp></section>
        <section className="closing"><h2>Mira lo que hemos hecho</h2><Button href="/proyectos">Proyectos</Button></section>
      </main>
      <Footer />
    </>
  )
}

type Project = { slug: CaseKey; title: string; cat: string; year: string; img: string; desc: string }
const projects: Project[] = [
  { slug: 'en-la-ciudad', title: 'En la ciudad', cat: 'Fotografía', year: '2026', img: '76053.webp', desc: 'Historias que aparecen cuando caminas sin prisa.' },
  { slug: 'aristeo', title: 'Aristeo', cat: 'Identidad', year: '2026', img: 'eff96.webp', desc: 'Naming e identidad para una hidromiel mexicana.' },
  { slug: 'know-your-buyer', title: 'Know Your Buyer', cat: 'Juego de mesa', year: '2026', img: 'ea376.webp', desc: 'Arquetipos ilustrados para jugar y reconocerte.' },
]

function Projects() {
  const [filter, setFilter] = useState('Todos')
  const shown = filter === 'Todos' ? projects : projects.filter(p => p.cat === filter)
  return (
    <>
      <Header />
      <main className="projects-page">
        <section className="projects-intro"><h1>Proyectos</h1><p>Cada proyecto es una oportunidad para crear algo extraordinario. Imágenes e ideas que cuentan historias.</p>
          <div className="filters">{['Todos', 'Fotografía', 'Identidad', 'Juego de mesa'].map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
        </section>
        <section className="project-list">{shown.map((project, index) => <article key={project.slug} className={index % 2 ? 'reverse' : ''}><Link href={`/proyectos/${project.slug}`} className="project-image"><img src={`${A}${project.img}`} alt={project.title} /></Link><div><div className="project-index">0{projects.indexOf(project) + 1} / 03</div><p>{project.cat} · {project.year}</p><Link href={`/proyectos/${project.slug}`}><h2>{project.title}</h2></Link><p>{project.desc}</p></div></article>)}</section>
        <section className="project-cta"><h2>¿Te imaginas tu proyecto aquí?</h2><Button href="/hablemos">Contáctanos</Button></section>
      </main>
      <Footer />
    </>
  )
}

function CaseStudy({ slug }: { slug: CaseKey }) {
  const data = cases[slug]
  return (
    <>
      <Header />
      <main className="case-page">
        <section className="case-heading"><h1>{data.title}</h1><p>{data.intro}</p><p className="case-credit">{data.credit}</p></section>
        <img className={`case-hero ${'mono' in data && data.mono ? 'mono' : ''}`} src={`${A}${data.hero}`} alt={`Proyecto ${data.title}`} />
        <section className="case-copy">
          {[['01', 'Problema', data.problem], ['02', 'Proceso', data.process], ['03', 'Resultado', data.result]].map(([num, title, text]) => <article key={num}><h2><b>{num}</b>{title}</h2><div className="case-section-content"><p>{text}</p>{num === '02' && <div className="process-assets">{data.processImages.map((image, index) => <img key={image} src={`${A}${image}`} alt={`${data.title}, proceso ${index + 1}`} />)}</div>}</div></article>)}
        </section>
        <section className={`collage ${'mono' in data && data.mono ? 'mono' : ''}`}>{data.images.map((img, index) => <img key={img} className={`tile-${(index % 6) + 1}`} src={`${A}${img}`} alt={`${data.title}, detalle ${index + 1}`} />)}</section>
      </main>
      <Footer />
    </>
  )
}

function Services() {
  const services = [
    ['Fotografía de producto y lifestyle urbano', 'wine'],
    ['Creación de identidad visual', 'berry'],
    ['Diseño de juego de mesa', 'peach'],
  ]
  return (
    <>
      <Header />
      <main className="services-page">
        <section className="services-showcase">
          <h1><span>Servi-</span><span>-Cios</span></h1>
          <div className="service-bands">{services.map(([title, color]) => <article className={`service-band diagonal ${color} reveal`} key={title}><h2>{title}</h2></article>)}</div>
        </section>
        <section className="closing"><h2>Cuéntanos tu proyecto</h2><Button href="/hablemos">Contáctanos</Button></section>
      </main>
      <Footer />
    </>
  )
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  const colors = ['#3e2b24', '#f0ac97', '#cba5ce', '#f8efe1']
  return <div className="confetti" aria-hidden="true">{Array.from({ length: 70 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, background: colors[i % colors.length], animationDelay: `${(i % 12) * .04}s`, transform: `rotate(${i * 19}deg)` }} />)}</div>
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    const formData = new FormData(form)
    const body = new URLSearchParams(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    )
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
  return (
    <>
      <Header />
      <main className="contact-page">
        <section className="contact-main">
          <h1>Hablemos</h1>
          <Stamp className="contact-stamp"><div><small>Correo</small><a href="mailto:50estudio@contacto.mx">50estudio@contacto.mx</a><small>Teléfono</small><a href="tel:+528234343843">823 434 3843</a><small>Redes</small><span>@50estudio</span></div></Stamp>
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden><label>No llenes este campo<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
            <label>Nombre<input required name="name" autoComplete="name" /></label>
            <label>Correo<input required type="email" name="email" autoComplete="email" /></label>
            <label>Cuéntanos tu proyecto<textarea required name="message" /></label>
            <button className="button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando mensaje' : 'Enviar mensaje'}</button>
            {status === 'success' && <p className="sent-message" role="status">Gracias. Tu mensaje ya está en camino.</p>}
            {status === 'error' && <p className="sent-message" role="alert">No pudimos enviar tu mensaje. Inténtalo de nuevo.</p>}
          </form>
          <Confetti active={status === 'success'} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [path, setPath] = useState(location.pathname)
  useEffect(() => {
    const update = () => setPath(location.pathname.replace(/\/+$/, '') || '/')
    addEventListener('popstate', update)
    return () => removeEventListener('popstate', update)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting)), { threshold: .15 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [path])
  const page = useMemo(() => {
    if (path === '/') return <Home />
    if (path === '/manifiesto') return <Manifesto />
    if (path === '/proyectos') return <Projects />
    if (path === '/servicios') return <Services />
    if (path === '/hablemos') return <Contact />
    const match = path.match(/^\/proyectos\/(know-your-buyer|en-la-ciudad|aristeo)$/)
    if (match) return <CaseStudy slug={match[1] as CaseKey} />
    return <Projects />
  }, [path])
  return <div className="page-enter" key={path}>{page}</div>
}
