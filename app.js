const DAY_MAIN_IMAGE = "assets/bus-stop-main.jpeg";
const NIGHT_MAIN_IMAGE = "assets/final-feature-images/09-adaptive-lighting.png";

const features = {
  1: { name: "Solar Panels", panel: "assets/final-feature-images/01-solar-panels.png", alt: "Feature 1: Solar panels on roof. Supplied final feature image." },
  2: { name: "Rain Canopy", panel: "assets/final-feature-images/02-rain-canopy.png", alt: "Feature 2: Rain-responsive canopy. Supplied final feature image." },
  3: { name: "Rainwater Harvesting", panel: "assets/final-feature-images/03-rainwater-harvesting.png", alt: "Feature 3: Rainwater harvesting. Supplied final feature image." },
  4: { name: "Green Roof & Plants", panel: "assets/final-feature-images/04-green-roof-plants.png", alt: "Feature 4: Green roof and planters. Supplied final feature image." },
  5: { name: "Smart Lighting", panel: "assets/final-feature-images/05-smart-lighting.png", alt: "Feature 5: Presence-sensing lights. Supplied final feature image." },
  6: { name: "Retractable Bench", panel: "assets/final-feature-images/06-retractable-bench.png", alt: "Feature 6: Retractable bench, three-step explanation. Supplied final feature image." },
  7: { name: "Comfortable Seating", panel: "assets/final-feature-images/07-comfortable-seating.png", alt: "Feature 7: Comfortable seating with greenery. Supplied final feature image." },
  8: { name: "Bus Information Display", panel: "assets/final-feature-images/08-bus-information-display.png", alt: "Feature 8: Real-time bus information display. Supplied final feature image." },
  9: { name: "Adaptive Lighting", panel: "assets/final-feature-images/09-adaptive-lighting.png", alt: "Feature 9: Adaptive lighting at night. Supplied final feature image." },
};

const modeState = { lighting: "day", weather: "normal", crowd: "normal" };
const initialView = document.getElementById("initialView");
const mainImageFrame = document.getElementById("mainImageFrame");
const mainBusStopImage = document.getElementById("mainBusStopImage");
const nightModeLabel = document.getElementById("nightModeLabel");
const featureNav = document.getElementById("featureNav");
const modeVisuals = document.getElementById("modeVisuals");
const rainModeVisual = document.getElementById("rainModeVisual");
const crowdModeVisual = document.getElementById("crowdModeVisual");
const modeButtons = [...document.querySelectorAll(".mode-option")];
const featureSection = document.getElementById("featureSection");
const panelImage = document.getElementById("featurePanelImage");
const selectedFeatureLabel = document.getElementById("selectedFeatureLabel");
const resetButton = document.getElementById("resetView");
const featureButtons = [...document.querySelectorAll(".feature-button")];
let activeFeature = null;

Object.values(features).forEach((feature) => {
  const image = new Image();
  image.src = feature.panel;
});

function setActiveButton(id) {
  featureButtons.forEach((button) => {
    const isActive = button.dataset.feature === String(id);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setModeEmphasis() {
  const emphasisedFeatures = new Set();
  if (modeState.lighting === "night") [5, 9].forEach((id) => emphasisedFeatures.add(String(id)));
  if (modeState.weather === "rain") [2, 3].forEach((id) => emphasisedFeatures.add(String(id)));
  if (modeState.crowd === "crowded") emphasisedFeatures.add("6");

  featureButtons.forEach((button) => {
    button.classList.toggle("is-mode-emphasized", emphasisedFeatures.has(button.dataset.feature));
  });
}

function setMainVisual() {
  const isNight = modeState.lighting === "night";
  const nextSource = isNight ? NIGHT_MAIN_IMAGE : DAY_MAIN_IMAGE;
  const nextAlt = isNight
    ? "Supplied adaptive lighting at night feature image used as the night mode visual."
    : "Wide view of the proposed NUS smart bus stop with solar panels, greenery, seating, lights and bus information display.";

  mainImageFrame.classList.toggle("is-night", isNight);
  mainImageFrame.classList.toggle("is-raining", modeState.weather === "rain");
  nightModeLabel.hidden = !isNight;

  if (mainBusStopImage.getAttribute("src") === nextSource) return;

  mainBusStopImage.classList.add("is-changing");
  window.setTimeout(() => {
    mainBusStopImage.src = nextSource;
    mainBusStopImage.alt = nextAlt;
    mainBusStopImage.addEventListener("load", () => mainBusStopImage.classList.remove("is-changing"), { once: true });
  }, 180);
}

function setModeVisuals() {
  const showRain = modeState.weather === "rain";
  const showCrowd = modeState.crowd === "crowded";
  const shouldShow = showRain || showCrowd;

  rainModeVisual.hidden = !showRain;
  crowdModeVisual.hidden = !showCrowd;

  if (shouldShow && modeVisuals.hidden) {
    modeVisuals.hidden = false;
    modeVisuals.classList.remove("is-revealed");
    requestAnimationFrame(() => modeVisuals.classList.add("is-revealed"));
  }

  if (!shouldShow) {
    modeVisuals.hidden = true;
    modeVisuals.classList.remove("is-revealed");
  }
}

function renderModes() {
  modeButtons.forEach((button) => {
    const isSelected = modeState[button.dataset.mode] === button.dataset.value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  setMainVisual();
  setModeEmphasis();
  setModeVisuals();
}

function setPanel(feature) {
  const changingPanel = panelImage.getAttribute("src") && panelImage.getAttribute("src") !== feature.panel;
  const applyPanel = () => {
    panelImage.src = feature.panel;
    panelImage.alt = feature.alt;
    requestAnimationFrame(() => panelImage.classList.remove("is-changing"));
  };

  if (changingPanel) {
    panelImage.classList.add("is-changing");
    window.setTimeout(applyPanel, 180);
  } else {
    applyPanel();
  }
}

function showFeature(id) {
  const feature = features[id];
  if (!feature) return;

  activeFeature = Number(id);
  setPanel(feature);
  selectedFeatureLabel.textContent = `Feature ${String(id).padStart(2, "0")} — ${feature.name}`;
  setActiveButton(id);

  if (featureSection.hidden) {
    featureSection.hidden = false;
    featureSection.classList.remove("is-revealed");
    requestAnimationFrame(() => featureSection.classList.add("is-revealed"));
  }

  window.setTimeout(() => {
    featureSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function resetView() {
  activeFeature = null;
  featureSection.hidden = true;
  featureSection.classList.remove("is-revealed");
  setActiveButton(0);
  initialView.scrollIntoView({ behavior: "smooth", block: "start" });
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeState[button.dataset.mode] = button.dataset.value;
    renderModes();
  });
});

featureButtons.forEach((button) => {
  button.addEventListener("click", () => showFeature(button.dataset.feature));
});

resetButton.addEventListener("click", resetView);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeFeature !== null) resetView();
});

renderModes();
