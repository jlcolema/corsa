function cartPageRedesignTestTracking() {
  if (typeof (cartpageredesigntracking) == 'undefined') {
    window.cartpageredesigntracking = 'loaded';

    var viewCartCTAs = document.querySelectorAll('.cart_container .action_button.view_cart_link');
    if (viewCartCTAs.length) {
      viewCartCTAs.forEach(function (button) {
        button.addEventListener('click', function () {
          gtag('event', 'cart_flyout_viewCart_click', {
            vwo_test_dimension: 'vwo_7_testVariation'
          });
        });
      });
    }

    var checkoutCTAs = document.querySelectorAll('.cart_container .action_button.add_to_cart');
    if (checkoutCTAs.length) {
      checkoutCTAs.forEach(function (button) {
        button.addEventListener('click', function () {
          gtag('event', 'cart_flyout_checkout_click', {
            vwo_test_dimension: 'vwo_7_testVariation'
          });
        });
      });
    }
  }
}

try {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cartPageRedesignTestTracking();
  } else {
    document.addEventListener('DOMContentLoaded', cartPageRedesignTestTracking);
  }
} catch (err) {
  var e = {
    dev: 'U024L8WH0',
    vwotest: '7',
    vwodesc: 'CP-A-CartPageRedesign-V1-Sep2023 | Campaign JS',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };

  var x = new XMLHttpRequest;
  x.open("POST", "https://us-central1-tixray.cloudfunctions.net/err", !0), x.send(JSON.stringify(e));
}
