'use strict';

import 'swiper/css';
import './style.css';
import './media-queries.css';

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
