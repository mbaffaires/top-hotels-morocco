(() => {
  'use strict';

  // city -> ordered pool of photo slots (filenames in assets/photos/, no extension)
  // cycled across the hotels listed for that city.
  const PHOTO_POOLS = {
    'Marrakech': ['h1', 'o3', 'a1', 'th4', 'mrk5', 'mrk7', 'mrk6'],
    'Agadir': ['h2', 'th1', 'th2', 'agd4', 'agd5', 'agd6', 'agd7'],
    'Fès': ['h6', 'fes2', 'fes3', 'fes5', 'fes6', 'fes4b'],
    'Essaouira': ['h7', 't4', 'a5', 'ess4', 'ess5', 'ess6'],
    'Ouarzazate': ['h5', 't2', 'ouz3', 'ouz4', 'ouz5', 'ouz6'],
    'Merzouga': ['h3', 'hero', 'th5', 't1', 'o2', 'mzg6'],
    'Saïdia': ['h4', 'o1', 'sai3', 'sai4', 'sai6'],
    'Chefchaouen': ['h8', 'chef2', 'chf3', 'chf4', 'chf5', 'chf6'],
    'Tanger': ['s3', 'tanger2', 'tng3', 'tng4', 'tng5', 'tng6'],
    'Rabat': ['rabat1', 'rabat2', 'rbt3', 'rbt4', 'rbt5', 'rbt6'],
    'Casablanca': ['casa1', 'casa2', 'csb3', 'csb4', 'csb5', 'csb6'],
    'Taghazout': ['s2', 'a6', 'tgz3', 'tgz4', 'tgz5', 'tgz6'],
    "El Jadida": ['eljadida1', 'eljadida2', 'eja3', 'eja5', 'eja6'],
  };

  const CITY_ORDER = ['Marrakech', 'Agadir', 'Fès', 'Essaouira', 'Ouarzazate', 'Merzouga', 'Saïdia', 'Chefchaouen', 'Tanger', 'Rabat', 'Casablanca', 'Taghazout', "El Jadida"];

  // Real hotels (name/city/stars researched); price is an indicative rate in Dhs/night.
  const RAW = [
    // Marrakech
    ['Marrakech', 'La Mamounia', 5, '2 400', 'Jardins historiques · palace mythique'],
    ['Marrakech', 'Royal Mansour Marrakech', 5, '3 200', 'Riads privés · spa exceptionnel'],
    ['Marrakech', 'El Fenn', 5, '2 100', "Médina · galerie d'art · rooftop"],
    ['Marrakech', 'Nobu Hotel Marrakech', 5, '2 600', 'Design · restaurant signature'],
    ['Marrakech', 'Kenzi Rose Garden', 4, '950', 'Jardins · piscine'],
    ['Marrakech', 'Savoy Le Grand Hotel', 4, '890', 'Hivernage · casino'],
    ['Marrakech', 'Diwane Hotel & Spa', 4, '780', 'Médina · hammam'],

    // Agadir
    ['Agadir', 'Sofitel Agadir Thalassa Sea & Spa', 5, '1 450', 'Thalasso · front de mer'],
    ['Agadir', 'Hotel Riu Palace Tikida Agadir', 5, '1 200', 'All inclusive · plage privée'],
    ['Agadir', 'Tikida Beach', 4, '590', 'Front de mer · all inclusive'],
    ['Agadir', 'Hotel Timoulay & Spa Agadir', 4, '920', 'Spa · design'],
    ['Agadir', 'Anezi Tower Hotel', 4, '1 000', 'Vue mer · centre-ville'],
    ['Agadir', 'Amadil Ocean Club', 4, '850', 'Front de mer · familles'],
    ['Agadir', 'Hotel Argana', 3, '620', 'Corniche · vue océan'],

    // Fès
    ['Fès', 'Hotel Sahrai', 5, '1 800', 'Vue médina · design contemporain'],
    ['Fès', 'Fes Marriott Hotel Jnan Palace', 5, '1 350', 'Jardins · golf à proximité'],
    ['Fès', 'Riad Fès', 5, '920', 'Médina · terrasse'],
    ['Fès', 'Riad Laaroussa', 4, '980', 'Médina · patio traditionnel'],
    ['Fès', 'Riad Fes Maya Suite & Spa', 4, '890', 'Spa · médina'],
    ['Fès', 'Riad Verus', 4, '750', 'Boutique · médina historique'],

    // Essaouira
    ['Essaouira', 'Heure Bleue Palais', 5, '980', 'Remparts · spa'],
    ['Essaouira', 'Sofitel Essaouira Mogador Golf & Spa', 5, '1 450', 'Golf · front de mer'],
    ['Essaouira', 'Atlas Essaouira Riad Resort & Spa', 5, '1 360', 'Remparts · spa'],
    ['Essaouira', 'Villa Quieta', 4, '1 100', 'Bord de mer · golf 18 trous'],
    ['Essaouira', 'Madada Mogador', 4, '780', 'Médina · cours de cuisine'],
    ["Essaouira", "Dar L'Oussia", 4, '850', 'Remparts historiques'],

    // Ouarzazate
    ['Ouarzazate', 'Ksar Ighnda', 5, '1 250', 'Aït Ben Haddou · architecture kasbah'],
    ['Ouarzazate', 'Le Berbère Palace', 4, '870', 'Kasbah · étape circuit sud'],
    ['Ouarzazate', 'AMANAR Ouarzazate Boutique Hôtel & Spa', 4, '980', 'Spa · design berbère'],
    ['Ouarzazate', 'Le Temple Des Arts', 4, '890', 'Décor cinéma · piscine'],
    ['Ouarzazate', 'Dar Daif', 3, '650', 'Kasbah traditionnelle · rivière'],
    ['Ouarzazate', 'Kasbah Ellouze', 3, '590', 'Palmeraie · authentique'],

    // Merzouga
    ['Merzouga', 'Kasbah Hotel Tombouctou', 4, '1 290', 'Bivouac privé · dunes'],
    ['Merzouga', 'Hotel Kanz Erremal', 3, '1 030', 'Dîner spectacle · dunes'],
    ['Merzouga', 'Kasbah Hotel Yasmina', 3, '690', 'Au pied des dunes'],
    ['Merzouga', 'Yasmina Hotel', 3, '640', 'Lac saisonnier · dunes'],
    ['Merzouga', 'Ksar Sania', 3, '720', 'Piscine · palmeraie'],
    ['Merzouga', 'Auberge Kasbah Derkaoua', 3, '580', 'Authentique · désert'],

    // Saïdia
    ['Saïdia', 'Radisson Blu Resort, Saïdia Beach', 5, '1 780', 'Front de mer · golf'],
    ['Saïdia', 'Iberostar Waves Saïdia', 5, '1 650', 'All inclusive · plage'],
    ['Saïdia', 'Oasis Beach & Spa', 5, '1 540', 'Tout compris · spa'],
    ['Saïdia', 'Blue Pearl Beach', 5, '1 310', 'Plage · piscine'],
    ['Saïdia', 'Be Live Collection Saïdia', 5, '750', 'Plage · aquaparc'],
    ['Saïdia', 'Hotel Everest Saïdia', 4, '980', 'Bord de mer'],

    // Chefchaouen
    ['Chefchaouen', 'Taj Chefchaouen Luxury Hotel & Spa', 4, '2 260', 'Vue Rif · spa'],
    ['Chefchaouen', 'El Cortijo Hotel & Spa', 4, '1 040', 'Spa · nature'],
    ['Chefchaouen', 'Dar Jasmine', 4, '950', 'Design · médina bleue'],
    ['Chefchaouen', 'Hotel Parador', 4, '920', 'Vue panoramique · piscine'],
    ['Chefchaouen', 'Riad Cherifa', 4, '850', 'Médina dans la médina'],
    ['Chefchaouen', 'Lina Ryad & Spa', 3, '640', 'Vue Rif · petit-déjeuner'],

    // Tanger
    ['Tanger', 'Fairmont Tazi Palace Tangier', 5, '2 400', 'Colline · vue baie'],
    ['Tanger', 'Hilton Tangier Al Houara Resort & Spa', 5, '1 450', 'Front de mer · spa'],
    ['Tanger', 'El Minzah Hotel', 5, '1 650', 'Historique · jardins'],
    ['Tanger', 'Grand Mogador Sea View & Spa', 5, '1 190', 'Vue mer · spa'],
    ['Tanger', 'Grand Hotel Villa de France', 4, '890', 'Vue historique sur la baie'],
    ['Tanger', 'Ibis Tanger City Center', 3, '930', 'Centre-ville · pratique'],

    // Rabat
    ['Rabat', 'Four Seasons Hotel Rabat at Kasr Al Bahr', 5, '3 400', 'Océan · design contemporain'],
    ['Rabat', 'The Ritz-Carlton Rabat Dar Es Salam', 5, '3 100', 'Golf · jardins'],
    ['Rabat', 'Conrad Rabat Arzana', 5, '1 850', 'Design · marina'],
    ['Rabat', 'Golden Tulip Farah Rabat', 5, '1 250', 'Vue fleuve Bouregreg'],
    ['Rabat', 'Hotel Belere Rabat', 4, '780', 'Centre-ville'],
    ['Rabat', 'Ibis Rabat Agdal', 3, '620', 'Central · pratique'],

    // Casablanca
    ['Casablanca', 'Royal Mansour Hotel Casablanca', 5, '2 100', 'Art déco restauré'],
    ['Casablanca', 'Hyatt Regency Casablanca', 5, '1 450', 'Médina · hammam'],
    ['Casablanca', 'Sheraton Casablanca Hotel & Towers', 5, '1 350', 'Centre-ville · piscine'],
    ['Casablanca', 'Kenzi Tower Hotel', 5, '1 200', 'Vue panoramique · rooftop'],
    ['Casablanca', 'Barceló Anfa Casablanca', 4, '890', 'Quartier Anfa'],
    ['Casablanca', 'Kenzi Basma', 4, '960', 'Central · affaires'],

    // Taghazout
    ['Taghazout', 'Hyatt Regency Taghazout', 5, '1 650', 'Baie de Taghazout · spa'],
    ['Taghazout', 'Radisson Blu Resort, Taghazout Bay Surf Village', 5, '1 450', 'Surf · front de mer'],
    ['Taghazout', 'Amouage By Surf Maroc', 4, '980', 'Surf · communauté'],
    ['Taghazout', 'Villa Mandala', 4, '850', 'Vue océan · surf à 300 m'],
    ['Taghazout', 'Hyatt Place Taghazout Bay', 4, '890', 'Baie de Taghazout'],
    ['Taghazout', 'World of Waves Surf House', 3, '620', 'Surf lodge · artisanal'],

    // El Jadida
    ['El Jadida', 'Mazagan Beach & Golf Resort', 5, '1 780', 'Casino · golf · plage'],
    ['El Jadida', 'Pullman Mazagan Royal Golf & Spa Hotel', 5, '1 650', 'Golf · spa · plage privée'],
    ['El Jadida', 'MIA Mazagan Bay', 4, '890', 'Front de mer'],
    ['El Jadida', 'Oceana Mazagan Suites Hôtel', 4, '780', 'Piscine · jardin'],
    ['El Jadida', 'Ibis El Jadida', 3, '590', 'Plage à 300 m'],
    ['El Jadida', 'Hotel La Place', 3, '520', 'Terrasse · centre-ville'],
  ];

  const cityCounters = {};
  const hotels = RAW.map(([city, name, stars, price, tag], idx) => {
    const pool = PHOTO_POOLS[city] || ['hero'];
    const i = cityCounters[city] || 0;
    cityCounters[city] = i + 1;
    return { idx, city, name, stars, price, tag, slot: pool[i % pool.length] };
  });

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const starGlyphs = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  // ---------------------------------------------------------------------
  // Search filter
  // ---------------------------------------------------------------------

  let currentSort = 'city';
  let currentQuery = '';

  function filtered() {
    if (!currentQuery) return hotels;
    const q = currentQuery.toLowerCase();
    return hotels.filter((h) => h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q));
  }

  // ---------------------------------------------------------------------
  // Card + list rendering
  // ---------------------------------------------------------------------

  function hotelCard(h) {
    return `
      <div class="hotel-card">
        <div class="media"><img class="ph" src="assets/photos/${esc(h.slot)}.jpg" alt="${esc(h.name)}" loading="lazy"></div>
        <div class="body">
          <div class="top-row">
            <span class="city">${esc(h.city.toUpperCase())}</span>
            <span class="stars">${starGlyphs(h.stars)}</span>
          </div>
          <div class="name">${esc(h.name)}</div>
          <div class="tag">${esc(h.tag)}</div>
          <div class="price-row">
            <span class="price">${esc(h.price)}</span>
            <span class="unit">Dhs / nuit</span>
          </div>
          <div class="hotel-actions">
            <div class="hotel-cta" data-idx="${h.idx}">Calendrier des prix →</div>
            <div class="hotel-book" data-idx="${h.idx}">Réserver via WhatsApp</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderByCity(list) {
    const groups = CITY_ORDER.filter((c) => list.some((h) => h.city === c));
    if (!groups.length) return '<div class="no-results">Aucun hôtel ne correspond à votre recherche.</div>';
    return groups.map((city) => {
      const cityList = list.filter((h) => h.city === city);
      return `
        <div class="city-group">
          <div class="city-group-head">
            <h3 class="city-group-title">${esc(city)}</h3>
            <span class="city-group-count">${cityList.length} hôtel${cityList.length > 1 ? 's' : ''}</span>
          </div>
          <div class="hotel-list">${cityList.map(hotelCard).join('')}</div>
        </div>
      `;
    }).join('');
  }

  function renderByStars(list) {
    if (!list.length) return '<div class="no-results">Aucun hôtel ne correspond à votre recherche.</div>';
    const sorted = [...list].sort((a, b) => b.stars - a.stars || Number(a.price.replace(/\s/g, '')) - Number(b.price.replace(/\s/g, '')));
    return `<div class="hotel-list">${sorted.map(hotelCard).join('')}</div>`;
  }

  function render() {
    const list = filtered();
    $('hotelsContainer').innerHTML = currentSort === 'stars' ? renderByStars(list) : renderByCity(list);
    $('hotelsCount').textContent = currentQuery
      ? `${list.length} résultat${list.length > 1 ? 's' : ''} pour "${currentQuery}"`
      : `${hotels.length} hôtels dans ${CITY_ORDER.length} villes`;
  }

  // ---------------------------------------------------------------------
  // Price calendar
  // ---------------------------------------------------------------------

  const SEASON = [0.85, 0.85, 0.9, 1.0, 1.05, 1.1, 1.25, 1.3, 1.15, 1.05, 0.9, 1.1]; // Jan..Dec
  const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const DOW_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  function seededRand(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  const WHATSAPP_NUMBER = '212777010882';

  function fmtISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function fmtDMY(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }

  function sendReservation({ hotel, dateIn, dateOut, travelers, price, priceLabel }) {
    const lines = [
      'Bonjour, je souhaite réserver :',
      `🏨 ${hotel.name} — ${hotel.city}`,
      dateIn && dateOut ? `📅 Du ${fmtDMY(dateIn)} au ${fmtDMY(dateOut)}` : '',
      travelers ? `👥 ${travelers}` : '',
      `💰 ${priceLabel || `À partir de ${price} Dhs / nuit`}`,
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank', 'noopener');
  }

  function reserveFromCard(idx) {
    const h = hotels[idx];
    if (!h) return;
    sendReservation({
      hotel: h,
      dateIn: $('dateIn').value,
      dateOut: $('dateOut').value,
      travelers: $('travelersSelect').selectedOptions[0].textContent,
      price: h.price,
    });
  }

  function reserveFromCalendarDay(idx, dateIso, price) {
    const h = hotels[idx];
    if (!h) return;
    const [y, m, d] = dateIso.split('-').map(Number);
    const checkOut = new Date(y, m - 1, d + 1); // local date; JS normalizes month/day overflow
    sendReservation({
      hotel: h,
      dateIn: dateIso,
      dateOut: fmtISO(checkOut),
      travelers: $('travelersSelect') ? $('travelersSelect').selectedOptions[0].textContent : '',
      price,
      priceLabel: `${price} Dhs pour cette nuit`,
    });
  }

  function priceForDate(basePrice, hotelIdx, date) {
    const month = date.getMonth();
    const dow = date.getDay();
    const doy = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const seasonal = SEASON[month];
    const weekend = (dow === 5 || dow === 6) ? 1.12 : 1;
    const noise = (seededRand(hotelIdx * 1000 + doy) - 0.5) * 0.1;
    const raw = basePrice * seasonal * weekend * (1 + noise);
    return Math.round(raw / 10) * 10;
  }

  function calendarHtml(h) {
    const base = Number(h.price.replace(/\s/g, ''));
    const year = new Date().getFullYear();
    let out = '';
    for (let m = 0; m < 12; m++) {
      const first = new Date(year, m, 1);
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      const leading = (first.getDay() + 6) % 7; // Monday-first
      let cells = '';
      for (let i = 0; i < leading; i++) cells += '<div class="cal-cell empty"></div>';
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, m, d);
        const price = priceForDate(base, h.idx, date);
        const tier = price < base * 0.92 ? 'low' : price > base * 1.15 ? 'high' : 'mid';
        cells += `<div class="cal-cell ${tier}" data-idx="${h.idx}" data-date="${fmtISO(date)}" data-price="${price}"><span class="d">${d}</span><span class="p">${price}</span></div>`;
      }
      out += `
        <div class="cal-month">
          <div class="cal-month-title">${MONTH_NAMES[m]} ${year}</div>
          <div class="cal-dow-row">${DOW_LABELS.map((d) => `<span>${d}</span>`).join('')}</div>
          <div class="cal-grid">${cells}</div>
        </div>
      `;
    }
    return out;
  }

  function openCalendar(idx) {
    const h = hotels[idx];
    if (!h) return;
    $('calHotelName').textContent = h.name;
    $('calHotelSub').textContent = `${h.city} · ${starGlyphs(h.stars)} · dès ${h.price} Dhs / nuit`;
    $('calBody').innerHTML = calendarHtml(h);
    $('calOverlay').hidden = false;
  }

  function closeCalendar() {
    $('calOverlay').hidden = true;
  }

  // ---------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------

  function initDates() {
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 6);
    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + 9);

    const dateIn = $('dateIn');
    const dateOut = $('dateOut');
    dateIn.min = fmtISO(today);
    dateIn.value = fmtISO(checkIn);
    dateOut.min = fmtISO(new Date(checkIn.getTime() + 86400000));
    dateOut.value = fmtISO(checkOut);

    dateIn.addEventListener('change', () => {
      const inDate = new Date(dateIn.value);
      const minOut = new Date(inDate.getTime() + 86400000);
      dateOut.min = fmtISO(minOut);
      if (!dateOut.value || new Date(dateOut.value) <= inDate) {
        dateOut.value = fmtISO(minOut);
      }
    });
  }

  function init() {
    render();
    initDates();

    $('sortToggle').addEventListener('click', (e) => {
      const btn = e.target.closest('.sort-btn');
      if (!btn) return;
      document.querySelectorAll('.sort-btn').forEach((b) => b.classList.toggle('active', b === btn));
      currentSort = btn.dataset.sort;
      render();
    });

    $('hotelsContainer').addEventListener('click', (e) => {
      const cta = e.target.closest('.hotel-cta');
      if (cta) { openCalendar(Number(cta.dataset.idx)); return; }
      const book = e.target.closest('.hotel-book');
      if (book) reserveFromCard(Number(book.dataset.idx));
    });

    $('calBody').addEventListener('click', (e) => {
      const cell = e.target.closest('.cal-cell:not(.empty)');
      if (!cell) return;
      reserveFromCalendarDay(Number(cell.dataset.idx), cell.dataset.date, Number(cell.dataset.price));
      closeCalendar();
    });

    const runSearch = () => {
      currentQuery = $('searchInput').value.trim();
      render();
    };
    $('searchInput').addEventListener('input', runSearch);
    $('searchInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runSearch(); } });
    $('searchBtn').addEventListener('click', runSearch);

    $('calClose').addEventListener('click', closeCalendar);
    $('calOverlay').addEventListener('click', (e) => { if (e.target.id === 'calOverlay') closeCalendar(); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
