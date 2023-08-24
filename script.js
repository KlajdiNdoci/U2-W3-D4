const apiKey = "lIeknVfWbfo6iYqs2CLH3aUxaHLAoiwPyjV824gdSP7ZCRYpG6bKXAKS";

async function loadImages(query) {
  const URL = `https://api.pexels.com/v1/search?query=${query}`;
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await response.json();
    const images = data.photos;

    const container = document.querySelector(".album .container .row");
    container.innerHTML = "";

    images.forEach(image => {
      const card = createCard(image);
      container.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

const createCard = image => {
  const card = document.createElement("div");
  card.classList.add("col-md-4");
  card.innerHTML = `
    <div class="card mb-4 shadow-sm">
      <img src="${image.src.medium}" alt="${image.alt}" >
      <div class="card-body">
        <h5 class="card-title">${image.alt}</h5>
        <p class="card-text">${image.photographer}</p>
        <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" id="view-btn" class="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" id="hide-btn" class="btn btn-sm btn-outline-secondary">Hide</button>
        </div>
        <small class="text-muted">${image.id}</small>
      </div>
      </div>
    </div>
  `;
  const hideBtn = card.querySelector("#hide-btn");

  hideBtn.addEventListener("click", () => {
    card.style.display = "none";
  });
  return card;
};

const loadBtn = document.getElementById("load-btn");
const loadSecondaryBtn = document.getElementById("load-secondary-btn");

loadBtn.addEventListener("click", () => {
  loadImages("space");
});

loadSecondaryBtn.addEventListener("click", () => {
  loadImages("waterfall");
});

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  loadImages(searchInput.value);
});
