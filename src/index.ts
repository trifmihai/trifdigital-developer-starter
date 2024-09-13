'use strict';

import './style.css';
import './section_pricing.css';
import './section_hero.css';
import './mediaQueries.css';

// import { initializeSlider } from '$scripts/slider';
import { greetUser } from '$utils/greet';
// import { DotLottie } from '@lottiefiles/dotlottie-web';

// const dotLottie = new DotLottie({
//   autoplay: true,
//   loop: true,
//   canvas: document.querySelector('#dotlottie-canvas') as HTMLCanvasElement,
//   src: 'https://lottie.host/f3ae5ed6-72be-493b-84b7-9b6232382cd1/24R26hxILQ.json', // Adjusted path
// });

// Example usage to avoid the error
// dotLottie.play();

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

// FORM

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
    '.container-large.radial-gradient, .container-large.cta_radial-gradient, .container-large.radial-gradient-projects'
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
// // Use Webflow's load event
// window.Webflow ||= [];
// window.Webflow.push(() => {
//   setupMaskHover();
// });

// ==============================
//? SLIDER
// ==============================

function initializeSlider(options = {}) {
  // Default settings
  const defaults = {
    slideSelector: '.slide',
    sliderSelector: '.slider',
    mediaQuery: null, // Optional media query
    transitionSpeed: 0.5, // In seconds
    dragThreshold: 0.25, // Fraction of viewport width
    adjustLastSlide: false, // Set to false as we'll handle gaps via CSS
    baseFontSize: 16, // For rem conversion
  };

  // Merge user options with defaults
  const settings = { ...defaults, ...options };

  let slides, slider;
  let currentSlide = 0;
  let maxSlide = 0;
  let isDragging = false;
  let startPos = 0;
  let currentPos = 0;
  let moveDistance = 0;
  let sliderInitialized = false;
  let mediaQueryList;

  // Function to get the gap in pixels
  const getGapInPixels = () => {
    const gapValue = getComputedStyle(slider).gap || '0px';
    const gapNumber = parseFloat(gapValue) || 0;

    // Safely extract the unit, defaulting to 'px' if none is found
    const gapUnitMatch = gapValue.match(/[a-zA-Z%]+$/);
    const gapUnit = gapUnitMatch ? gapUnitMatch[0] : 'px';

    let gapInPixels = gapNumber;

    switch (gapUnit) {
      case 'rem':
        gapInPixels = gapNumber * settings.baseFontSize;
        break;
      case 'em':
        const fontSize = parseFloat(getComputedStyle(slider).fontSize);
        gapInPixels = gapNumber * fontSize;
        break;
      case 'px':
        gapInPixels = gapNumber;
        break;
      case '%':
        const sliderWidth = slider.getBoundingClientRect().width;
        gapInPixels = (gapNumber / 100) * sliderWidth;
        break;
      default:
        // Default to pixels if unit is unrecognized
        gapInPixels = gapNumber;
        break;
    }

    return gapInPixels;
  };

  // Initialize the slider
  const init = () => {
    // Handle media query if specified
    if (settings.mediaQuery) {
      mediaQueryList = window.matchMedia(settings.mediaQuery);
      if (!mediaQueryList.matches) {
        if (sliderInitialized) {
          destroySlider();
        }
        return;
      }
    }

    slides = document.querySelectorAll(settings.slideSelector);
    slider = document.querySelector(settings.sliderSelector);

    if (slides.length === 0 || !slider) {
      console.warn('Slider or slides not found');
      return;
    }

    if (sliderInitialized) return; // Prevent multiple initializations
    sliderInitialized = true;

    maxSlide = slides.length;

    // Set up the slider
    setupSlider();
    attachEvents();
  };

  // Set up slider dimensions and initial position
  const setupSlider = () => {
    updateSliderDimensions();
    window.addEventListener('resize', updateSliderDimensions);
    window.addEventListener('DOMContentLoaded', updateSliderDimensions);
  };

  // Update slider dimensions
  const updateSliderDimensions = () => {
    // Move to the current slide
    goToSlide(currentSlide, false);
  };

  // Go to a specific slide
  const goToSlide = (slideIndex, smooth = true) => {
    const slideRect = slides[0].getBoundingClientRect();
    const slideWidth = slideRect.width;

    const gap = getGapInPixels();
    const totalWidth = slideWidth + gap;

    slider.style.transition = smooth ? `transform ${settings.transitionSpeed}s ease` : 'none';
    slider.style.transform = `translateX(-${totalWidth * slideIndex}px)`;
  };

  // Move to the next slide
  const nextSlide = () => {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  };

  // Move to the previous slide
  const prevSlide = () => {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  };

  // Start dragging
  const startDrag = e => {
    isDragging = true;
    startPos = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    moveDistance = 0; // Reset moveDistance
    slider.style.transition = 'none';
  };

  // Handle dragging
  const moveDrag = e => {
    if (!isDragging) return;

    currentPos = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    moveDistance = currentPos - startPos;

    const slideRect = slides[0].getBoundingClientRect();
    const slideWidth = slideRect.width;
    const gap = getGapInPixels();
    const totalWidth = slideWidth + gap;

    slider.style.transform = `translateX(${-totalWidth * currentSlide + moveDistance}px)`;
  };

  // End dragging
  const endDrag = () => {
    if (!isDragging) return;

    isDragging = false;

    // Define a minimal movement threshold (in pixels)
    const minimalMovement = 5; // Adjust this value as needed

    // Check if the move distance is significant
    if (Math.abs(moveDistance) < minimalMovement) {
      // Minimal movement detected, consider it a click, do not change slides
      goToSlide(currentSlide);
      slider.style.transition = `transform ${settings.transitionSpeed}s ease`;
      return;
    }

    const threshold = window.innerWidth * settings.dragThreshold;

    if (moveDistance > threshold) {
      prevSlide();
    } else if (moveDistance < -threshold) {
      nextSlide();
    } else {
      goToSlide(currentSlide);
    }

    slider.style.transition = `transform ${settings.transitionSpeed}s ease`;
  };

  // Attach event listeners
  const attachEvents = () => {
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mousemove', moveDrag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);
    slider.addEventListener('touchstart', startDrag);
    slider.addEventListener('touchmove', moveDrag);
    slider.addEventListener('touchend', endDrag);

    if (mediaQueryList) {
      mediaQueryList.addEventListener('change', onMediaQueryChange);
    }
  };

  // Detach event listeners
  const detachEvents = () => {
    slider.removeEventListener('mousedown', startDrag);
    slider.removeEventListener('mousemove', moveDrag);
    slider.removeEventListener('mouseup', endDrag);
    slider.removeEventListener('mouseleave', endDrag);
    slider.removeEventListener('touchstart', startDrag);
    slider.removeEventListener('touchmove', moveDrag);
    slider.removeEventListener('touchend', endDrag);

    window.removeEventListener('resize', updateSliderDimensions);
    window.removeEventListener('DOMContentLoaded', updateSliderDimensions);

    if (mediaQueryList) {
      mediaQueryList.removeEventListener('change', onMediaQueryChange);
    }
  };

  // Handle media query changes
  const onMediaQueryChange = e => {
    if (e.matches) {
      init();
    } else {
      destroySlider();
    }
  };

  // Destroy the slider
  const destroySlider = () => {
    detachEvents();
    slider.style.transform = '';
    slider.style.transition = '';

    slides.forEach(slide => {
      slide.style.flex = '';
    });

    sliderInitialized = false;
    currentSlide = 0;
  };

  // Initialize the slider
  init();
}

// Initialize the slider
initializeSlider({
  slideSelector: '.slide',
  sliderSelector: '.slider',
  mediaQuery: null, // Optional media query
  transitionSpeed: 0.5, // In seconds
  dragThreshold: 0.25, // Fraction of viewport width
  adjustLastSlide: false, // No need to adjust the last slide
  baseFontSize: 16, // For rem conversion
  // No need to specify 'gap' here since it's read from CSS
});

initializeSlider({
  slideSelector: '.pricing_slide',
  sliderSelector: '.pricing_slider',
  mediaQuery: '(max-width: 911px)', // Optional media query
  transitionSpeed: 0.5, // In seconds
  dragThreshold: 0.25, // Fraction of viewport width
  adjustLastSlide: false, // No need to adjust the last slide
  baseFontSize: 16, // For rem conversion
  // No need to specify 'gap' here since it's read from CSS
});
