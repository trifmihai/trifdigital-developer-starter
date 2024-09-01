import './style.css';

import { greetUser } from '$utils/greet';

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
