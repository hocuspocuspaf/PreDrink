const games = {
  spin: {
    title: "Flesje draaien",
    type: "Fles kiest",
    prompt: "De fles kiest iemand. Die speler kiest waarheid, opdracht of passen.",
    action: "Draaien",
    phoneTitle: "Benji is aan de beurt",
    phoneCopy: "De fles gaat draaien"
  },
  truth: {
    title: "Waarheid of drinken",
    type: "Waarheidskaart",
    prompt: "Wat is iets dat deze groep nog niet over jou weet?",
    action: "Trek kaart",
    phoneTitle: "Waarheidskaart",
    phoneCopy: "Antwoord of drink"
  },
  never: {
    title: "Ik heb nog nooit",
    type: "Handen omhoog",
    prompt: "Ik heb nog nooit een plan gecanceld omdat mijn outfit niet werkte.",
    action: "Onthul",
    phoneTitle: "Handen omhoog",
    phoneCopy: "Tik als het klopt"
  },
  likely: {
    title: "Wie zou het meest",
    type: "Stemronde",
    prompt: "Wie zou het meest impulsief een weekend weg boeken?",
    action: "Stem",
    phoneTitle: "Stem nu",
    phoneCopy: "Kies een speler"
  }
};

const cartridges = document.querySelectorAll(".game-cartridge");
const machine = document.querySelector(".party-machine");
const title = document.getElementById("stage-title");
const promptType = document.getElementById("prompt-type");
const promptText = document.getElementById("prompt-text");
const mainAction = document.getElementById("main-action");
const phoneTitle = document.getElementById("phone-title");
const phoneCopy = document.getElementById("phone-copy");
const vibes = document.querySelectorAll(".vibe");

function selectGame(gameName) {
  const game = games[gameName] || games.spin;

  cartridges.forEach((button) => {
    button.classList.toggle("active", button.dataset.game === gameName);
  });

  machine.dataset.selected = gameName;
  title.textContent = game.title;
  promptType.textContent = game.type;
  promptText.textContent = game.prompt;
  mainAction.textContent = game.action;
  phoneTitle.textContent = game.phoneTitle;
  phoneCopy.textContent = game.phoneCopy;
}

cartridges.forEach((button) => {
  button.addEventListener("click", () => selectGame(button.dataset.game));
});

vibes.forEach((button) => {
  button.addEventListener("click", () => {
    vibes.forEach((vibe) => vibe.classList.remove("active"));
    button.classList.add("active");
  });
});
