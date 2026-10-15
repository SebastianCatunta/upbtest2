const features = [
  {
    number: "01",
    title: "Café de especialidad",
    description: "Granos seleccionados y preparados con cuidado para que cada taza se sienta especial.",
  },
  {
    number: "02",
    title: "Un lugar para quedarte",
    description: "Un espacio tranquilo para conversar, trabajar o simplemente hacer una pausa.",
  },
  {
    number: "03",
    title: "Hecho con cariño",
    description: "Bebidas y pequeños antojos preparados al momento, como a nosotros nos gustan.",
  },
];

export default function Home() {
  return (
    <div className="site-shell" id="inicio">
      <header className="site-header container">
        <a className="brand" href="#inicio" aria-label="Casa Café, ir al inicio">
          <span className="brand-mark" aria-hidden="true">✳</span> casa café<span className="brand-dot">.</span>
        </a>
        <nav aria-label="Navegación principal" className="nav-links">
          <a href="#nosotros">Nosotros</a>
          <a href="#experiencia">Experiencia</a>
          <a className="nav-contact" href="#contacto">Contacto <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> TU NUEVA PAUSA FAVORITA</span>
            <h1 id="hero-title">Un buen día empieza con <em>un buen café.</em></h1>
            <p>Un rincón para bajar el ritmo, disfrutar el momento y volver a lo simple. Bienvenido a Casa Café.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#experiencia">Conoce nuestro espacio <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#nosotros">Descubre más <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-note"><span className="note-star" aria-hidden="true">✳</span> Café rico. Momentos simples. Siempre.</div>
          </div>
          <div className="hero-art" role="img" aria-label="Ilustración de una taza de café caliente">
            <div className="art-circle art-circle-one" />
            <div className="art-circle art-circle-two" />
            <div className="art-label">HECHO PARA DISFRUTAR<br />SIN PRISA — 2026</div>
            <div className="steam steam-one" />
            <div className="steam steam-two" />
            <div className="steam steam-three" />
            <div className="cup-handle" />
            <div className="cup"><div className="coffee" /></div>
            <div className="saucer" />
            <div className="art-sparkle" aria-hidden="true">✳</div>
          </div>
        </section>

        <section className="intro-section" id="nosotros" aria-labelledby="intro-title">
          <div className="container intro-inner">
            <span className="section-kicker">01 / SOBRE NOSOTROS</span>
            <div>
              <h2 id="intro-title">A veces, lo mejor del día es <em>hacer una pausa.</em></h2>
              <p>Creemos en las conversaciones largas, en el aroma del café recién hecho y en esos pequeños momentos que hacen grande cualquier día.</p>
            </div>
          </div>
        </section>

        <section className="features-section container" id="experiencia" aria-labelledby="features-title">
          <div className="section-heading">
            <span className="section-kicker">02 / LA EXPERIENCIA</span>
            <h2 id="features-title">Lo simple sabe mejor.</h2>
            <p>Todo lo que necesitas para sentirte como en casa.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <span className="feature-number">{feature.number} <span aria-hidden="true">↗</span></span>
                <div className="feature-symbol" aria-hidden="true">✳</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contacto" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <div>
              <span className="section-kicker">03 / NOS VEMOS PRONTO</span>
              <h2 id="contact-title">Tu próxima pausa <em>te espera.</em></h2>
              <p>¿Quieres saber más? Escríbenos y estaremos encantados de saludarte.</p>
            </div>
            <a className="button button-light" href="mailto:hola@casacafe.com">Escríbenos <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <a className="brand" href="#inicio"><span className="brand-mark" aria-hidden="true">✳</span> casa café<span className="brand-dot">.</span></a>
        <span>Un momento a la vez. © 2026 Casa Café.</span>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </div>
  );
}
