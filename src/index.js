document.addEventListener("DOMContentLoaded", () => {
  const addCardButtons = document.querySelectorAll(".add-card");

  addCardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const columnId = button.getAttribute("data-column");
      const cardText = prompt("Введите текст карточки:");
      if (cardText) {
        addCard(columnId, cardText);
        saveState();
      }
    });
  });

  loadState();
});

function addCard(columnId, cardText) {
  const cardContainer = document.getElementById(`card-container-${columnId}`);
  const card = document.createElement("div");
  card.className = "card";
  card.innerText = cardText;

  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = "&#10006;"; // Иконка крестика
  deleteButton.className = "delete-card";
  deleteButton.onclick = () => {
    cardContainer.removeChild(card);
    saveState();
  };

  card.appendChild(deleteButton);
  cardContainer.appendChild(card);
}

function saveState() {
  const state = {};
  for (let i = 1; i <= 3; i++) {
    const cards = Array.from(
      document.getElementById(`card-container-${i}`).children
    ).map((card) => card.innerText);
    state[`column-${i}`] = cards;
  }
  localStorage.setItem("taskBoardState", JSON.stringify(state));
}

function loadState() {
  const state = JSON.parse(localStorage.getItem("taskBoardState"));
  if (state) {
    for (let i = 1; i <= 3; i++) {
      const cards = state[`column-${i}`] || [];
      cards.forEach((cardText) => addCard(i, cardText));
    }
  }
}
