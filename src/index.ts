'use strict';

import 'swiper/css';
import './style.css';
import './media-queries.css';

import { animate, inView, scroll, timeline } from 'motion';
import Swiper from 'swiper';

// import { initializeSlider } from '$scripts/slider';
import { greetUser } from '$utils/greet';

// Initialize Swiper
const swiper = new Swiper('.swiper', {
  enabled: true, // Swiper is enabled by default

  breakpoints: {
    // When the window width is >= 768px
    911: {
      enabled: false, // Disable Swiper for screens 768px and up
    },
  },
  slidesPerView: 'auto',
  spaceBetween: 16,
  grabCursor: true,
});

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Mike';
  greetUser(name);
});

document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with the data-mask attribute set to "false"
  const elementsToUnmask = document.querySelectorAll('[data-mask="false"]');

  elementsToUnmask.forEach(function (element) {
    // Remove the mask effect by adding the 'no-mask' class
    element.classList.remove('container-large', 'radial-gradient');
  });
});

// Style the parent element of the checked radio
document.querySelectorAll('.form-radio input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function (this: HTMLInputElement) {
    // Remove border color from all .form-radio elements
    document.querySelectorAll('.form-radio').forEach(formRadio => {
      (formRadio as HTMLElement).style.borderColor = '';
    });

    // Add border color to the parent .form-radio of the checked radio
    if (this.checked) {
      const parentFormRadio = this.closest('.form-radio') as HTMLElement;
      if (parentFormRadio) {
        parentFormRadio.style.borderColor = '#727272';
      }
    }
  });
});

// Auto resize textarea
function autoResizeTextarea() {
  const textareas = document.querySelectorAll('textarea');

  textareas.forEach(textarea => {
    textarea.addEventListener('input', function (this: HTMLTextAreaElement) {
      // Reset height to auto to get the correct scrollHeight
      this.style.height = 'auto';
      // Set the height to the scrollHeight
      this.style.height = this.scrollHeight + 'px';
    });

    // Initial call to set the correct height
    textarea.dispatchEvent(new Event('input'));
  });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', autoResizeTextarea);

// Accordion
// document.querySelectorAll('.accordion-item').forEach(item => {
//   item.addEventListener('click', event => {
//     // Check if the click is inside the accordion-item-header or the parent accordion-item
//     const header = event.target.closest('.accordion-item-header');

//     // Toggle the class only if header or its child is clicked
//     if (header || event.target === item) {
//       item.classList.toggle('open');
//     }
//   });
// });

document.querySelectorAll('.accordion-item').forEach(item => {
  item.addEventListener('click', event => {
    // Check if the click is inside the accordion-item-header or the parent accordion-item
    const header = event.target.closest('.accordion-item-header');

    // Toggle the class only if header or its child is clicked
    if (header || event.target === item) {
      item.classList.toggle('open');

      // Find the description wrapper with the combo class .is-profile
      const descriptionWrapper = item.querySelector(
        '.accordion-item-description-wrapper.is-profile'
      );
      if (descriptionWrapper) {
        if (item.classList.contains('open')) {
          // Delay setting overflow to visible by 0.2 seconds
          setTimeout(() => {
            descriptionWrapper.style.overflow = 'visible';
          }, 200);
        } else {
          // Immediately set overflow to hidden
          descriptionWrapper.style.overflow = 'hidden';
        }
      }
    }
  });
});

// ==============================
// ?CTA interaction
// ==============================

function setupMaskHover() {
  const maskedElements = document.querySelectorAll(
    '.container-large.radial-gradient, .container-large.cta_radial-gradient, .container-large.radial-gradient-projects, .plan_grid-v2.is-left, .plan_grid-v2.is-right'
  );

  maskedElements.forEach(element => {
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      (element as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (element as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });

    element.addEventListener('mouseleave', () => {
      (element as HTMLElement).style.setProperty('--mouse-x', '-100%');
      (element as HTMLElement).style.setProperty('--mouse-y', '-100%');
    });
  });
}

document.addEventListener('DOMContentLoaded', setupMaskHover);

// ?? =================
const toggleButton = document.querySelector('.hamburger-wrapper');
const navbarLinks = document.querySelector('.navbar_links');
const navbarButtonWrapper = document.querySelector('.navbar_button-wrapper');
const navbarComponent = document.querySelector('.navbar_component');
const navbarContainer = document.querySelector('.navbar_container');
const midLine = document.querySelector('.hamburger-line.is-mid');
const topLine = document.querySelector('.hamburger-line.is-top');
const bottomLine = document.querySelector('.hamburger-line.is-bottom');
const body = document.querySelector('body');

const toggleNavbar = () => {
  navbarLinks?.classList.toggle('is-active');
  navbarButtonWrapper?.classList.toggle('is-active');
  navbarComponent?.classList.toggle('is-active');
  navbarContainer?.classList.toggle('is-active');
  midLine?.classList.toggle('is-active');
  topLine?.classList.toggle('is-active');
  bottomLine?.classList.toggle('is-active');
  body?.classList.toggle('no-scroll');
};

toggleButton?.addEventListener('click', toggleNavbar);

// ==============================
// ? PLAN SECTION
// ==============================

// const obsCallback = function();

// const obsOptions = {}

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe()

// Smooth ball animation with easing
const directionCircle = document.querySelector('.plan_directing-circle') as HTMLElement;
const planContainer = document.querySelector('.plan-container-v2') as HTMLElement;
const directionLine = document.querySelector('.plan_line') as HTMLElement;

// Ball scroll animation with easing
scroll(
  animate(
    directionCircle,
    { top: [`0%`, `calc(100% - ${directionCircle.offsetWidth}px)`] },
    { easing: 'ease-out' } // Add smooth easing
  ),
  {
    target: planContainer,
    offset: ['start 90%', 'end 10%'],
  }
);

// Animate the pseudo-element height using CSS variable with scroll throttling
scroll(
  ({ y }) => {
    const progress = y.progress * 100;

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      directionLine.style.setProperty('--progress-height', `${progress}%`);
    });
  },
  {
    target: planContainer,
    offset: ['start 90%', 'end 10%'],
  }
);

// ==============================
// ? COPY TO CLIPBOARD
// ==============================

const copyText = document.querySelector(
  '.contact-me_card .margin-custom2 .text-size-medium'
) as HTMLElement;
const buttonState = document.querySelector('.copy_wrapper .text-size-regular') as HTMLElement;
const copyWrapper = document.querySelector('.copy_wrapper') as HTMLElement;
const clipDefaultIcon = document.querySelector('.clipboard-icon.is-default') as HTMLElement;
const clipSuccessIcon = document.querySelector('.clipboard-icon.is-success') as HTMLElement;

(function () {
  // Function to handle the copy action
  const handleCopy = (e: Event) => {
    e.preventDefault();
    const text = copyText.textContent;
    if (text !== null) {
      navigator.clipboard.writeText(text);
      updateUIOnCopy();
      setTimeout(resetUI, 10000);
    }
  };

  // Function to update the UI when text is copied
  const updateUIOnCopy = () => {
    buttonState.textContent = `Successfully copied!`;
    copyWrapper.classList.add('copied');
    clipDefaultIcon.classList.add('hidden');
    clipSuccessIcon.classList.remove('hidden');
  };

  // Function to reset the UI after a delay
  const resetUI = () => {
    buttonState.textContent = `Copy address`;
    copyWrapper.classList.remove('copied');
    clipDefaultIcon.classList.remove('hidden');
    clipSuccessIcon.classList.add('hidden');
  };

  // Add event listeners to the copy wrapper
  copyWrapper.addEventListener('click', handleCopy);
  copyWrapper.addEventListener('touchend', handleCopy);
})();

// ==============================
// ? BENEFIT ANIMATION
// ==============================

function animateSVGScroll(options) {
  const {
    svgSelector,
    testSectionSelector,
    baseLineClass = 'line-path-base',
    animatedLineClass = 'line-path-animated',
    maskClass = 'mask-path',
    baseLineColor = '#ffffff',
    animatedLineColor = '#ffff00',
    strokeWidth = 2,
    strokeDasharray = '4 4',
    scrollOffsets = ['start end', 'end 65%'],
  } = options;

  const svgElements = document.querySelectorAll(svgSelector);
  const testSections = document.querySelectorAll(testSectionSelector);

  // Arrays to collect all mask paths and their corresponding test sections
  const allMaskPaths = [];
  const allTestSections = [];

  svgElements.forEach((svgElement, svgIndex) => {
    const testSection = testSections[svgIndex];
    allTestSections.push(testSection);

    // **Step 1: Select all child elements to animate**
    const baseElements = svgElement.querySelectorAll('path, line, rect');

    // **Step 2: Assign classes to base elements dynamically**
    baseElements.forEach(element => {
      element.classList.add(baseLineClass);
      // Apply styles using setAttribute
      element.setAttribute('stroke', baseLineColor);
      element.setAttribute('stroke-width', strokeWidth);
      element.setAttribute('stroke-dasharray', strokeDasharray);
      element.setAttribute('fill', 'none');
    });

    // Create or select the <defs> element
    let defsElement = svgElement.querySelector('defs');
    if (!defsElement) {
      defsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svgElement.insertBefore(defsElement, svgElement.firstChild);
    }

    // Function to calculate total length for different SVG elements
    function getElementTotalLength(element) {
      if (element.getTotalLength) {
        return element.getTotalLength();
      }
      if (element.tagName === 'rect') {
        const width = parseFloat(element.getAttribute('width'));
        const height = parseFloat(element.getAttribute('height'));
        return 2 * (width + height);
      }
      // Default value or further calculations for other element types
      return 100;
    }

    // Array to store mask paths and their total lengths
    const maskPaths = [];

    // Loop over each base element to create mask and animated paths
    baseElements.forEach((baseElement, index) => {
      // Clone the base element to create the mask path
      const maskElementClone = baseElement.cloneNode(true);
      maskElementClone.setAttribute('class', `${maskClass} ${maskClass}-${svgIndex}-${index}`);
      maskElementClone.setAttribute('stroke', '#fff');
      maskElementClone.setAttribute('fill', 'none');

      // Create mask element
      const maskElement = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
      maskElement.setAttribute('id', `line-mask-${svgIndex}-${index}`);
      maskElement.appendChild(maskElementClone);

      // Append mask to defs
      defsElement.appendChild(maskElement);

      // Clone the base element to create the animated path
      const animatedElement = baseElement.cloneNode(true);
      animatedElement.setAttribute(
        'class',
        `${animatedLineClass} ${animatedLineClass}-${svgIndex}-${index}`
      );
      animatedElement.setAttribute('stroke', animatedLineColor);
      animatedElement.setAttribute('fill', 'none');
      animatedElement.setAttribute('mask', `url(#line-mask-${svgIndex}-${index})`);
      animatedElement.setAttribute('stroke-width', strokeWidth);
      animatedElement.setAttribute('stroke-dasharray', strokeDasharray);

      // Append animated element to SVG
      svgElement.appendChild(animatedElement);

      // Set up the animation for the mask path
      const totalLength = getElementTotalLength(maskElementClone);
      maskElementClone.setAttribute('stroke-dasharray', totalLength);
      maskElementClone.setAttribute('stroke-dashoffset', totalLength);

      // Store the mask path and its total length for animation
      maskPaths.push({
        element: maskElementClone,
        totalLength: totalLength,
      });
    });

    // Add the mask paths and test section for this SVG to the global arrays
    allMaskPaths.push({
      maskPaths: maskPaths,
      testSection: testSection,
    });
  });

  // **Set up scroll animation for all mask paths**
  allMaskPaths.forEach(({ maskPaths, testSection }) => {
    scroll(
      ({ y }) => {
        const { progress } = y; // Value between 0 and 1

        maskPaths.forEach(({ element, totalLength }) => {
          const drawLength = totalLength * (1 - progress);
          element.setAttribute('stroke-dashoffset', drawLength);
        });
      },
      {
        target: testSection,
        offset: scrollOffsets,
      }
    );
  });
}

// Call the function once with combined selectors
animateSVGScroll({
  svgSelector: '.svg-line-big, .svg-line-small',
  testSectionSelector: '.benefit_lines.is-big, .benefit_lines.is-small',
  baseLineColor: 'var(--neutral--800)', // Or any color you prefer
  animatedLineColor: 'var(--neutral--500)', // Or any color you prefer
  strokeWidth: 2,
  strokeDasharray: '4 4',
  scrollOffsets: ['20% end', 'end 65%'],
});

// ==============================
// ? NAVBAR
// ==============================

// ? Switch button

// Define the media query
const mediaQuery = window.matchMedia('(max-width: 911px)');

// Function to switch classes based on media query state
const switchButtonClass = e => {
  const button = document.querySelector('.button');
  if (e.matches) {
    // Media query matches (e.g., screen width is 768px or less)
    button.classList.remove('is-secondary');
    button.classList.add('is-primary');
  } else {
    // Media query does not match (e.g., screen width is greater than 768px)
    button.classList.remove('is-primary');
    button.classList.add('is-secondary');
  }
};

// Initial check
switchButtonClass(mediaQuery);

// Add event listener to handle changes in the media query state
mediaQuery.addEventListener('change', switchButtonClass);

// ==============================
// ? FORM
// ==============================

// ? Select related radio button

// Function to handle pricing button clicks
const handlePricingButtonClick = event => {
  const button = event.target.closest('.button');
  if (!button || !button.closest('.pricing_card-heading')) return;

  const selectedOption = button.getAttribute('data-option');

  // Scroll to the form section
  // document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });

  // Set the corresponding radio button
  const radioButtonId = `radio-option${selectedOption.slice(-1)}`;
  const radioButton = document.getElementById(radioButtonId);
  if (radioButton) {
    radioButton.checked = true;

    // Optionally trigger a reflow/repaint
    radioButton.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    console.error(`Radio button with ID ${radioButtonId} not found`);
  }
};

// Add event listener to the parent element
document.body.addEventListener('click', handlePricingButtonClick);

// ==============================
// ? STAKES ANIMATION
// ==============================

const mikeButton = document.querySelector('.text-size-small.profile_button');
const mikeProfile = document.querySelector('.profile-container');

mikeButton.addEventListener('mouseenter', () => {
  animate(
    mikeProfile,
    {
      opacity: [0, 1],
      top: ['200%', '0%'],
      transform: [
        'translateX(-50%) translateY(calc(-100% - 0.25rem)) rotateZ(0deg)',
        'translateX(-50%) translateY(calc(-100% - 0.25rem)) rotateZ(-15deg)',
        'translateX(-50%) translateY(calc(-100% - 0.25rem)) rotateZ(4deg)',
        'translateX(-50%) translateY(calc(-100% - 0.25rem)) rotateZ(0deg)',
      ],
    },
    { duration: 0.3, easing: 'ease-out' }
  );
});

mikeButton.addEventListener('mouseleave', () => {
  animate(
    mikeProfile,
    { opacity: [1, 0], top: ['0%', '100%'] },
    { duration: 0.2, easing: 'ease-in' }
  );
});

// Function to apply floating animation while hovered, alternating Y direction
function applyFloatingEffect(elements) {
  elements.forEach((element, index) => {
    // Alternate the Y direction based on whether the index is even or odd
    const translateYValues = index % 2 === 0 ? ['0%', '-12%', '0%'] : ['0%', '12%', '0%'];
    const floatingAnimation = animate(
      element,
      { translateY: translateYValues },
      { duration: 3.5, easing: 'ease-in-out', repeat: Infinity }
    );
    element.floatingAnimation = floatingAnimation; // Store the animation instance so we can cancel it later
  });
}

// Function to stop floating animation on mouse leave
function stopFloatingEffect(elements) {
  elements.forEach(element => {
    if (element.floatingAnimation) {
      element.floatingAnimation.cancel(); // Stop the floating animation
      element.floatingAnimation = null; // Clean up the reference
    }
  });
}

// Function to apply hover animations (handles both enter, leave, and floating)
function applyHoverAnimations(card, floatingElements, textElement, iconElement, hoverStyles) {
  card.addEventListener('mouseenter', () => {
    // Apply the hover "enter" animations
    floatingElements.forEach((element, index) => {
      const enterTransform = hoverStyles[index]?.enter || {};
      animate(element, enterTransform, { duration: 0.2, easing: 'ease-out' });
    });
    animate(card, { borderColor: '#9B4A44' }, { duration: 0.2, easing: 'ease-out' });
    animate(textElement, { color: '#9B4A44' }, { duration: 0.2, easing: 'ease-out' });
    animate(iconElement, { stroke: '#9B4A44' }, { duration: 0.2, easing: 'ease-out' });

    // Start floating effect during hover
    applyFloatingEffect(floatingElements);
  });

  card.addEventListener('mouseleave', () => {
    // Apply the hover "leave" animations
    floatingElements.forEach((element, index) => {
      const leaveTransform = hoverStyles[index]?.leave || {};
      animate(element, leaveTransform, { duration: 0.2, easing: 'ease-in' });
    });
    animate(card, { borderColor: 'var(--neutral--700)' }, { duration: 0.2, easing: 'ease-in' });
    animate(
      textElement,
      { color: 'var(--color--text--light--primary)' },
      { duration: 0.2, easing: 'ease-in' }
    );
    animate(
      iconElement,
      { stroke: 'var(--color--text--light--primary)' },
      { duration: 0.2, easing: 'ease-in' }
    );

    // Stop the floating effect when hover is removed
    stopFloatingEffect(floatingElements);
  });
}

// Function to initialize a single card's animations dynamically
function initCardAnimations(card, hoverStyles) {
  // Dynamically select all floating elements inside the card
  const floatingElements = Array.from(card.querySelectorAll('.stakes-floating'));

  const textElement = card.querySelector('.stakes_content-wrapper > .text-size-regular');
  const iconElement = card.querySelector('.benefit_icon-wrapper > .stakes_icon > svg > path');

  // Apply hover animations with floating effects
  applyHoverAnimations(card, floatingElements, textElement, iconElement, hoverStyles);
}

// List of hover styles for cards, allowing different numbers of floating elements
const cardHoverStyles = [
  // Card 1 hover styles (3 floating elements)
  [
    {
      enter: { top: '-4%', left: '-53%', rotate: 13, scale: 1 },
      leave: { top: '49%', left: '5%', rotate: 0, scale: 0.5 },
    },
    {
      enter: { top: '73%', left: '-40%', rotate: -13, scale: 1 },
      leave: { top: '20%', left: '5%', rotate: 0, scale: 0.5 },
    },
    {
      enter: { top: '57%', left: '111%', rotate: 13, scale: 1 },
      leave: { top: '41%', left: '67%', rotate: 0, scale: 0.5 },
    },
  ],
  // Card 2 hover styles (3 floating elements, different positions)
  [
    {
      enter: { top: '35%', left: '-47%', rotate: 13, scale: 1 },
      leave: { top: '5%', left: '5%', rotate: 0, scale: 0.5 },
    },
    {
      enter: { top: '13%', left: '104%', rotate: -13, scale: 1 },
      leave: { top: '57%', left: '61%', rotate: 0, scale: 0.5 },
    },
    {
      enter: { top: '87%', left: '117%', rotate: 13, scale: 1 },
      leave: { top: '31%', left: '67%', rotate: 0, scale: 0.5 },
    },
  ],
  // Card 3 hover styles (4 floating elements, showing flexibility)
  [
    {
      enter: { top: '4%', left: '-47%', rotate: -13, scale: 1 },
      leave: { top: '50%', left: '5%', rotate: 0, scale: 0.5 },
    },
    {
      enter: { top: '66%', left: '-27%', rotate: 13, scale: 1 },
      leave: { top: '15%', left: '10%', rotate: 0, scale: 0.5 },
    },
    {
      enter: { top: '40%', left: '107%', rotate: -13, scale: 1 },
      leave: { top: '41%', left: '60%', rotate: 0, scale: 0.5 },
    },
    {
      enter: { top: '20%', left: '90%', rotate: 5, scale: 1 },
      leave: { top: '25%', left: '65%', rotate: 0, scale: 0.5 },
    },
  ],
];

// Initialize animations for each card
const cards = document.querySelectorAll('.stakes_card');
cards.forEach((card, index) => {
  const hoverStyles = cardHoverStyles[index] || []; // Apply styles based on card index
  initCardAnimations(card, hoverStyles);
});

// ==============================
// ? MIKE PROFILE
// ==============================

// animate(
//   element,
//   { translateY: translateYValues },
//   { duration: 3.5, easing: 'ease-in-out', repeat: Infinity }
// );
