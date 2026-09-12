(() => {
  'use strict';

  // ---------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------

  const menuDefs = [
    { key: 'hotel', label: 'Hôtels', sub: '640 établissements au Maroc' },
    { key: 'stay', label: 'Logements', sub: 'Riads, villas et appartements' },
    { key: 'trip', label: 'Voyages', sub: 'Circuits et séjours organisés' },
    { key: 'act', label: 'Activités', sub: 'Excursions à la journée' },
    { key: 'plus', label: 'Atlas+', sub: 'Cashback et prix membres' },
  ];

  const searchFieldsByTab = {
    hotel: [
      { label: 'DESTINATION OU HÔTEL', value: 'Marrakech, Agadir, Fès…' },
      { label: 'DATES', value: '19 – 22 sept.' },
      { label: 'VOYAGEURS', value: '1 ch., 2 pers.' },
    ],
    stay: [
      { label: 'VILLE OU QUARTIER', value: 'Médina de Marrakech…' },
      { label: 'DURÉE', value: '7 nuits' },
      { label: 'TYPE', value: 'Riad entier' },
    ],
    trip: [
      { label: 'TYPE DE VOYAGE', value: 'Circuit, désert, randonnée' },
      { label: 'DÉPART DE', value: 'Casablanca' },
      { label: 'DATE', value: 'Octobre 2026' },
    ],
  };

  const quick = ['Riad médina Marrakech', 'All inclusive Agadir', 'Désert de Merzouga', 'Chefchaouen 2 nuits', 'Saïdia bord de mer'];

  const offers = [
    { slot: 'o1', ph: 'Côte méditerranéenne près de Saïdia', badge: '−35%', title: 'Offres de septembre', sub: 'Hôtels 4 et 5★ dans tout le Maroc', price: '590 Dhs' },
    { slot: 'o2', ph: 'Camp berbère dans l’Erg Chebbi', badge: 'NOUVEAU', title: 'Nuit sous tente au Sahara', sub: 'Bivouac privatif, dîner, lever de soleil', price: '890 Dhs' },
    { slot: 'o3', ph: 'Piscine de riad à Marrakech', badge: 'FAMILLE', title: 'Riad entier, 8 personnes', sub: 'Médina de Marrakech, piscine', price: '2 400 Dhs' },
  ];

  const hotels = [
    { slot: 'h1', ph: 'Jardins de La Mamounia, Marrakech', city: 'MARRAKECH', name: 'La Mamounia', tag: 'Jardins historiques · palace mythique', stars: '5★', price: '580' },
    { slot: 'h2', ph: 'Club balnéaire à Agadir', city: 'AGADIR', name: 'Tikida Beach', tag: 'Front de mer · all inclusive', stars: '4★', price: '590' },
    { slot: 'h3', ph: 'Camp berbère aux dunes de Merzouga', city: 'MERZOUGA', name: 'Kasbah Hotel Yasmina', tag: 'Au pied des dunes', stars: '3★', price: '690' },
    { slot: 'h4', ph: 'Coucher de soleil sur la plage de Saïdia', city: 'SAÏDIA', name: 'Be Live Collection Saïdia', tag: 'Plage · aquaparc', stars: '5★', price: '750' },
    { slot: 'h5', ph: 'Kasbah de Tifoultout, Ouarzazate', city: 'OUARZAZATE', name: 'Le Berbère Palace', tag: 'Kasbah · étape circuit sud', stars: '4★', price: '870' },
    { slot: 'h6', ph: 'Médina de Fès vue sur les toits', city: 'FÈS', name: 'Riad Fès', tag: 'Médina · terrasse', stars: '5★', price: '920' },
    { slot: 'h7', ph: 'Port de pêche d’Essaouira', city: 'ESSAOUIRA', name: 'Heure Bleue Palais', tag: 'Remparts · spa', stars: '5★', price: '980' },
    { slot: 'h8', ph: 'Ruelle bleue de Chefchaouen', city: 'CHEFCHAOUEN', name: 'Lina Ryad & Spa', tag: 'Vue Rif · petit-déjeuner', stars: '3★', price: '640' },
  ];

  const stays = [
    { slot: 's1', ph: 'Suite du riad El Fenn, Marrakech', city: 'MARRAKECH', name: 'El Fenn, 5 chambres', tag: 'Médina · piscine · personnel inclus', price: '2 400 / nuit' },
    { slot: 's2', ph: 'Coucher de soleil à Taghazout', city: 'TAGHAZOUT', name: 'Villa Mandala, vue océan', tag: '4 chambres · surf à 300 m', price: '1 850 / nuit' },
    { slot: 's3', ph: 'Front de mer de Tanger', city: 'TANGER', name: 'Appartement Malabata', tag: '2 chambres · séjour au mois', price: '9 500 / mois' },
  ];

  const trips = [
    { slot: 't1', ph: 'Caravane de chameaux au coucher du soleil', dur: '3 JOURS / 2 NUITS', name: 'Marrakech → Merzouga', route: "Aït Ben Haddou, Ouarzazate, gorges du Dadès, bivouac dans l'erg Chebbi.", chips: ['4×4', 'Bivouac', 'Petit groupe'], price: '1 490' },
    { slot: 't2', ph: 'Ksar d’Aït Ben Haddou', dur: '6 JOURS / 5 NUITS', name: 'Les villes impériales', route: 'Rabat, Meknès, Volubilis, Fès et Marrakech, guide francophone.', chips: ['Guide', 'Hôtels 4★', 'Transferts'], price: '4 250' },
    { slot: 't3', ph: 'Sommet du Toubkal, Haut Atlas', dur: '4 JOURS / 3 NUITS', name: 'Toubkal & vallées', route: "Imlil, ascension du Toubkal, nuit en refuge et vallée d'Ourika.", chips: ['Randonnée', 'Muletier', 'Refuge'], price: '2 100' },
    { slot: 't4', ph: 'Littoral d’Essaouira', dur: '5 JOURS / 4 NUITS', name: 'Essaouira & Taghazout', route: 'Côte atlantique, argan, surf et poisson grillé au port.', chips: ['Surf', 'Bord de mer', 'Libre'], price: '2 780' },
  ];

  const acts = [
    { slot: 'a1', ph: 'Palmeraie de Marrakech', name: 'Quad dans la palmeraie', city: 'Marrakech', price: '290' },
    { slot: 'a2', ph: 'Petit-déjeuner en montgolfière au-dessus de Marrakech', name: 'Vol en montgolfière', city: 'Marrakech', price: '1 450' },
    { slot: 'a3', ph: "Cascades d'Ouzoud", name: "Cascades d'Ouzoud", city: 'Azilal', price: '350' },
    { slot: 'a4', ph: 'Mosaïque zellige, Marrakech', name: 'Hammam & spa traditionnel', city: 'Fès', price: '420' },
    { slot: 'a5', ph: 'Médina d’Essaouira', name: 'Cours de cuisine marocaine', city: 'Essaouira', price: '380' },
    { slot: 'a6', ph: 'Village de Taghazout', name: 'Initiation au surf', city: 'Taghazout', price: '260' },
  ];

  const perks = [
    { t: 'Prix membres', d: 'Tarifs réduits sur 640 établissements.' },
    { t: 'Cashback', d: "Jusqu'à 4% crédités en dirhams." },
    { t: 'Paiement 2×', d: 'Sans frais, par carte marocaine.' },
    { t: 'Annulation libre', d: 'Gratuite jusqu\'à 48 h avant.' },
    { t: 'Taxe incluse', d: 'Affichée dans le prix.' },
    { t: 'Conseiller dédié', d: 'Un interlocuteur du devis au retour.' },
  ];

  const themes = [
    { slot: 'th1', ph: 'Piscine de resort à Agadir', name: 'All inclusive', deal: "jusqu'à −30%" },
    { slot: 'th2', ph: 'Plage d’Agadir', name: 'Bord de mer', deal: 'Agadir, Saïdia' },
    { slot: 'th3', ph: 'Toboggans d’aquaparc à Agadir', name: 'Avec aquaparc', deal: 'spécial familles' },
    { slot: 'th4', ph: 'Cour de riad à Marrakech', name: 'Riads de charme', deal: 'médinas classées' },
    { slot: 'th5', ph: 'Dunes de l’Erg Chebbi', name: 'Séjours désert', deal: 'bivouacs privatifs' },
    { slot: 'th6', ph: 'Village d’Imlil, Haut Atlas', name: 'Atlas & montagne', deal: 'randonnées guidées' },
  ];

  const dests = ['Marrakech', 'Agadir', 'Fès', 'Tanger', 'Essaouira', 'Saïdia', 'Chefchaouen', 'Merzouga', 'Ouarzazate', 'Taghazout', 'El Jadida', 'Rabat'];

  const flows = {
    hotel: { kicker: 'HÔTELS', steps: [
      { q: 'Quelle destination au Maroc ?', hint: 'Une seule ville pour commencer.', opts: ['Marrakech', 'Agadir', 'Fès', 'Saïdia', 'Essaouira', 'Je ne sais pas encore'] },
      { q: 'Quel type de séjour ?', hint: "Cela détermine la sélection d'établissements.", opts: ['Bord de mer', 'All inclusive', 'Riad de charme', 'Aquaparc / famille', 'Ville & culture'] },
      { q: 'Quand partez-vous ?', hint: 'Une période approximative suffit.', opts: ['Ce mois-ci', 'Dans 1 à 3 mois', 'Vacances scolaires', 'Dates flexibles'] },
      { q: 'Quel budget par nuit ?', hint: 'Taxe de séjour incluse dans nos prix.', opts: ['Moins de 600 Dhs', '600 – 1 000 Dhs', '1 000 – 2 000 Dhs', 'Plus de 2 000 Dhs'] },
    ] },
    stay: { kicker: 'LOGEMENTS', steps: [
      { q: 'Quel type de logement ?', hint: 'Tous nos logements sont visités par nos équipes.', opts: ['Riad entier', 'Villa avec piscine', 'Appartement', "Maison d'hôtes"] },
      { q: 'Dans quelle ville ?', hint: 'Nous couvrons douze villes marocaines.', opts: ['Marrakech', 'Taghazout', 'Tanger', 'Essaouira', 'Chefchaouen', 'Autre'] },
      { q: 'Combien de voyageurs ?', hint: 'Nous filtrons par capacité réelle.', opts: ['2 personnes', '3 à 5', '6 à 8', 'Plus de 8'] },
      { q: 'Quelle durée ?', hint: 'Les séjours longs ouvrent des tarifs dégressifs.', opts: ['Week-end', 'Une semaine', 'Deux semaines', 'Au mois'] },
    ] },
    trip: { kicker: 'VOYAGES ORGANISÉS', steps: [
      { q: 'Quel type de voyage ?', hint: 'Tous nos circuits sont opérés au Maroc.', opts: ['Circuit désert', 'Villes impériales', 'Randonnée Atlas', 'Côte atlantique', 'Sur mesure'] },
      { q: 'Ville de départ ?', hint: 'Transferts inclus depuis ces villes.', opts: ['Marrakech', 'Casablanca', 'Agadir', 'Fès', 'Aéroport, à préciser'] },
      { q: 'Combien de jours ?', hint: 'Nos circuits vont de 2 à 10 jours.', opts: ['2 à 3 jours', '4 à 6 jours', '7 jours et plus'] },
      { q: 'Vous partez...', hint: 'Cela change le véhicule et les hébergements.', opts: ['En couple', 'En famille', 'Entre amis', 'En groupe constitué'] },
    ] },
    act: { kicker: 'ACTIVITÉS', steps: [
      { q: 'Quelle activité vous tente ?', hint: 'À la journée ou à la demi-journée.', opts: ['Quad & buggy', 'Montgolfière', 'Cascades', 'Hammam & spa', 'Cuisine', 'Surf'] },
      { q: 'Dans quelle ville ?', hint: 'Départ depuis votre hôtel.', opts: ['Marrakech', 'Agadir', 'Essaouira', 'Fès', 'Taghazout'] },
      { q: 'Combien de participants ?', hint: 'Tarifs de groupe à partir de 6.', opts: ['1 à 2', '3 à 5', '6 et plus'] },
      { q: 'Quand ?', hint: 'Confirmation sous 24 h.', opts: ['Demain', 'Cette semaine', 'Ce mois-ci', 'Je choisis plus tard'] },
    ] },
    plus: { kicker: 'ATLAS+', steps: [
      { q: 'Comment réservez-vous aujourd\'hui ?', hint: 'Pour calibrer votre niveau de cashback.', opts: ['Directement auprès des hôtels', 'Sur des plateformes', 'Via une agence', 'Première réservation'] },
      { q: 'Combien de séjours par an ?', hint: 'Le cashback augmente avec la fréquence.', opts: ['1 à 2', '3 à 5', '6 et plus'] },
      { q: 'Vous réservez pour...', hint: 'Les comptes professionnels ont un barème dédié.', opts: ['Moi et ma famille', 'Mon entreprise', 'Un groupe / une association'] },
      { q: 'Ce qui compte le plus ?', hint: "Nous mettons en avant l'avantage concerné.", opts: ['Prix membres', 'Cashback', 'Paiement en 2 fois', 'Annulation libre'] },
    ] },
  };

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------

  const state = {
    tab: 'hotel',
    nav: false,
    quiz: null,
    step: 0,
    answers: [],
  };

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function ph(slot, alt) {
    return `<img class="ph" src="assets/photos/${esc(slot)}.jpg" alt="${esc(alt || '')}" loading="lazy">`;
  }

  // ---------------------------------------------------------------------
  // Static list rendering (runs once)
  // ---------------------------------------------------------------------

  function renderNavAndMenu() {
    const navList = $('navList');
    const menuList = $('menuList');
    navList.innerHTML = menuDefs.map((m, i) => `
      <div class="nav-item" data-open="${m.key}">
        <span class="label">${m.label}</span>
        <span class="n">0${i + 1}</span>
      </div>
    `).join('');
    menuList.innerHTML = menuDefs.map((m, i) => `
      <div class="menu-item" data-open="${m.key}">
        <span class="n">0${i + 1}</span>
        <div class="info">
          <div class="title">${m.label}</div>
          <div class="sub">${m.sub}</div>
        </div>
        <span class="arrow">→</span><span class="arrow arrow-desktop">Démarrer →</span>
      </div>
    `).join('');
  }

  function renderQuick() {
    $('quickScroll').innerHTML = quick.map((q) => `<span class="quick-chip">${esc(q)}</span>`).join('');
  }

  function renderOffers() {
    $('offersScroll').innerHTML = offers.map((o) => `
      <div class="offer-card">
        <div class="media">
          ${ph(o.slot, o.ph)}
          <span class="offer-badge">${esc(o.badge)}</span>
        </div>
        <div class="body">
          <div class="title">${esc(o.title)}</div>
          <div class="sub">${esc(o.sub)}</div>
          <div class="price-row">dès <span class="price">${esc(o.price)}</span></div>
        </div>
      </div>
    `).join('');
  }

  function renderHotels() {
    $('hotelList').innerHTML = hotels.map((h) => `
      <div class="hotel-card">
        <div class="media">${ph(h.slot, h.ph)}</div>
        <div class="body">
          <div class="top-row">
            <span class="city">${esc(h.city)}</span>
            <span class="stars">${esc(h.stars)}</span>
          </div>
          <div class="name">${esc(h.name)}</div>
          <div class="tag">${esc(h.tag)}</div>
          <div class="price-row">
            <span class="price">${esc(h.price)}</span>
            <span class="unit">Dhs / nuit</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderStays() {
    $('staysScroll').innerHTML = stays.map((s) => `
      <div class="stay-card">
        <div class="media">${ph(s.slot, s.ph)}</div>
        <div class="body">
          <div class="city">${esc(s.city)}</div>
          <div class="name">${esc(s.name)}</div>
          <div class="tag">${esc(s.tag)}</div>
          <div class="price">${esc(s.price)} <span class="unit">Dhs</span></div>
        </div>
      </div>
    `).join('');
  }

  function renderTrips() {
    $('tripList').innerHTML = trips.map((t) => `
      <div class="trip-card">
        <div class="media">
          ${ph(t.slot, t.ph)}
          <div class="trip-scrim"></div>
          <div class="trip-media-caption">
            <div class="dur">${esc(t.dur)}</div>
            <div class="name">${esc(t.name)}</div>
          </div>
        </div>
        <div class="body">
          <div class="route">${esc(t.route)}</div>
          <div class="trip-chips">${t.chips.map((c) => `<span class="trip-chip">${esc(c)}</span>`).join('')}</div>
          <div class="trip-footer">
            <span class="trip-price">${esc(t.price)} <span class="unit">Dhs</span></span>
            <span class="trip-cta" data-open="trip">Le programme</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderActs() {
    $('actsScroll').innerHTML = acts.map((a) => `
      <div class="act-card">
        <div class="media">${ph(a.slot, a.ph)}</div>
        <div class="body">
          <div class="name">${esc(a.name)}</div>
          <div class="meta">${esc(a.city)} · dès ${esc(a.price)} Dhs</div>
        </div>
      </div>
    `).join('');
  }

  function renderPerks() {
    $('perksGrid').innerHTML = perks.map((p) => `
      <div class="perk">
        <div class="t">${esc(p.t)}</div>
        <div class="d">${esc(p.d)}</div>
      </div>
    `).join('');
  }

  function renderThemes() {
    $('themeGrid').innerHTML = themes.map((t) => `
      <div class="theme-tile">
        ${ph(t.slot, t.ph)}
        <div class="theme-scrim"></div>
        <div class="theme-caption">
          <div class="name">${esc(t.name)}</div>
          <div class="deal">${esc(t.deal)}</div>
        </div>
      </div>
    `).join('');
  }

  function renderDests() {
    $('destPills').innerHTML = dests.map((d) => `<span class="dest-pill">${esc(d)}</span>`).join('');
  }

  // ---------------------------------------------------------------------
  // Dynamic UI: header nav, search tabs
  // ---------------------------------------------------------------------

  function renderNavOpen() {
    $('navPanel').hidden = !state.nav;
  }

  function renderSearchTabs() {
    document.querySelectorAll('#searchTabs .tab').forEach((el) => {
      el.classList.toggle('active', el.dataset.tab === state.tab);
    });
    const fields = searchFieldsByTab[state.tab] || searchFieldsByTab.hotel;
    $('searchFields').innerHTML = fields.map((f) => `
      <div class="field">
        <div class="label">${esc(f.label)}</div>
        <div class="value">${esc(f.value)}</div>
      </div>
    `).join('');
  }

  // ---------------------------------------------------------------------
  // Quiz sheet
  // ---------------------------------------------------------------------

  function openQuiz(key) {
    state.quiz = key;
    state.step = 0;
    state.answers = [];
    state.nav = false;
    renderNavOpen();
    renderQuizSheet();
    $('sheetOverlay').hidden = false;
  }

  function closeQuiz() {
    $('sheetOverlay').hidden = true;
    state.quiz = null;
    state.step = 0;
    state.answers = [];
  }

  function pickAnswer(v) {
    state.answers = state.answers.slice(0, state.step).concat([v]);
    state.step += 1;
    renderQuizSheet();
  }

  function goBack() {
    if (state.step === 0) {
      closeQuiz();
    } else {
      state.step -= 1;
      renderQuizSheet();
    }
  }

  function renderQuizSheet() {
    const flow = state.quiz ? flows[state.quiz] : null;
    if (!flow) return;
    const step = state.step;
    const done = step >= flow.steps.length;
    const cur = flow.steps[step];

    $('quizKicker').textContent = flow.kicker;
    $('stepLabel').textContent = done ? 'Vos coordonnées' : `Étape ${step + 1} sur ${flow.steps.length}`;
    $('progressFill').style.width = Math.round(((step + 1) / (flow.steps.length + 1)) * 100) + '%';
    $('sheetCounter').textContent = `${Math.min(step + 1, flow.steps.length + 1)} / ${flow.steps.length + 1}`;
    $('sheetBack').textContent = step === 0 ? 'Annuler' : '← Retour';

    if (!done) {
      $('sheetBody').innerHTML = `
        <h3>${esc(cur.q)}</h3>
        <p class="hint">${esc(cur.hint)}</p>
        <div class="options">
          ${cur.opts.map((o) => `<div class="option${state.answers[step] === o ? ' selected' : ''}" data-answer="${esc(o)}">${esc(o)}</div>`).join('')}
        </div>
      `;
    } else {
      const summary = [flow.kicker].concat(state.answers);
      $('sheetBody').innerHTML = `
        <h3>Où vous envoyons-nous la sélection ?</h3>
        <p class="hint">Réponse sous 24 h, par e-mail ou WhatsApp.</p>
        <div class="contact-fields">
          <div class="contact-input"><input type="text" placeholder="Prénom et nom" id="contactName"></div>
          <div class="contact-input"><input type="email" placeholder="votre@email.ma" id="contactEmail"></div>
          <div class="contact-input"><input type="tel" placeholder="+212 6 00 00 00 00" id="contactPhone"></div>
        </div>
        <div class="summary-box">
          <div class="summary-label">VOTRE DEMANDE</div>
          <div class="summary-chips">${summary.map((s) => `<span class="summary-chip">${esc(s)}</span>`).join('')}</div>
        </div>
        <div class="submit-actions">
          <div class="btn-primary" id="submitRequest">Envoyer ma demande</div>
          <div class="btn-whatsapp" id="submitWhatsapp">Continuer sur WhatsApp</div>
        </div>
      `;
      $('submitRequest').addEventListener('click', () => {
        alert('Merci ! Votre demande a bien été enregistrée. Un conseiller vous recontacte sous 24 h.');
        closeQuiz();
      });
      $('submitWhatsapp').addEventListener('click', () => {
        const text = encodeURIComponent(`Bonjour, je souhaite : ${summary.join(' / ')}`);
        window.open(`https://wa.me/212524000803?text=${text}`, '_blank', 'noopener');
      });
    }
  }

  // ---------------------------------------------------------------------
  // Event wiring
  // ---------------------------------------------------------------------

  function init() {
    renderNavAndMenu();
    renderQuick();
    renderOffers();
    renderHotels();
    renderStays();
    renderTrips();
    renderActs();
    renderPerks();
    renderThemes();
    renderDests();
    renderSearchTabs();

    $('navToggle').addEventListener('click', () => {
      state.nav = !state.nav;
      renderNavOpen();
    });

    document.querySelectorAll('#searchTabs .tab').forEach((el) => {
      el.addEventListener('click', () => {
        state.tab = el.dataset.tab;
        renderSearchTabs();
      });
    });

    document.body.addEventListener('click', (e) => {
      const openEl = e.target.closest('[data-open]');
      if (openEl) {
        openQuiz(openEl.dataset.open);
        return;
      }
      const answerEl = e.target.closest('.option[data-answer]');
      if (answerEl) {
        pickAnswer(answerEl.dataset.answer);
        return;
      }
    });

    $('bottomCta').addEventListener('click', () => openQuiz('hotel'));
    $('atlasCta').addEventListener('click', () => openQuiz('plus'));
    $('reserveBtn').addEventListener('click', () => openQuiz('hotel'));
    $('footerJoin').addEventListener('click', () => openQuiz('plus'));
    $('sheetClose').addEventListener('click', closeQuiz);
    $('sheetBack').addEventListener('click', goBack);
    $('sheetOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'sheetOverlay') closeQuiz();
    });

    const openWhatsapp = () => window.open('https://wa.me/212524000803', '_blank', 'noopener');
    $('waBtn').addEventListener('click', openWhatsapp);
    $('adviceWa').addEventListener('click', openWhatsapp);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
