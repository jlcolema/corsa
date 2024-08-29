function createoverlay() {
  const header = document.querySelector('#header');
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'over-lay';
  header.insertAdjacentElement('afterend', overlayDiv);
}

function addHoverfunction() {
  // copying desktop control functions
  vwo_$(document).ready(function () {
    var tiWaitjQuery = setInterval(function () {
      if (typeof ($) != 'undefined') {
        clearInterval(tiWaitjQuery);

        // on desktop, we need to switch to click event
        if (!is_touch_device() && $(window).width() > 798 || $(window).width() > 798) {
          setTimeout(function () {
            // update their event listeners
            // after we unbind first
            $('.dropdown_link').off('mouseover touchstart');
            $('.dropdown_link').on('click touchstart', function (e) {
              e.preventDefault();
              if ($(window).width() > 798) {
                $('.dropdown_container').hide();
              }

              var $dropdown = $(this).parents('.main_nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]');
              var clickCount = $(this).attr('data-click-count');

              $('.active_link').removeClass('active_link');

              if (!$(this).hasClass('active_link')) {
                $dropdown.show();

                if ($(this).hasClass('mini_cart')) {
                  if (!$('body').hasClass('cart')) {
                    $(this).parent('.cart_container').addClass('active_link');
                    $('body').addClass('desk-overlay-show');
                    // impression event
                    gtag('event', 'cart_flyout_impression', {
                      vwo_test_dimension: 'vwo_7_testVariation'
                    });
                  }
                } else {
                  if ($(window).width() > 798) {
                    $(this).addClass('active_link');
                  }
                  $('.is-absolute').parent().removeClass('feature_image');
                }
              }
            });

            $('.main_nav, .top_bar, .cart_container').off("mouseleave");
            $('.main_nav, .top_bar, .cart_container').on("mouseleave", function () {
              if ($(window).width() > 798) {
                $('.dropdown_container').hide();
              }
              // edit was to exclude cart flyout
              $('.active_link').not('.cart_container').removeClass('active_link');
              $('.is-absolute').parent().addClass('feature_image');
            });
          }, 500);
        }

        $('html').on('click', function (event) {
          if (!$(event.target).closest('.cart_container').length) {

            $('body').removeClass('desk-overlay-show');
          }
        });

        $('body').on('click', '.dropdown_link', function (e) {
          if ($('#header').is(':visible')) {

            if (!$(this).hasClass('mini_cart')) {
              $('body').removeClass('desk-overlay-show');
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
              $('body').addClass('desk-overlay-show');
              // impression event
              gtag('event', 'cart_flyout_impression', {
                vwo_test_dimension: 'vwo_7_testVariation'
              });
            }
          }, 100);
        });

        // and one from me copying closeMiniCart function on "X" click
        $('body').on('click', '.cart-drawer-header-close', function (e) {
          $('body').removeClass('desk-overlay-show');
          $('body').removeClass('is-active').removeClass('blocked-scroll');
          $('.dropdown_link').toggleClass('active_link');
          $('.cart_container').removeClass('active_link');
        });
      }
    }, 100);
  });
}

function createCartHeader(qty, plural) {
  var cartDrawerHeader = `
    <div class="cart-drawer-header">
      <div class="cart-drawer-header-actions">
        <strong>Cart</strong>
        <span><span class="cart-drawer-header-qty">${qty}</span> item<span class="cart-drawer-header-plural">${plural}</span></span>
        <a href="javascript:void(0);" class="cart-drawer-header-close"></a>
      </div>
      <div class="cart-drawer-header-labels">
        <div class="cart-drawer-header-label label-product">Product</div>
        <div class="cart-drawer-header-label label-qty">Qty</div>
        <div class="cart-drawer-header-label label-subtotal">Subtotal</div>
      </div>
    </div>
  `;

  var cartDropDowns = document.querySelectorAll('header .cart_container .cart_content');
  if (cartDropDowns.length) {
    cartDropDowns.forEach(function (dropdown) {
      // make sure not already present 
      if (!dropdown.querySelector('.cart-drawer-header')) {
        // then add
        dropdown.insertAdjacentHTML('afterbegin', cartDrawerHeader);
      }
    });
  }
}

function cartDrawerWatcher() {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector('#header .cart_container .js-cart_items');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // update cart header
    var cartQty = document.querySelector('#header .cart_container .cart_count');
    var plural = '';
    if (cartQty) {
      cartQtyNum = cartQty.innerText;
      if (cartQtyNum.indexOf(',') > -1) {
        cartQtyNum = cartQtyNum.replace(',', '');
      }
      cartQtyNum = parseFloat(cartQtyNum);
      if (cartQtyNum > 1) {
        plural = 's';
      }
      updateCartHeader(cartQtyNum, plural);
    }

    // start listening again
    observer.observe(targetNode, config);
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  if (targetNode) {
    observer.observe(targetNode, config);
  }
}

function updateCartHeader(qty, plural) {
  var cartHeaderQtys = document.querySelectorAll('.cart_container .cart-drawer-header-qty');
  var cartHeaderPlurals = document.querySelectorAll('.cart_container .cart-drawer-header-plural');

  // update qtys
  if (cartHeaderQtys.length) {
    cartHeaderQtys.forEach(function (elem) {
      elem.innerHTML = qty;
    });
  }

  // update plurals
  if (cartHeaderPlurals.length) {
    cartHeaderPlurals.forEach(function (elem) {
      elem.innerHTML = plural;
    });
  }
}

function ctaUpdates() {
  // update all CTAs
  var cartFlyoutCtas = document.querySelectorAll('header .cart_container .action_button.add_to_cart');
  if (cartFlyoutCtas.length) {
    cartFlyoutCtas.forEach(function (button) {
      // update button text
      button.innerHTML = button.innerHTML.replace('Proceed to ', '');
      if (button.closest('li')) {
        // add class to parent
        button.closest('li').classList.add('cart-cta-wrapper');
        // add view cart link
        button.closest('li').insertAdjacentHTML('afterbegin', '<a href="/cart" class="action_button view_cart_link">View cart</a>')
      }
    });
  }
}

function cartPageRedesignTest() {
  var waitForElements = setInterval(() => {
    const cartFlyouts = document.querySelectorAll('header .cart_items.js-cart_items'); // SELECT A TARGET ELEMENT HERE
    if (typeof (cartpageredesign) === 'undefined' && cartFlyouts.length) {
      window.cartpageredesign = true;
      clearInterval(waitForElements);
      // SCOPE CSS
      document.body.classList.add('ti7'); // UPDATE TEST NUMBER 
      // ADD TEST FUNCTIONS HERE
      createoverlay();
      addHoverfunction();
      ctaUpdates();
      var cartQty = document.querySelector('#header .cart_container .cart_count');
      var plural = '';
      if (cartQty) {
        cartQtyNum = cartQty.innerText;
        if (cartQtyNum.indexOf(',') > -1) {
          cartQtyNum = cartQtyNum.replace(',', '');
        }
        cartQtyNum = parseFloat(cartQtyNum);
        if (cartQtyNum > 1) {
          plural = 's';
        }
        createCartHeader(cartQtyNum, plural);
      }

      // then watch for future updates
      cartDrawerWatcher();
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
    vwodesc: 'CP-A-CartPageRedesign-V1-Sep2023 | Variation',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };

  var x = new XMLHttpRequest;
  x.open("POST", "https://us-central1-tixray.cloudfunctions.net/err", !0), x.send(JSON.stringify(e));
}
