'use strict';

import 'swiper/css';
import './style.css';
import './media-queries.css';

import { animate, scroll, timeline } from 'motion';
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

// Add an effect to .stakes_card that's a smooth red border color change on hover
const stakesCards = document.querySelectorAll('.stakes_card');

stakesCards.forEach(card => {
  const cardElement = card as HTMLElement; // Cast to HTMLElement
  cardElement.style.transition = 'border-color 0.3s ease'; // Add smooth transition

  cardElement.addEventListener('mouseenter', () => {
    cardElement.style.borderColor = 'red';
  });

  cardElement.addEventListener('mouseleave', () => {
    cardElement.style.borderColor = ''; // Reset border color
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
document.querySelectorAll('.accordion-item').forEach(item => {
  const header = item.querySelector('.accordion-item-header');
  if (header) {
    header.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  }
});

// ==============================
// ?CTA interaction
// ==============================

function setupMaskHover() {
  const maskedElements = document.querySelectorAll(
    '.container-large.radial-gradient, .container-large.cta_radial_gradient, .container-large.radial-gradient-projects'
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
      (element as HTMLElement).style.setProperty('--mouse-x', '50%');
      (element as HTMLElement).style.setProperty('--mouse-y', '50%');
    });
  });
}

document.addEventListener('DOMContentLoaded', setupMaskHover);

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

// Ball animation
const directionCircle = document.querySelector('.plan_directing-circle') as HTMLElement;
const planContainer = document.querySelector('.plan-container-v2') as HTMLElement;
const directionLine = document.querySelector('.plan_line') as HTMLElement;

// Ball scroll animation
scroll(animate(directionCircle, { top: [`0%`, `calc(100% - ${directionCircle.offsetWidth}px)`] }), {
  target: planContainer,
  offset: ['start 90%', 'end 10%'],
});

// Animate the pseudo-element height using CSS variable
scroll(
  ({ y }) => {
    const progress = y.progress * 100;

    // Adjust the height of the yellow part behind the ball using a CSS variable
    directionLine.style.setProperty('--progress-height', `${progress}%`);
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
    buttonState.textContent = `Bam! Email’s all yours.`;
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
  scrollOffsets: ['start end', 'end 65%'],
});
