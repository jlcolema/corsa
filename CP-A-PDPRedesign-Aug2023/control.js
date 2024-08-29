function pdpRedesign() {
  if (typeof pdpRedesignChanges === 'undefined') {
    window.pdpRedesignChanges = 'true';
    tiTracking();
  }
  function tiTracking() {
    const addToCart = document.querySelector('.container .action_button.add_to_cart');
    if (addToCart) {
      addToCart.addEventListener('click', () => {
        gtag('event', 'pdp_add_to_cart', {
          vwo_test_dimension: 'vwo_2_Control',
        });
      });
    }

    const shopPay = document.querySelector('.shopify-payment-button');
    if (shopPay) {
      shopPay.addEventListener('click', () => {
        gtag('event', 'pdp_buy_shop_pay', {
          vwo_test_dimension: 'vwo_2_Control',
        });
      });
    }

    const notifyAvailable = document.querySelector('.action_button.klaviyo-bis-trigger');
    if (notifyAvailable) {
      notifyAvailable.addEventListener('click', () => {
        gtag('event', 'pdp_notify_me_when_available', {
          vwo_test_dimension: 'vwo_2_Control',
        });
      });
    }
  }
}
if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  pdpRedesign();
} else {
  document.addEventListener('DOMContentLoaded', pdpRedesign);
}
