const gameCards = document.querySelectorAll(".game-card");
const previews = document.querySelectorAll(".preview-board");
const title = document.getElementById("preview-title");
const mainAction = document.getElementById("main-action");
const mainActionLabel = document.getElementById("main-action-label");
const sheet = document.getElementById("flow-sheet");
const sheetTitle = document.getElementById("sheet-title");
const topRoomState = document.getElementById("top-room-state");
const roomCode = document.getElementById("room-code");
const roomStatus = document.getElementById("room-status");
const playerCount = document.getElementById("player-count");
const stripRoom = document.getElementById("strip-room");
const stripVibe = document.getElementById("strip-vibe");
const stripPlayers = document.getElementById("strip-players");
const roomStart = document.getElementById("room-start-btn");
document.body.dataset.appShell = "3";

const gameCopy = {
  spin: {
    title: "Flesje draaien",
    action: "Draaien",
    status: "Geselecteerd"
  },
  truth: {
    title: "Waarheid of drinken",
    action: "Volgende kaart",
    status: "Geselecteerd"
  },
  never: {
    title: "Ik heb nog nooit",
    action: "Onthul",
    status: "Geselecteerd"
  },
  likely: {
    title: "Wie zou het meest",
    action: "Stemming openen",
    status: "Geselecteerd"
  }
};

const defaultStatus = {
  spin: "Fles",
  truth: "Vragen",
  never: "Klassieker",
  likely: "Stemmen"
};

function setGame(game) {
  const copy = gameCopy[game] || gameCopy.spin;

  gameCards.forEach((card) => {
    const active = card.dataset.game === game;
    card.classList.toggle("active", active);
    const status = card.querySelector(".game-status");
    if (status) status.textContent = active ? copy.status : defaultStatus[card.dataset.game];
  });

  previews.forEach((preview) => {
    preview.classList.toggle("active", preview.dataset.preview === game);
  });

  title.textContent = copy.title;
  mainActionLabel.textContent = copy.action;
}

gameCards.forEach((card) => {
  card.addEventListener("click", () => setGame(card.dataset.game));
});

function setFlowTab(name) {
  const target = name === "join" ? "join" : "create";
  document.querySelectorAll(".flow-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.flowTab === target);
  });
  document.querySelectorAll(".flow-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.flowPanel === target);
  });
  sheetTitle.textContent = target === "join" ? "Meedoen met kamer" : "Maak kamer";
}

function openSheet(name) {
  setFlowTab(name);
  sheet.classList.add("open");
  sheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("sheet-open");
}

function closeSheet() {
  sheet.classList.remove("open");
  sheet.setAttribute("aria-hidden", "true");
  document.body.classList.remove("sheet-open");
}

window.PreDrinkFlow = {
  open: openSheet,
  close: closeSheet
};

function activateRoom(code, joined = false) {
  const cleanCode = (code || "PD-204").toUpperCase();
  roomCode.textContent = cleanCode;
  roomStatus.textContent = joined ? "Aangemeld" : "Live";
  roomStatus.classList.add("live");
  topRoomState.textContent = cleanCode;
  topRoomState.classList.add("live");
  stripRoom.textContent = cleanCode;
  stripPlayers.textContent = joined ? "Organisator + 8" : "Organisator + 7";
  playerCount.textContent = joined ? "+5" : "+4";
  roomStart.textContent = "Start spel";
  closeSheet();
}

document.addEventListener("click", (event) => {
  const openTrigger = event.target.closest("[data-open-flow]");
  if (openTrigger) {
    openSheet(openTrigger.dataset.openFlow);
    return;
  }

  if (event.target.closest("[data-close-flow]")) {
    closeSheet();
    return;
  }

  const flowTab = event.target.closest("[data-flow-tab]");
  if (flowTab) {
    setFlowTab(flowTab.dataset.flowTab);
    return;
  }

  if (event.target.closest("#create-demo-room")) {
    activateRoom("PD-482");
    return;
  }

  if (event.target.closest("#join-demo-room")) {
    activateRoom(document.getElementById("join-code").value, true);
  }
});

document.querySelectorAll("[data-open-flow]").forEach((button) => {
  button.addEventListener("click", () => openSheet(button.dataset.openFlow));
});

roomStart.addEventListener("click", () => {
  roomStatus.textContent = "Bezig";
  topRoomState.textContent = `${roomCode.textContent} live`;
  roomStart.textContent = "Volgende ronde";
  document.getElementById("preview-title").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    stripVibe.textContent = button.textContent;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sheet.classList.contains("open")) closeSheet();
});
