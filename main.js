const {BrowserWindow, app } = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 850,
        height: 1010,
        resizable: false
    });
    win.loadFile('index.html'); 
}

app.whenReady().then(() => {
    createWindow();
}); 