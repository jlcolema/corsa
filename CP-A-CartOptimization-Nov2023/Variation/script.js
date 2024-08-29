/* Variation */
function cartOptimizationTest() {
  var waitForElements = setInterval(() => {
    const pageContainer = document.querySelector('.cart');
    if (typeof (ranCartOptimizationTest) === 'undefined' && pageContainer) {
      window.ranCartOptimizationTest = true;
      clearInterval(waitForElements);

      // Scope CSS
      document.body.classList.add('ti10');

      // Add Test Functions Here
      cartOptimizationUPDATE();

      tiCartOptimizationTracking();
    }
  }, 100);
}

function cartOptimizationUPDATE() {
  // Create headings above the product listing
  function addCartItemHeadings() {
    const cartWrapper = document.querySelector('.cart__wrapper > .eleven.columns');
    if (cartWrapper) {
      // Check if the element already exists to avoid duplicates
      const existingHeadings = cartWrapper.querySelector('.cart__item-headings');

      if (!existingHeadings) {
        // Create new elements
        const headingsWrapper = document.createElement('div');
        headingsWrapper.className = 'cart__item-headings';

        // Headings for Product, Price, Quantity, Subtotal
        const headings = ['Product', 'Price', 'Quantity', 'Subtotal'];
        headings.forEach(heading => {
          const div = document.createElement('div');
          div.className = `cart__item-heading cart__item-heading--${heading.toLowerCase()}`;
          div.textContent = heading;
          headingsWrapper.appendChild(div);
        });

        // Insert the new element at the beginning of the cart wrapper
        cartWrapper.prepend(headingsWrapper);
      }
    }
  }

  // Add wrapper around product title and meta
  function addProductTitleAndMetaWrapper() {
    const cartItems = document.querySelectorAll('.cart__item');

    cartItems.forEach(item => {
      const titleDiv = item.querySelector('.cart__item--title');
      // Select only p.meta elements that don't have any additional classes
      const metaParagraph = item.querySelector('p.meta:not([class*="cart__item--"])');
      const existingWrapper = item.querySelector('.cart__item--title-wrapper');

      // Check if the wrapper already exists
      if (titleDiv && !existingWrapper) {
        // Create new title wrapper
        const titleWrapper = document.createElement('div');
        titleWrapper.className = 'cart__item--title-wrapper';

        // Insert the new wrapper before the title div
        titleDiv.parentNode.insertBefore(titleWrapper, titleDiv);

        // Move the title and meta (if exists) inside the new wrapper
        titleWrapper.appendChild(titleDiv);
        if (metaParagraph) {
          titleWrapper.appendChild(metaParagraph);
        }
      }
    });
  }

  // Duplicate the subtotal for use at smaller screen sizes
  function duplicateProductSubtotal() {
    const cartItems = document.querySelectorAll('.cart__item');

    if (cartItems.length > 0) {
      cartItems.forEach(item => {
        const moneySpan = item.querySelector('.price_total span[class="money"]:not(.was_price), .price_total span[class="money "]:not(.was_price)');
        const modalPrice = item.querySelector('.modal_price');
        // Check if the cloned span already exists in modalPrice
        const existingClonedSpan = modalPrice.querySelector('.money--subtotal');

        if (moneySpan && modalPrice && !existingClonedSpan) {
          // Clone the money span
          const clonedMoneySpan = moneySpan.cloneNode(true);

          // Add an additional class 'money--subtotal' to the cloned span
          clonedMoneySpan.classList.add('money--subtotal');

          // Insert the cloned span as the first child within modal price
          if (modalPrice.firstChild) {
            modalPrice.insertBefore(clonedMoneySpan, modalPrice.firstChild);
          } else {
            modalPrice.appendChild(clonedMoneySpan);
          }
        }
      });
    }
  }

  // Duplicate the `.was_price` from `.price_total` into `.modal_price`
  function duplicateWasPriceContent() {
    const cartItems = document.querySelectorAll('.cart__item');

    cartItems.forEach(item => {
      const priceTotalWasPrice = item.querySelector('.price_total .money.was_price');
      const modalPriceWasPrice = item.querySelector('.modal_price .money.was_price');

      // Check if modalPriceWasPrice does not start with '$' and priceTotalWasPrice has content
      if (modalPriceWasPrice && (!modalPriceWasPrice.textContent.trim().startsWith('$')) && priceTotalWasPrice) {
        // Copy the content from .price_total .was_price to .modal_price .was_price
        modalPriceWasPrice.textContent = priceTotalWasPrice.textContent;
      }
    });
  }

  // Add class to `.sale` if `.was_price` is empty
  function addClassBasedOnWasPrice() {
    const cartItems = document.querySelectorAll('.cart__item');

    if (cartItems.length > 0) {
      cartItems.forEach(item => {
        const modalPrice = item.querySelector('.modal_price');
        const wasPrice = modalPrice.querySelector('.money.was_price');
        const salePrice = modalPrice.querySelector('.money.sale');

        // Check if wasPrice is empty and salePrice exists
        if (salePrice && (!wasPrice || wasPrice.textContent.trim() === '')) {
          salePrice.classList.add('money--no-was-price');
        }
      });
    }
  }

  // Add "Cart Summary" heading within the `.subtotal` block
  function addCartSummary() {
    const subtotal = document.querySelector('.subtotal');

    if (subtotal) {
      // Check if the "Cart Summary" heading already exists to avoid duplicates
      const existingHeading = subtotal.querySelector('.subtotal__heading');

      if (!existingHeading) {
        const newElement = document.createElement('h2');
        newElement.className = 'subtotal__heading';
        newElement.textContent = 'Cart Summary';
        subtotal.prepend(newElement);
      }
    }
  }

  // Change "Total Savings" text to "Savings"
  function updateTotalSavingsText() {
    const cartSavings = document.querySelector('.cart_savings');
    if (cartSavings) {
      const spanElements = cartSavings.querySelectorAll('span');
      spanElements.forEach(span => {
        if (span.textContent.includes('Total Savings')) {
          span.textContent = span.textContent.replace('Total Savings', 'Savings');
        }
      });
    }
  }

  // Create and insert `.subtotal__sale-total` element
  function addSubtotalSaleTotal() {
    const cartSavings = document.querySelector('.cart_savings');
    const cartSubtotalMoney = document.querySelector('.cart_subtotal .money');
    const existingSaleTotal = document.querySelector('.subtotal__sale-total');

    if (cartSavings && cartSubtotalMoney && !existingSaleTotal) {
      // Create new element
      const newElement = document.createElement('p');
      newElement.className = 'subtotal__sale-total';

      const rightSpan = document.createElement('span');
      rightSpan.className = 'right';

      const moneySpan = document.createElement('span');
      moneySpan.className = 'money';
      moneySpan.textContent = cartSubtotalMoney.textContent; // Duplicate the price

      rightSpan.appendChild(moneySpan);
      newElement.appendChild(rightSpan);
      newElement.insertAdjacentHTML('afterbegin', '<span>Sale Total:</span>');

      // Insert the new element after `.cart_savings`
      cartSavings.parentNode.insertBefore(newElement, cartSavings.nextSibling);
    }
  }

  // Move `.affirm-as-low-as` before `.checkout_button` element
  function moveAffirmAsLowAs() {
    const affirmAsLowAs = document.querySelector('.affirm-as-low-as');
    const checkoutButton = document.querySelector('.checkout_button');

    if (affirmAsLowAs && checkoutButton && affirmAsLowAs !== checkoutButton.previousElementSibling) {
      checkoutButton.parentNode.insertBefore(affirmAsLowAs, checkoutButton);
    }
  }

  // Replace `.continue-shopping` with a new element
  function replaceContinueShopping() {
    const continueShopping = document.querySelector('.continue-shopping');
    const subtotal = document.querySelector('.subtotal');

    if (continueShopping && subtotal) {
      // Create new element
      const newElement = document.createElement('p');
      newElement.className = 'taxes-and-shipping';
      newElement.innerHTML = 'Taxes and <a href="https://www.corsaperformance.com/policies/shipping-policy" target="_blank">shipping</a> calculated at checkout';

      // Replace `.continue-shopping` with the new element
      continueShopping.parentNode.replaceChild(newElement, continueShopping);

      // Move the new element after `.subtotal`
      if (subtotal.nextSibling !== newElement) {
        subtotal.parentNode.insertBefore(newElement, subtotal.nextSibling);
      }
    }
  }

  // Move `.additional-checkout-buttons` after the new `.taxes-and-shipping` element
  function moveAdditionalCheckoutButtons() {
    const additionalCheckoutButtons = document.querySelector('.additional-checkout-buttons');
    const taxesAndShipping = document.querySelector('.taxes-and-shipping');

    if (additionalCheckoutButtons && taxesAndShipping && taxesAndShipping.nextSibling !== additionalCheckoutButtons) {
      taxesAndShipping.parentNode.insertBefore(additionalCheckoutButtons, taxesAndShipping.nextSibling);
    }
  }

  // Move `.govx-id-full-wrapper` after `.additional-checkout-buttons`
  function moveGovXID() {
    const govXID = document.querySelector('.govx-id-full-wrapper');
    const additionalCheckoutButtons = document.querySelector('.additional-checkout-buttons');

    if (govXID && additionalCheckoutButtons && additionalCheckoutButtons.nextSibling !== govXID) {
      additionalCheckoutButtons.parentNode.insertBefore(govXID, additionalCheckoutButtons.nextSibling);
    }
  }

  // Create a new MutationObserver
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        addCartSummary();
        addCartItemHeadings();
        addProductTitleAndMetaWrapper();
        duplicateProductSubtotal();
        duplicateWasPriceContent();
        addClassBasedOnWasPrice();
        updateTotalSavingsText();
        addSubtotalSaleTotal();
        moveAffirmAsLowAs();
        replaceContinueShopping();
        moveAdditionalCheckoutButtons();
        moveGovXID();
      }
    });
  });

  // Start observing the DOM for changes, specifically observing child list changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Optional: Disconnect observer after a certain condition is met (e.g., element is found and moved)
  // observer.disconnect();
}

function tiCartOptimizationTracking() {

  // Events to track:

  // cart_proceed_to_checkout
  // cart_shop_pay
  // cart_paypal
  // cart_gpay

  var gaTracking = setInterval(() => {
    if (typeof (gtag) !== 'undefined') {
      clearInterval(gaTracking);

      // Track clicks on the Proceed to Checkout button
      const cartProceedToCheckout = document.querySelectorAll('button[name="checkout"]');
      if (cartProceedToCheckout.length) {
        cartProceedToCheckout.forEach(function (button) {
          button.addEventListener('click', function () {
            gtag('event', 'cart_proceed_to_checkout', {
              vwo_test_dimension: 'vwo_10_testVariation'
            });
          });
        })
      }

      // Additional tracking for Shop Pay, Apple Pay, and Google Pay
      document.addEventListener('click', function (e) {
        if (e.target.matches('div[data-testid="ShopifyPay-button"]')) {
          gtag('event', 'cart_shop_pay', {
            vwo_test_dimension: 'vwo_10_testVariation'
          });
        } else if (e.target.matches('div[data-testid="ApplePay-button"]')) {
          gtag('event', 'cart_apple_pay', {
            vwo_test_dimension: 'vwo_10_testVariation'
          });
        } else if (e.target.matches('div[data-testid="GooglePay-button"]')) {
          gtag('event', 'cart_gpay', {
            vwo_test_dimension: 'vwo_10_testVariation'
          });
        }
      });

      // Tracking for PayPal
      // Select the node that will be observed for mutations
      const targetNode = document.body;

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        var payPalModal = document.querySelector('.paypal-checkout-sandbox');
        if (document.body.contains(payPalModal)) {
          gtag('event', 'cart_paypal', {
            vwo_test_dimension: 'vwo_10_testVariation'
          });
          observer.disconnect();
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

      // END NEW

    }
  }, 100);

}

try {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cartOptimizationTest();
  } else {
    document.addEventListener('DOMContentLoaded', cartOptimizationTest);
  }
} catch (err) {
  const e = {
    dev: 'U05C4LLSK6G',
    vwotest: '10',
    vwodesc: 'CP-A-CartOptimization-Nov2023 - Variation',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };
  const x = new XMLHttpRequest();
  x.open('POST', 'https://us-central1-tixray.cloudfunctions.net/err', !0), x.send(JSON.stringify(e));
}
