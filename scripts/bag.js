const CONVENIENCE_FEE = 99;
let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemObjects() {
  bagItemObjects = bagItems
    .map(itemId => items.find(item => item.id === itemId))
    .filter(Boolean);
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  if (!containerElement) return;

  if (bagItemObjects.length === 0) {
    containerElement.innerHTML = `
      <div class="empty-bag">
        <div class="empty-bag-mark">✕</div>
        <div class="empty-bag-title">Your bag is empty</div>
        <div class="empty-bag-sub">Nothing added yet — go pick something for the edit.</div>
        <a class="btn-back-shop" href="../index.html">Continue Shopping</a>
      </div>`;
    return;
  }

  let innerHTML = '';
  bagItemObjects.forEach(item => {
    innerHTML += generateItemHTML(item);
  });
  containerElement.innerHTML = innerHTML;
}

function generateItemHTML(item) {
  return `<div class="bag-item-row">
    <div class="swatch swatch-${item.swatch} bag-swatch"></div>
    <div class="bag-item-details">
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-row">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        ${item.discount_percentage > 0 ? `<span class="discount">${item.discount_percentage}% OFF</span>` : ''}
      </div>
      <div class="return-period">${item.return_period} days return available</div>
      <div class="delivery-details">Delivery by <span>${item.delivery_date}</span></div>
    </div>
    <button class="remove-from-bag" onclick="removeFromBag('${item.id}')" aria-label="Remove item">✕</button>
  </div>`;
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  if (!bagSummaryElement) return;

  if (bagItemObjects.length === 0) {
    bagSummaryElement.innerHTML = '';
    return;
  }

  let totalItems = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(item => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;

  bagSummaryElement.innerHTML = `
    <div class="summary-card">
      <div class="summary-header">Price Details (${totalItems} item${totalItems > 1 ? 's' : ''})</div>
      <div class="summary-line">
        <span>Total MRP</span>
        <span>₹${totalMRP}</span>
      </div>
      <div class="summary-line">
        <span>Discount on MRP</span>
        <span class="summary-discount">−₹${totalDiscount}</span>
      </div>
      <div class="summary-line">
        <span>Convenience Fee</span>
        <span>₹${CONVENIENCE_FEE}</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-line summary-total">
        <span>Total Amount</span>
        <span>₹${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">Place Order</button>
  `;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter(id => id !== itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}
