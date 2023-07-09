var body;
var boxes;
var stands;

function init () {
    toggleSwitch = document.querySelector('#toggle');
    toggleSwitch.addEventListener('change', switchTheme, false);
    boxes = document.querySelectorAll('.box');
    stands = document.querySelectorAll('.stand');
    body = document.querySelector('body');
    currentTheme = localStorage.getItem('theme');
    console.log(currentTheme);
    if (currentTheme) {
        boxes.forEach(element => {
            element.classList.add(currentTheme);
          });
          stands.forEach(element => {
            element.classList.add(currentTheme);
          });   
      body.classList.add(currentTheme);
      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
      }
    }
    console.log(currentTheme);
}

// function that retrieves the event target of the switch-container in html and adds the class 'dark' to each element
// saves it in localstorage every time the event switch-container is checked or not checked 
function switchTheme(e) {
    if (e.target.checked) {
        boxes.forEach(element => {
            element.classList.add('dark');
          });
          stands.forEach(element => {
            element.classList.add('dark');
          });   
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        boxes.forEach(element => {
            element.classList.remove('dark');
          });
          stands.forEach(element => {
            element.classList.remove('dark');
          });
        body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}
}
window.addEventListener("load", init);