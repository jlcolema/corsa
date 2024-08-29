function pdpRedesign() {
  if (typeof pdpRedesignChanges === 'undefined') {
    window.pdpRedesignChanges = 'true';
    contentChanges();
    tiTracking();
  }
  function tiTracking() {
    const addToCart = document.querySelector('.container .action_button.add_to_cart');
    if (addToCart) {
      addToCart.addEventListener('click', () => {
        gtag('event', 'pdp_add_to_cart', {
          vwo_test_dimension: 'vwo_2_Variation',
        });
      });
    }

    const shopPay = document.querySelector('.shopify-payment-button');
    if (shopPay) {
      shopPay.addEventListener('click', () => {
        gtag('event', 'pdp_buy_shop_pay', {
          vwo_test_dimension: 'vwo_2_Variation',
        });
      });
    }

    const notifyAvailable = document.querySelector('.action_button.klaviyo-bis-trigger');
    if (notifyAvailable) {
      notifyAvailable.addEventListener('click', () => {
        gtag('event', 'pdp_notify_me_when_available', {
          vwo_test_dimension: 'vwo_2_Variation',
        });
      });
    }
  }
  function contentChanges() {
    const formBadges = document.querySelector('#form_badges');
    if (formBadges) {
      const govContent = `
        <div class="gov-content">
            <p>Honoring those who serve our country and communities: <span>Verify your status in cart to unlock additional discounts.</span></p>
        </div>`;
      formBadges.insertAdjacentHTML('afterend', govContent);
    }
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (window.innerWidth >= 800) {
          const productTitle = document.querySelector('#product_title');
          const buyArea = document.querySelector('#buy_area');
          if (productTitle && buyArea) {
            buyArea.insertAdjacentElement('beforebegin', productTitle);
          }
        } else {
          const titleZone = document.querySelector('#titlezone');
          const productTitle = document.querySelector('#product_title');
          if (titleZone) {
            titleZone.insertAdjacentElement('afterbegin', productTitle);
          }
        }
      });
    });

    const targetElement = document.body;
    observer.observe(targetElement);

    //grabs each h2, then find each element below the h2 that isnt an h2

    jQuery('.description')
      .children()
      .each(function () {
        // if header we need to
        // create new FAQ element
        if ($(this).is('h2')) {
          // create shell
          $(
            '<div class="faq-wrapper"><div class="faq-question"></div><div class="faq-answer"></div></div>'
          ).insertBefore($(this));
          // move to new shell (should always be last)
          $(this).appendTo($('.faq-wrapper .faq-question').last());
        } else {
          // assume p or UL tag and should go in last answer
          $(this).appendTo($('.faq-wrapper .faq-answer').last());
        }
      });

    //when a user clicks on faq-question, add active to wrapper
    const faqQuestions = document.querySelectorAll('.faq-wrapper');

    if (faqQuestions.length) {
      faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
          const wasActive = question.classList.contains('active');

          faqQuestions.forEach((innerQuestion) => {
            innerQuestion.classList.remove('active');
          });

          if (!wasActive) {
            question.classList.add('active');
          }
        });
      });
    }
    const optionTitles = document.querySelectorAll('.option_title');
    optionTitles.forEach((optionTitle) => {
      const trimmedtitle = optionTitle.textContent.trim();
      optionTitle.innerHTML = `${trimmedtitle}:`;
    });
    // Function to update the option_title
    function updateOptionTitle(event) {
      const selectedInput = event.target;
      const selectedInputText = selectedInput.getAttribute('aria-label');
      const optionTitleElement = selectedInput
        .closest('.swatch')
        .querySelector('.option_title');

      // Remove any existing span elements
      const existingSpan = optionTitleElement.querySelector('span');
      if (existingSpan) {
        existingSpan.remove();
      }

      // Create a new span element and append it to the option_title
      const spanElement = document.createElement('span');
      spanElement.textContent = selectedInputText;
      optionTitleElement.appendChild(spanElement);
    }

    // Add event listeners to each section's radio inputs
    const swatchSections = document.querySelectorAll('.swatch.clearfix');
    swatchSections.forEach((section) => {
      const radioInputs = section.querySelectorAll('input[type="radio"]');
      radioInputs.forEach((input) => {
        input.addEventListener('change', updateOptionTitle);
      });

      // Initial update for each section
      const selectedInput = section.querySelector(
        'input[type="radio"]:checked'
      );
      if (selectedInput) {
        updateOptionTitle({ target: selectedInput });
      }
    });

    const rebate = document.querySelector('.rebate');
    if (rebate) {
      const modalPrice = document.querySelector('.modal_price');
      modalPrice.insertAdjacentElement('afterend', rebate);
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
