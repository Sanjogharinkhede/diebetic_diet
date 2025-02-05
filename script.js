// Fetch food data from JSON
async function fetchFoodData() {
  const response = await fetch('data/foods.json');
  const data = await response.json();
  return data;
}

// Render food cards
function renderFoodCards(containerId, foods) {
  const container = document.getElementById(containerId);
  container.innerHTML = foods
    .map(
      (food) => `
      <div class="col">
        <div class="card h-100 animate__animated animate__fadeIn">
          <img src="${food.image}" class="card-img-top" alt="${food.name}">
          <div class="card-body">
            <h5 class="card-title">${food.name}</h5>
            <p class="card-text">
              <strong>Benefits:</strong> ${food.benefits}<br>
              <strong>Side Effects:</strong> ${food.sideEffects}<br>
              <strong>GI:</strong> ${food.gi} (${food.gi === 0 ? 'No carbs' : food.gi < 55 ? 'Low' : 'Medium'})
            </p>
            <button class="btn btn-success" onclick="addToCart('${food.name}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

// Add to Cart
function addToCart(foodName) {
  const cartItems = document.getElementById('cart-items');
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.textContent = foodName;
  cartItems.appendChild(li);
}

// Update Category Description
function updateCategoryDescription(description) {
  const categoryDescription = document.getElementById('category-description');
  categoryDescription.innerHTML = `<p class="lead">${description}</p>`;
}

// Initialize App
async function init() {
  const foodData = await fetchFoodData();

  // Render category descriptions and foods
  const pills = document.querySelectorAll('.nav-link');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const category = pill.getAttribute('aria-controls');
      updateCategoryDescription(foodData[category].description);
      renderFoodCards(`${category}-container`, foodData[category].foods);
    });
  });

  // Default to first category
  updateCategoryDescription(foodData.vegetables.description);
  renderFoodCards('vegetables-container', foodData.vegetables.foods);
}

init();