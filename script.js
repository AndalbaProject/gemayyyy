const CONFIG = {
  name: "Bey 🐳",
  dateLabel: "21 OCT 2006",
  stamp: "21 Oct",
  password: "15052022",
  letter: [
    "happy 20!!! panjang umur dan sehat selalu, semoga makananmu selalu enak, selimutmu selalu lembut, bantalmu selalu empuk, dan jalan yg kamu lalui selalu mulus.",
    "semoga selalu di kelilingi dengan hal-hal yang baik dan bertemu orang yang baik juga. semoga masih luas harapan untuk baikmu. barangkali kamu terjatuh, aku selalu berdoa semoga semesta selalu rela memelukmu ketika berada jauh dari pada jangkauan ku.",
    "terimakasih karena sudah selalu jadi orang baik, terimakasih karena sudah tidak menyerah dan masih memilih untuk hidup sampai sekarang. stay spirited and keep living for the things you love.",
    "maybe you weren't meant to be my finish line, but I'm still glad I met you, because even if we didn't stay, you were still a part of my journey. thankyou bey🐳",
  ],
  letterSign: "-with love ziyah maybe your last princess💗",
  photos: [
    { img: "foto1.jpeg", cap: "may that beautiful smile continue to shine brightly on your face" },
  ],
  timeline: [
    { icon: "✨", tag: "The very beginning", title: "First Time We Met", text: "The day the world seemed to spin a little faster, and everything felt different from before." },
    { icon: "💬", tag: "A magical moment", title: "Our First Conversation", text: "The first words spoken, the first laughter shared — the beginning of thousands of stories we would write together." },
    { icon: "🌙", tag: "Growing closer", title: "Endless Late-Night Talks", text: "Hours that felt like minutes, talking about everything and nothing at all." },
    { icon: "💗", tag: "Today & always", title: "Loving You More Each Day", text: "Every moment with you becomes my new favourite memory." },
  ],
  songs: [
    { title: "Photograph", artist: "Ed Sheeran", src: "song1.mp3" },
    { title: "Keep Me", artist: "Novo Amor", src: "song2.mp3" },
    { title: "I Love You, I'm Sorry", artist: "Gracie Abrams", src: "song3.mp3" },
  ],
  jarNotes: [
    "Your presence alone is enough to make any room feel warmer.",
    "The way you laugh at your own jokes makes my whole day.",
    "You listen — really listen — and that means everything to me.",
    "You make the most ordinary moments feel like something special.",
    "Your kindness reaches people you don't even realize.",
    "Just being near you feels like coming home.",
    "You remind me, again and again, of what truly matters.",
  ],
  wish: "Happy birthday!! May your days always be filled with love, happiness, and all the beautiful things you deserve. I am grateful every single day to know you",
};

const $ = (id) => document.getElementById(id);
$("heroName").textContent = CONFIG.name;
$("heroDate").innerHTML = `${CONFIG.dateLabel} &nbsp;·&nbsp; THE MOST SPECIAL DAY`;
$("letterStamp").textContent = CONFIG.stamp;

$("finalSign").textContent = CONFIG.letterSign;
$("wishText").textContent = CONFIG.wish;

// LOADER
setTimeout(() => {
  $("loading-screen").classList.add("hidden");
  $("pin-screen").classList.remove("hidden");
}, 2200);

// PIN
const pinDots = $("pinDots");
const keypad = $("keypad");
let pin = "";
function renderPin() {
  pinDots.querySelectorAll(".pin-dot").forEach((d, i) => d.classList.toggle("filled", i < pin.length));
}
keypad.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.dataset.key === "del") pin = pin.slice(0, -1);
  else if (pin.length < CONFIG.password.length) pin += btn.dataset.key;
  renderPin();
  if (pin.length === CONFIG.password.length) setTimeout(checkPin, 160);
});
function checkPin() {
  if (pin === CONFIG.password) {
    $("pinSuccessOverlay").classList.remove("hidden");
    setTimeout(() => {
      $("pin-screen").classList.add("hidden");
      $("giftbox-screen").classList.remove("hidden");
    }, 600);
  } else {
    pinDots.querySelectorAll(".pin-dot").forEach(d => d.classList.add("error"));
    setTimeout(() => { 
      pinDots.querySelectorAll(".pin-dot").forEach(d => d.classList.remove("error"));
      pin = ""; renderPin(); 
    }, 500);
  }
}

// GIFTBOX
const giftbox = $("giftbox");
giftbox.addEventListener("click", () => {
  if (giftbox.classList.contains("opened")) return;
  giftbox.classList.add("opened");
  $("giftLid").classList.add("open");
  $("giftGlow").classList.add("active");
  $("giftRays").classList.add("active");
  
  startMusicOnce();
  
  // Create rays
  for (let i = 0; i < 12; i++) {
    const r = document.createElement("div");
    r.className = "ray";
    r.style.transform = `rotate(${i * 30}deg)`;
    $("giftRays").appendChild(r);
  }

  setTimeout(() => {
    $("giftbox-screen").classList.add("hidden");
    $("main").classList.remove("hidden");
    initReveal();
    window.scrollTo(0, 0);
  }, 1800);
});

// LETTER
let letterTyped = false;
function typeLetter() {
  if (letterTyped) return;
  letterTyped = true;
  const lb = $("letterBody");
  
  let pi = 0;
  function typePara() {
    if (pi >= CONFIG.letter.length) return;
    const p = document.createElement("p");
    p.className = "letter-para";
    lb.appendChild(p);
    
    let ci = 0;
    const text = CONFIG.letter[pi];
    const timer = setInterval(() => {
      p.textContent = text.slice(0, ci + 1) + "|";
      ci++;
      if (ci >= text.length) {
        clearInterval(timer);
        p.textContent = text;
        pi++;
        setTimeout(typePara, 400);
      }
    }, 28);
  }
  typePara();
}

// REVEAL
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        if (e.target.classList.contains("section-letter")) typeLetter();
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll(".reveal-fade, .reveal-up, .reveal-scale, .timeline-item").forEach(el => obs.observe(el));
}

// POLAROIDS
$("polaroids").innerHTML = CONFIG.photos.map((p, i) => {
  const r = (i % 2 ? 1 : -1) * (2 + (i % 3));
  return `<div class="polaroid" style="transform: rotate(${r}deg)" onclick="openLightbox(${i})">
    <div class="polaroid-tape"></div>
    <div class="polaroid-photo">
      <div class="polaroid-photo-inner">
        <img class="polaroid-photo-img" src="${p.img}" alt="memory" />
      </div>
    </div>
    <div class="polaroid-caption">${p.cap}</div>
  </div>`;
}).join("");

function openLightbox(i) {
  const p = CONFIG.photos[i];
  $("lbImg").src = p.img;
  $("lbCap").textContent = p.cap;
  $("lightbox").classList.remove("hidden");
}
$("lbClose").addEventListener("click", () => $("lightbox").classList.add("hidden"));
$("lbCloseBtn").addEventListener("click", () => $("lightbox").classList.add("hidden"));



// BOUQUET
document.querySelectorAll(".b-flower").forEach((f) => {
  f.addEventListener("click", () => {
    f.classList.add("tapped");
    $("flowerMsg").style.opacity = "0";
    setTimeout(() => {
      $("flowerMsg").textContent = f.dataset.msg;
      $("flowerMsg").style.opacity = "1";
    }, 200);
    burstPetals(10);
  });
});

// JAR
const jar = $("jar");
const shakeBtn = $("shakeBtn");
const jarNoteCard = $("jarNoteCard");
const jarNote = $("jarNote");
let lastNote = -1;
shakeBtn.addEventListener("click", () => {
  jar.classList.add("shaking");
  jarNoteCard.classList.add("hidden");
  shakeBtn.style.pointerEvents = "none";
  
  setTimeout(() => {
    jar.classList.remove("shaking");
    let i;
    do { i = Math.floor(Math.random() * CONFIG.jarNotes.length); }
    while (i === lastNote && CONFIG.jarNotes.length > 1);
    lastNote = i;
    jarNote.textContent = CONFIG.jarNotes[i];
    jarNoteCard.classList.remove("hidden");
    burstPetals(15);
    shakeBtn.style.pointerEvents = "auto";
  }, 800);
});

// MUSIC
const bgm = $("bgm");
let current = -1;
function renderSongs() {
  $("songList").innerHTML = CONFIG.songs.map((s, i) => 
    `<div class="playlist-item ${i === current ? 'active' : ''}" onclick="loadTrack(${i}, true)">
      <div class="pl-num">0${i + 1}</div>
      <div class="pl-info">
        <div class="pl-name">${s.title}</div>
        <div class="pl-artist">${s.artist}</div>
      </div>
      <div class="pl-emoji">🎵</div>
    </div>`
  ).join("");
}

function loadTrack(i, play) {
  current = (i + CONFIG.songs.length) % CONFIG.songs.length;
  const s = CONFIG.songs[current];
  $("npTitle").textContent = s.title;
  $("npArtist").textContent = s.artist || "";
  const src = s.src || "song1.mp3";
  if (!bgm.src.endsWith(src)) bgm.src = src;
  renderSongs();
  if (play) bgm.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
}

function setPlaying(on) {
  $("playBtn").textContent = on ? "⏸" : "▶";
  if(on) $("disc").classList.add("spinning");
  else $("disc").classList.remove("spinning");
}

$("playBtn").addEventListener("click", () => {
  if (bgm.paused) bgm.play().then(() => setPlaying(true)).catch(()=>{});
  else { bgm.pause(); setPlaying(false); }
});
$("prevBtn").addEventListener("click", () => loadTrack(current - 1, true));
$("nextBtn").addEventListener("click", () => loadTrack(current + 1, true));

bgm.addEventListener("timeupdate", () => {
  if (bgm.duration) $("progressFill").style.width = (bgm.currentTime / bgm.duration) * 100 + "%";
});
$("progress").addEventListener("click", (e) => {
  if (!bgm.duration) return;
  const r = $("progress").getBoundingClientRect();
  bgm.currentTime = ((e.clientX - r.left) / r.width) * bgm.duration;
});
bgm.addEventListener("ended", () => loadTrack(current + 1, true));

loadTrack(0, false);

let musicStarted = false;
function startMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;
  bgm.volume = 0.5;
  const initialSrc = CONFIG.songs[0].src || "song1.mp3";
  if (!bgm.currentSrc.endsWith(initialSrc)) bgm.src = initialSrc;
  bgm.play().then(() => setPlaying(true)).catch(()=>{});
}
window.addEventListener("load", () => {
  bgm.volume = 0.5;
  bgm.play().then(() => { musicStarted = true; setPlaying(true); }).catch(()=>{});
});
["pointerdown", "touchstart", "keydown", "click"].forEach((ev) =>
  document.addEventListener(ev, startMusicOnce, { passive: true })
);

// PROGRESS BAR
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  $("scroll-progress-bar").style.width = scrolled + "%";
});

// PETALS
const petalsEl = $("petals");
const PETALS = ["🌸", "🌷", "🌺", "🌻", "🌼"];
function spawnPetal(x) {
  const p = document.createElement("span");
  p.className = "petal";
  p.textContent = PETALS[(Math.random() * PETALS.length) | 0];
  p.style.left = (x != null ? x : Math.random() * 100) + "%";
  p.style.fontSize = 18 + Math.random() * 22 + "px";
  p.style.animationDuration = 6 + Math.random() * 6 + "s";
  petalsEl.appendChild(p);
  setTimeout(() => p.remove(), 11000);
}
function burstPetals(count) {
  for (let i = 0; i < count; i++) setTimeout(() => spawnPetal(), i * 40);
}
setInterval(() => spawnPetal(), 900);
spawnPetal();

// CELEBRATE MODAL
$("celebrateBtn").addEventListener("click", () => {
  $("fireworks-overlay").classList.remove("hidden");
  burstPetals(60);
  
  const wrap = $("modalFlowers");
  wrap.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const f = document.createElement("span");
    f.className = "confetti-piece";
    f.textContent = PETALS[(Math.random() * PETALS.length) | 0];
    f.style.left = Math.random() * 100 + "%";
    f.style.fontSize = 18 + Math.random() * 14 + "px";
    f.style.animationDuration = 3 + Math.random() * 3 + "s";
    f.style.animationDelay = Math.random() * 1.5 + "s";
    wrap.appendChild(f);
  }
});

$("closeModal").addEventListener("click", () => {
  $("fireworks-overlay").classList.add("hidden");
});
