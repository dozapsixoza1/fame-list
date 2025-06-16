
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalAvatar = document.getElementById("modalAvatar");
  const modalName = document.getElementById("modalName");
  const modalDescription = document.getElementById("modalDescription");
  const modalLink1 = document.getElementById("modalLink1");
  const modalLink2 = document.getElementById("modalLink2");
  const modalLink3 = document.getElementById("modalLink3");
  const cardsContainer = document.getElementById("cardsContainer");
  const categoryFilters = document.getElementById("categoryFilters");
  const modalClose = document.getElementById("modalClose");

  function fetchCards() {
    fetch("/api/cards")
      .then(res => res.json())
      .then(data => {
        const categories = [...new Set(data.map(c => c.category))];
        categoryFilters.innerHTML = '';
        categories.forEach(cat => {
          const btn = document.createElement("button");
          btn.textContent = cat;
          btn.className = "bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600";
          btn.onclick = () => renderCards(data.filter(c => c.category === cat));
          categoryFilters.appendChild(btn);
        });
        renderCards(data);
      });
  }

  function renderCards(cards) {
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "bg-white dark:bg-gray-800 shadow rounded-xl p-4 cursor-pointer hover:shadow-lg transition";
      div.innerHTML = `
        <img src="\${card.avatar}" class="w-16 h-16 rounded-full mx-auto mb-2" />
        <h3 class="text-center font-bold mb-1">\${card.name}</h3>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">\${card.description}</p>
      `;
      div.onclick = () => {
        modal.classList.remove("hidden");
        modalAvatar.src = card.avatar;
        modalName.textContent = card.name;
        modalDescription.textContent = card.description;
        modalLink1.href = card.link1;
        modalLink2.href = card.link2;
        modalLink3.href = card.link3;
      };
      cardsContainer.appendChild(div);
    });
  }

  modalClose.onclick = () => modal.classList.add("hidden");

  fetchCards();
});
