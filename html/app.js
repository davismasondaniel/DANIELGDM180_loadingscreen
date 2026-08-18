const bar = document.getElementById("bar");
const percent = document.getElementById("percent");
const tipEl = document.getElementById("tip");
const statusEl = document.getElementById("status");
const dotsEl = document.getElementById("dots");

const music = document.getElementById("music");
const toggleMusic = document.getElementById("toggleMusic");

const tips = [
  "Tip: Use /help to see commands and more.",
  "Tip: Read rules in discord — it saves everyone time.",
  "Tip: Use /onduty leo or fire.",
  "Tip: Use /tpm to teleport to a Waypoint on a map."
];

let fake = 0;
let dot = 0;
let tipIndex = 0;
let musicOn = true;

// Try autoplay (some systems may block until interaction)
music.volume = 0.10;
music.play().catch(() => {
  musicOn = false;
  toggleMusic.textContent = "Music: Off";
});

toggleMusic.addEventListener("click", async () => {
  musicOn = !musicOn;
  toggleMusic.textContent = `Music: ${musicOn ? "On" : "Off"}`;
  if (musicOn) {
    try { await music.play(); } catch(e) {}
  } else {
    music.pause();
  }
});

// Little animated dots
setInterval(() => {
  dot = (dot + 1) % 4;
  dotsEl.textContent = dot === 0 ? "• • •" : "•".repeat(dot);
}, 400);

// Rotate tips
setInterval(() => {
  tipIndex = (tipIndex + 1) % tips.length;
  tipEl.textContent = tips[tipIndex];
}, 3500);

// Fake progress (FiveM loading progress isn’t reliably exposed to NUI,
// so we simulate it nicely)
const progressTimer = setInterval(() => {
  fake = Math.min(99, fake + Math.random() * 3.5);
  setProgress(fake);
  if (fake > 10) statusEl.textContent = "Downloading assets…";
  if (fake > 45) statusEl.textContent = "Loading scripts…";
  if (fake > 80) statusEl.textContent = "Almost ready…";
}, 450);

function setProgress(val){
  const v = Math.max(0, Math.min(100, val));
  bar.style.width = `${v}%`;
  percent.textContent = `${Math.floor(v)}%`;
}

// When the game actually finishes and starts the session,
// the loadscreen is removed automatically.
// You can optionally “finish” the bar if you want:
window.addEventListener("message", (e) => {
  // If you later wire real events, handle them here.
});
