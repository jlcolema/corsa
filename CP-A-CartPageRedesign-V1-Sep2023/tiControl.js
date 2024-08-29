function addHoverfunction() {
  // copying desktop control functions
  vwo_$(document).ready(function () {
    var tiWaitjQuery = setInterval(function () {
      if (typeof ($) != 'undefined') {
        clearInterval(tiWaitjQuery);

        // their event listeners
        $('.dropdown_link').on('mouseover touchstart', function (e) {
          if (!$(this).hasClass('active_link')) {
            if ($(this).hasClass('mini_cart')) {
              if (!$('body').hasClass('cart')) {
                // impression event
                gtag('event', 'cart_flyout_impression', {
                  vwo_test_dimension: 'vwo_7_testVariation'
                });
              }
            }
          }
        });

        if (Shopify.theme_settings.cart_action != 'redirect_cart') {
          $(".mini_cart").on("click", function (e) {
            var $cart_container = $(this).parent();
            if (!$cart_container.hasClass('active_link')) {
              // impression event
              gtag('event', 'cart_flyout_impression', {
                vwo_test_dimension: 'vwo_7_testVariation'
              });
            }
          });
        }

        // ajax add to cart
        $(document).on('click', '.ajax-submit', function (e) {
          // wait for drawer to open
          var tiWaitOpenDrawer = setInterval(function () {
            if ($('.cart_container.active_link').length) {
              clearInterval(tiWaitOpenDrawer);
              // impression event
              gtag('event', 'cart_flyout_impression', {
                vwo_test_dimension: 'vwo_7_testVariation'
              });
            }
          }, 100);
        });
      }
    }, 100);
  });
}


function cartPageRedesignTest() {
  var waitForElements = setInterval(() => {
    const cartFlyouts = document.querySelectorAll('header .cart_items.js-cart_items'); // SELECT A TARGET ELEMENT HERE
    if (typeof (cartpageredesign) === 'undefined' && cartFlyouts.length) {
      window.cartpageredesign = true;
      clearInterval(waitForElements);

      addHoverfunction();
    }
  }, 100);
}

try {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    cartPageRedesignTest();
  } else {
    document.addEventListener('DOMContentLoaded', cartPageRedesignTest);
  }
} catch (err) {
  var e = {
    dev: 'U024L8WH0',
    vwotest: '7',
    vwodesc: 'CP-A-CartPageRedesign-V1-Sep2023 | TI Control',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };

  var x = new XMLHttpRequest;
  x.open("POST", "https://us-central1-tixray.cloudfunctions.net/err", !0), x.send(JSON.stringify(e));
}
