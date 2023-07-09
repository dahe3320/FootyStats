var body;
var currentTheme;
var toggleSwitch;
var divsElem;
var tagMain;


function init () {
    toggleSwitch = document.querySelector('#toggle');
    toggleSwitch.addEventListener('change', switchTheme, false);
    body = document.querySelector('body');
    divsElem = document.querySelectorAll('.container');
    tagMain = document.querySelector('.tagMain');
    currentTheme = localStorage.getItem('theme');
    console.log(currentTheme);
    if (currentTheme) {
        divsElem.forEach(element => {
            element.classList.add(currentTheme);
          }); 
      body.classList.add(currentTheme);
      tagMain.classList.add(currentTheme);
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
        divsElem.forEach(element => {
            element.classList.add('dark');
          });
        tagMain.classList.add('dark');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        divsElem.forEach(element => {
            element.classList.remove('dark');
          });
        tagMain.classList.remove('dark');
        body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}
}
window.addEventListener("load", init);
