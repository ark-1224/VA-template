/* Renders the page from window.SITE (see content.js). */
(() => {
  const S = window.SITE;
  if (!S) return;

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");
  root.dataset.theme = S.theme || "sage";
  if (S.meta) {
    document.title = S.meta.title;
    $('meta[name="description"]').content = S.meta.description;
  }

  /* ---------- Icons ---------- */
  const P = (d) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icon = {
    arrow: P('<path d="M3 12h17M14 6l6 6-6 6"/>'),
    out: P('<path d="M7 17 17 7M8 7h9v9"/>'),
    close: P('<path d="M6 6l12 12M18 6 6 18"/>'),
    mail: P('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>'),
    pin: P('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    globe: P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>'),
    linkedin: P('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.8v.1M12 16v-5.5M12 13c0-1.7 1-2.6 2.3-2.6S16.5 11.300 16.500 13V16"/>'),
    instagram: P('<rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.800"/><path d="M17 7v.01"/>'),
    facebook: P('<path d="M14 21v-8h2.700l.5-3.200H14V7.900c0-.9.400-1.600 1.700-1.600h1.600V3.500S16 3.200 14.800 3.200C12.300 3.200 10.800 4.700 10.800 7.400v2.400H8.300V13h2.500v8"/>'),
    calendar: P('<rect x="3.500" y="5" width="17" height="15" rx="2"/><path d="M3.500 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2"/>'),
    share: P('<circle cx="6" cy="12" r="2.500"/><circle cx="17.500" cy="6" r="2.500"/><circle cx="17.500" cy="18" r="2.500"/><path d="m8.200 10.800 7.100-3.600M8.200 13.200l7.100 3.600"/>'),
    table: P('<rect x="3.500" y="4" width="17" height="16" rx="2"/><path d="M3.500 9.500h17M3.500 14.800h17M9.500 4v16"/>'),
    headset: P('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.500"/><rect x="17" y="13" width="4" height="6" rx="1.500"/><path d="M19 19c0 1.500-1.500 2.500-4 2.500h-2"/>'),
    checklist: P('<path d="m4 6.500 1.700 1.700L9 5M4 12.500l1.700 1.700L9 11M4 18.500l1.700 1.700L9 17M12.500 7h7.500M12.500 13h7.500M12.500 19h7.500"/>'),
    search: P('<circle cx="10.500" cy="10.500" r="6.500"/><path d="m20 20-4.900-4.900"/>'),
    star: `<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.500c.6 5.300 2.100 8.400 4.100 9.400 1.300.7 3.600 1.100 6.400 1.100-2.800 0-5.100.4-6.400 1.100-2 1-3.500 4.100-4.100 9.400-.6-5.300-2.100-8.400-4.100-9.400C6.600 12.400 4.300 12 1.500 12c2.800 0 5.100-.4 6.400-1.100 2-1 3.500-4.100 4.100-9.400Z"/></svg>`
  };

  const attr = (a) => `href="${esc(a.href)}"${/^https?:/.test(a.href) ? ' target="_blank" rel="noopener noreferrer"' : ""}`;

  /* ---------- Header ---------- */
  const header = $(".site-header");
  header.innerHTML = `
    <div class="wrap nav">
      <a class="logo" href="#top" aria-label="${esc(S.brand.name)} — home">
        <span class="logo__mark" aria-hidden="true">${esc(S.brand.monogram)}</span>
        <span class="logo__name">${esc(S.brand.name)}</span>
      </a>
      <ul class="nav__links" id="nav-links">
        ${S.nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join("")}
      </ul>
      <span class="nav__flourish" aria-hidden="true">${icon.star}</span>
      <button class="nav__toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span></button>
    </div>`;

  const toggle = $(".nav__toggle", header);
  const links = $("#nav-links", header);
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  const onScroll = () => header.classList.toggle("is-stuck", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Hero ---------- */
  const H = S.hero;
  const sprig = `
    <svg class="sprig" viewBox="0 0 220 360" aria-hidden="true" fill="currentColor">
      <defs><path id="leaf" d="M0 0C8-30 46-46 90-36C84 0 42 24 0 0Z"/></defs>
      <path d="M210 340C170 250 150 160 175 20" fill="none" stroke="currentColor" stroke-width="2"/>
      <use href="#leaf" transform="translate(174 40) rotate(-150) scale(.9)"/>
      <use href="#leaf" transform="translate(172 70) rotate(-20) scale(1.1)"/>
      <use href="#leaf" transform="translate(168 112) rotate(-165) scale(1.15)"/>
      <use href="#leaf" transform="translate(168 150) rotate(-10) scale(1.2)"/>
      <use href="#leaf" transform="translate(172 195) rotate(-170) scale(1.15)"/>
      <use href="#leaf" transform="translate(182 240) rotate(0) scale(1.1)"/>
      <use href="#leaf" transform="translate(190 290) rotate(-175) scale(.95)"/>
    </svg>`;

  const badge = H.badge
    ? `<div class="badge" aria-hidden="true">
         <svg class="ring" viewBox="0 0 120 120">
           <defs><path id="ring-path" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0"/></defs>
           <text><textPath href="#ring-path" textLength="290" lengthAdjust="spacing">${esc(H.badge)}</textPath></text>
         </svg>
         <span class="star">${icon.star}</span>
       </div>`
    : "";

  const stats = (H.stats || []).length
    ? `<div class="stats"><div class="wrap stats__grid">
        ${H.stats.map((s) => `
          <div class="stat reveal">
            <span class="star">${icon.star}</span>
            <div><span class="stat__value" data-count="${esc(s.value)}">${esc(s.value)}</span><span class="stat__label">${esc(s.label)}</span></div>
          </div>`).join("")}
      </div></div>`
    : "";

  const heroHTML = `
    <section class="hero" aria-label="Introduction">
      <div class="wrap hero__grid">
        ${sprig}
        <div class="hero__text">
          <p class="hero__greeting reveal">${esc(H.greeting)}</p>
          <h1 class="hero__name reveal" style="--d:.08s"><span>${esc(H.firstName)}</span><span>${esc(H.lastName)}</span></h1>
          <p class="hero__role reveal" style="--d:.16s">${esc(H.role)}</p>
          <p class="hero__intro reveal" style="--d:.24s">${esc(H.intro)}</p>
          <div class="hero__cta reveal" style="--d:.32s"><a class="btn" ${attr(H.cta)}>${esc(H.cta.label)}${icon.arrow}</a></div>
        </div>
        <div class="portrait reveal" style="--d:.12s">
          <div class="portrait__outline"></div>
          <div class="portrait__arch"><img src="${esc(H.photo)}" alt="${esc(H.photoAlt)}" width="1182" height="1330" fetchpriority="high"></div>
          ${badge}
        </div>
      </div>
      ${stats}
    </section>`;

  /* ---------- About ---------- */
  const A = S.about;
  const aboutHTML = A
    ? `<section class="section section--soft" id="about" aria-labelledby="about-title">
        <div class="wrap about">
          <div class="about__photo reveal">
            <div class="about__outline"></div>
            <div class="about__arch"><img src="${esc(A.photo)}" alt="${esc(A.photoAlt)}" loading="lazy"></div>
          </div>
          <div class="about__body">
            <p class="eyebrow reveal">${esc(A.eyebrow)}</p>
            <h2 class="section__title reveal" id="about-title" style="--d:.06s">${esc(A.title)} <span class="star">${icon.star}</span></h2>
            ${A.lead ? `<p class="about__lead reveal" style="--d:.12s">${esc(A.lead)}</p>` : ""}
            <div class="about__text reveal" style="--d:.18s">${(A.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
            ${(A.facts || []).length ? `
              <dl class="about__facts reveal" style="--d:.24s">
                ${A.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("")}
              </dl>` : ""}
            <div class="about__foot reveal" style="--d:.3s">
              ${A.cta ? `<a class="btn" ${attr(A.cta)}>${esc(A.cta.label)}${icon.arrow}</a>` : ""}
              ${A.signature ? `<span class="about__sign" aria-label="Signed, ${esc(A.signature)}">${esc(A.signature)}</span>` : ""}
            </div>
          </div>
        </div>
      </section>`
    : "";

  /* ---------- Services ---------- */
  const Sv = S.services;
  const servicesHTML = Sv && (Sv.items || []).length
    ? `<section class="section" id="services" aria-labelledby="services-title">
        <div class="wrap services">
          <div class="services__intro reveal">
            <p class="eyebrow">${esc(Sv.eyebrow)}</p>
            <h2 class="section__title" id="services-title">${esc(Sv.title)} <span class="star">${icon.star}</span></h2>
            ${Sv.intro ? `<p class="services__lead">${esc(Sv.intro)}</p>` : ""}
            ${Sv.link ? `<a class="link-arrow" ${attr(Sv.link)}>${esc(Sv.link.label)}${icon.arrow}</a>` : ""}
          </div>
          <ol class="services__list">
            ${Sv.items.map((s, i) => `
              <li class="service reveal" style="--d:${(i % 2) * 0.08}s">
                <span class="service__icon">${icon[s.icon] || icon.star}</span>
                <div>
                  <span class="service__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
                  <h3 class="service__title">${esc(s.title)}</h3>
                  <p class="service__text">${esc(s.text)}</p>
                </div>
              </li>`).join("")}
          </ol>
        </div>
      </section>`
    : "";

  /* ---------- Tools ---------- */
  const Tl = S.tools;
  const abbr = (t) => t.abbr || t.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  const toolsHTML = Tl && (Tl.items || []).length
    ? `<section class="section section--soft" id="tools" aria-labelledby="tools-title">
        <div class="wrap">
          <div class="tools__head reveal">
            <p class="eyebrow">${esc(Tl.eyebrow)}</p>
            <h2 class="section__title" id="tools-title">${esc(Tl.title)} <span class="star">${icon.star}</span></h2>
          </div>
          <ul class="tools__grid">
            ${Tl.items.map((t, i) => `
              <li class="tool reveal" style="--d:${(i % 4) * 0.07}s">
                <span class="tool__badge" aria-hidden="true">${t.image ? `<img src="${esc(t.image)}" alt="">` : esc(abbr(t))}</span>
                <span class="tool__name">${esc(t.name)}</span>
              </li>`).join("")}
          </ul>
          ${Tl.note ? `<p class="tools__note reveal">${esc(Tl.note)}</p>` : ""}
        </div>
      </section>`
    : "";

  /* ---------- Projects ---------- */
  const Pj = S.projects;
  const mocks = {
    inbox: () => `
      <div class="mock mock--inbox" aria-hidden="true">
        <div class="mock__bar"><i></i><i></i><i></i></div>
        <div class="mock__row is-hi"><span class="dot"></span><span class="col"><span class="ln" style="display:block"></span><span class="ln s" style="display:block"></span></span></div>
        ${[0, 1, 2, 3].map(() => `<div class="mock__row"><span class="dot"></span><span class="col"><span class="ln" style="display:block"></span><span class="ln s" style="display:block"></span></span></div>`).join("")}
      </div>`,
    calendar: () => {
      const cls = ["", "", "a", "", "c", "", "", "b", "", "", "a", "", "c", "", "", "c", "", "b", "", "", "a", "", "a", "", "", "c", "", ""];
      return `
      <div class="mock mock--calendar" aria-hidden="true">
        <div class="mock__bar"><i></i><i></i><i></i></div>
        <div class="mock__title"></div>
        <div class="mock__grid">${cls.map((c) => `<i class="${c}"></i>`).join("")}</div>
      </div>`;
    },
    board: () => `
      <div class="mock mock--board" aria-hidden="true">
        <div class="mock__bar"><i></i><i></i><i></i></div>
        <div class="mock__cols">
          <div class="mock__col"><b></b><div class="mock__chip g"><i></i><i></i></div><div class="mock__chip"><i></i><i></i></div><div class="mock__chip b"><i></i><i></i></div></div>
          <div class="mock__col"><b></b><div class="mock__chip b"><i></i><i></i></div><div class="mock__chip g"><i></i><i></i></div></div>
          <div class="mock__col"><b></b><div class="mock__chip"><i></i><i></i></div><div class="mock__chip b"><i></i><i></i></div></div>
        </div>
      </div>`
  };
  const mockKeys = Object.keys(mocks);

  const cardsHTML = (Pj.items || [])
    .map((p, i) => {
      const shot = p.image
        ? `<img src="${esc(p.image)}" alt="" loading="lazy">`
        : mocks[p.mock] ? mocks[p.mock]() : mocks[mockKeys[i % mockKeys.length]]();
      return `
        <button class="card card--${esc(p.tone || "tint")} reveal" style="--d:${i * 0.1}s" data-case="${i}" aria-haspopup="dialog">
          <span class="card__client">${esc(p.client)}</span>
          <span class="card__cat">${esc(p.category)}</span>
          <span class="card__result">${icon.out}${esc(p.result)}</span>
          <span class="card__shot">${shot}</span>
          <span class="card__go" aria-hidden="true">${icon.out}</span>
          <span class="sr-only" style="position:absolute;left:-9999px">Read case study</span>
        </button>`;
    })
    .join("");

  const projectsHTML = (Pj.items || []).length
    ? `<section class="section" id="work" aria-labelledby="work-title">
        <div class="wrap">
          <div class="section__head">
            <div class="reveal">
              <p class="eyebrow">${esc(Pj.eyebrow)}</p>
              <h2 class="section__title" id="work-title">${esc(Pj.title)} <span class="star">${icon.star}</span></h2>
            </div>
            ${Pj.viewAll ? `<a class="link-arrow reveal" ${attr(Pj.viewAll)}>${esc(Pj.viewAll.label)}${icon.arrow}</a>` : ""}
          </div>
          <div class="cards">${cardsHTML}</div>
        </div>
      </section>`
    : "";

  /* ---------- Testimonials + contact ---------- */
  const T = S.testimonials;
  const C = S.contact;
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const testimonialsHTML = (T.items || []).length
    ? `<div class="testimonials" id="testimonials" role="region" aria-roledescription="carousel" aria-label="Testimonials">
        <div class="t__mark" aria-hidden="true">&ldquo;</div>
        <div class="t__slides" aria-live="polite">
          ${T.items.map((t, i) => `
            <figure class="t__slide${i === 0 ? " is-active" : ""}" style="margin:0" aria-hidden="${i !== 0}" role="group" aria-label="${i + 1} of ${T.items.length}">
              <blockquote class="t__quote" style="margin:0">${esc(t.quote)}</blockquote>
              <figcaption class="t__who">
                <span class="t__avatar">${t.photo ? `<img src="${esc(t.photo)}" alt="">` : esc(initials(t.name))}</span>
                <span><span class="t__name">${esc(t.name)}</span><span class="t__role">${esc(t.role)}</span></span>
              </figcaption>
            </figure>`).join("")}
        </div>
        ${T.items.length > 1 ? `
        <div class="t__nav">
          <div class="t__dots">${T.items.map((_, i) => `<button class="t__dot" aria-label="Show testimonial ${i + 1}" ${i === 0 ? 'aria-current="true"' : ""}></button>`).join("")}</div>
          <div class="t__arrows">
            <button class="t__arrow t__arrow--prev" aria-label="Previous testimonial">${icon.arrow}</button>
            <button class="t__arrow t__arrow--next" aria-label="Next testimonial">${icon.arrow}</button>
          </div>
        </div>` : ""}
      </div>`
    : `<div></div>`;

  const ctaHTML = `
    <div class="cta" id="contact">
      <div class="cta__ring" aria-hidden="true">${icon.mail}</div>
      <div>
        <h2 class="cta__title">${esc(C.headingTop)}<br>${esc(C.headingBottom)}</h2>
        <p class="cta__text">${esc(C.text)}</p>
      </div>
      <a class="btn btn--light cta__btn" ${attr(C.button)}>${esc(C.button.label)}${icon.arrow}</a>
    </div>`;

  const closingHTML = `
    <section class="closing" aria-label="Testimonials and contact">
      <div class="wrap closing__grid reveal">${testimonialsHTML}${ctaHTML}</div>
    </section>`;

  $("#main").innerHTML = heroHTML + aboutHTML + servicesHTML + toolsHTML + projectsHTML + closingHTML;

  /* ---------- Footer ---------- */
  const F = S.footer;
  $(".site-footer").innerHTML = `
    <div class="wrap footer__main">
      <div class="footer__brand">
        <span class="logo__mark" aria-hidden="true">${esc(S.brand.monogram)}</span>
        <p>${esc(F.tagline)}</p>
      </div>
      <div class="footer__contact">
        ${C.email ? `<a href="mailto:${esc(C.email)}">${icon.mail}${esc(C.email)}</a>` : ""}
        ${C.location ? `<span>${icon.pin}${esc(C.location)}</span>` : ""}
      </div>
      <div class="socials">
        ${(C.socials || []).map((s) => `<a ${attr(s)} aria-label="${esc(s.label)}">${icon[s.icon] || icon.globe}</a>`).join("")}
      </div>
    </div>
    <div class="footer__bar"><div class="wrap">
      <span>&copy; ${new Date().getFullYear()} ${esc(F.copyright)}</span>
      <a href="#top">Back to top</a>
    </div></div>`;

  /* ---------- Reveal on scroll + count-up ---------- */
  const countUp = (el) => {
    const raw = el.dataset.count;
    const m = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m || reduceMotion) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num);
    const dec = (num.split(".")[1] || "").length;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min((t - t0) / 1200, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + (target * eased).toFixed(dec) + post;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        $$("[data-count]", e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Testimonial carousel ---------- */
  const slides = $$(".t__slide");
  if (slides.length > 1) {
    const dots = $$(".t__dot");
    let cur = 0, timer;
    const show = (n) => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle("is-active", i === cur);
        s.setAttribute("aria-hidden", String(i !== cur));
      });
      dots.forEach((d, i) => (i === cur ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current")));
    };
    const start = () => { if (!reduceMotion) { stop(); timer = setInterval(() => show(cur + 1), 7000); } };
    const stop = () => clearInterval(timer);
    $(".t__arrow--prev").addEventListener("click", () => { show(cur - 1); start(); });
    $(".t__arrow--next").addEventListener("click", () => { show(cur + 1); start(); });
    dots.forEach((d, i) => d.addEventListener("click", () => { show(i); start(); }));
    const box = $("#testimonials");
    box.addEventListener("mouseenter", stop);
    box.addEventListener("mouseleave", start);
    box.addEventListener("focusin", stop);
    box.addEventListener("focusout", start);
    start();
  }

  /* ---------- Case-study modal ---------- */
  const modal = $("#case-modal");
  const block = (h, t) => (t ? `<div class="modal__block"><h3>${h}</h3><p>${esc(t)}</p></div>` : "");
  const openCase = (i) => {
    const p = Pj.items[i];
    modal.innerHTML = `
      <div class="modal__head">
        <p class="eyebrow">${esc(p.category)}</p>
        <h2 class="modal__title" id="case-title">${esc(p.client)}</h2>
        <p class="modal__result">${icon.out}${esc(p.result)}</p>
        <button class="modal__close" aria-label="Close case study">${icon.close}</button>
      </div>
      <div class="modal__body">
        ${p.summary ? `<p class="modal__lead">${esc(p.summary)}</p>` : ""}
        ${block("The challenge", p.challenge)}
        ${block("What I did", p.solution)}
        ${block("The outcome", p.outcome)}
        ${(p.tools || []).length ? `<div class="modal__block"><h3>Tools used</h3><div class="chips">${p.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div></div>` : ""}
        <div><a class="btn" href="#contact" data-close>Work with me${icon.arrow}</a></div>
      </div>`;
    modal.showModal();
  };
  $$("[data-case]").forEach((b) => b.addEventListener("click", () => openCase(+b.dataset.case)));
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest(".modal__close") || e.target.closest("[data-close]")) modal.close();
  });
})();
