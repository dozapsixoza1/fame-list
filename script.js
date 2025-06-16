document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/cards')
    .then(res => res.json())
    .then(cards => {
      const container = document.getElementById('cardsContainer');
      container.innerHTML = cards.map(card => \`
        <div class="bg-gray-800 rounded-lg p-4 shadow">
          <div class="text-sm bg-green-500 text-black inline-block px-2 py-1 rounded mb-2">\${card.category}</div>
          <img src="\${card.img}" alt="avatar" class="w-24 h-24 object-cover rounded-full mx-auto">
          <h3 class="text-xl text-center mt-2 font-bold">\${card.nickname}</h3>
          <p class="text-green-400 text-sm text-center">\${card.status}</p>
          <p class="text-sm mt-2">\${card.description}</p>
        </div>\`).join('');
    });
});
