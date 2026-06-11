// Atualize esta data para a data real de quando voces comecaram a namorar.
const relationshipStartDate = new Date("2026-04-08T00:00:00");

const floatingHeartsContainer = document.querySelector(".floating-hearts");
const yearsElement = document.getElementById("years");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const startDateLabel = document.getElementById("start-date-label");
const heartButton = document.getElementById("heart-button");

function formatStartDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function updateRelationshipCounter() {
  const now = new Date();
  const diffMs = Math.max(0, now - relationshipStartDate);

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365.25);
  const days = totalDays % 365;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  yearsElement.textContent = years;
  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
}

function createFloatingHeart() {
  if (!floatingHeartsContainer) {
    return;
  }

  const heart = document.createElement("span");
  const size = Math.random() * 18 + 16;
  const drift = `${(Math.random() - 0.5) * 120}px`;
  const duration = `${Math.random() * 6 + 8}s`;

  heart.className = "floating-heart";
  heart.textContent = "❤";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty("--drift", drift);
  heart.style.animationDuration = duration;

  floatingHeartsContainer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 14000);
}

function createHeartBurst() {
  if (!heartButton) {
    return;
  }

  const rect = heartButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  Array.from({ length: 14 }).forEach((_, index) => {
    const burstHeart = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 14;
    const distance = 60 + Math.random() * 80;

    burstHeart.className = "burst-heart";
    burstHeart.textContent = Math.random() > 0.25 ? "❤" : "✨";
    burstHeart.style.left = `${centerX}px`;
    burstHeart.style.top = `${centerY}px`;
    burstHeart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    burstHeart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(burstHeart);
    window.setTimeout(() => burstHeart.remove(), 1800);
  });
}

startDateLabel.textContent = formatStartDate(relationshipStartDate);
updateRelationshipCounter();

window.setInterval(updateRelationshipCounter, 60000);
window.setInterval(createFloatingHeart, 900);

Array.from({ length: 18 }).forEach((_, index) => {
  window.setTimeout(createFloatingHeart, index * 180);
});

heartButton?.addEventListener("click", createHeartBurst);
