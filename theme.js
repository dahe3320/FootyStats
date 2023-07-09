var body;
var currentTheme;
var toggleSwitch;
var tabone;
var tabtwo;
var tab;



function init () {
    toggleSwitch = document.querySelector('#toggle');
    toggleSwitch.addEventListener('change', switchTheme, false);
    body = document.querySelector('body');
    tab = document.querySelector('.tab');
    currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      body.classList.add(currentTheme);
      tab.classList.add(currentTheme);
      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
      }
    }
}

// function that retrieves the event target of the switch-container in html and adds the class 'dark' to each element
// saves it in localstorage every time the event switch-container is checked or not checked 
function switchTheme(e) {
    if (e.target.checked) {
        tab.classList.add('dark');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        tab.classList.remove('dark');
        body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}
}
window.addEventListener("load", init);