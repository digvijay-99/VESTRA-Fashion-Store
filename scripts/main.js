let bagItems;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  displayBagIcon();

  // small confirmation pulse on the bag icon
  let bagIcon = document.querySelector('.bag-count');
  if (bagIcon) {
    bagIcon.classList.remove('pulse');
    void bagIcon.offsetWidth; // restart animation
    bagIcon.classList.add('pulse');
  }
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-count');
  if (!bagItemCountElement) return;
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector('.items-container');
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = '';
  items.forEach(item => {
    innerHtml += `
    <div class="item-card">
      <div class="swatch swatch-${item.swatch}">
        <span class="price-tag">
          <span class="price-tag-amt">₹${item.current_price}</span>
        </span>
      </div>
      <div class="card-body">
        <div class="rating-row">
          <span class="stars">${item.rating.stars} ★</span>
          <span class="rating-count">${item.rating.count} ratings</span>
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-row">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          ${item.discount_percentage > 0 ? `<span class="discount">${item.discount_percentage}% OFF</span>` : ''}
        </div>
        <button class="btn-add-bag" onclick="addToBag('${item.id}')">Add to Bag</button>
      </div>
    </div>`;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
