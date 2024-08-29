/* TI Control */
function cartOptimizationTest() {
  var waitForElements = setInterval(() => {
    const pageContainer = document.querySelector('.cart');
    if (typeof (ranCartOptimizationTest) === 'undefined' && pageContainer) {
      window.ranCartOptimizationTest = true;
      clearInterval(waitForElements);

      tiCartOptimizationTracking();
    }
  }, 100);
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
    vwodesc: 'CP-A-CartOptimization-Nov2023 - TI Control',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };
  const x = new XMLHttpRequest();
  x.open('POST', 'https://us-central1-tixray.cloudfunctions.net/err', !0), x.send(JSON.stringify(e));
}
