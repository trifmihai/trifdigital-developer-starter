import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Mike T';
  greetUser(name);
  document.body.style.backgroundColor = 'red';
});
