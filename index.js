const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
Menu.setApplicationMenu(null)
require('./menu')
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'CHAT BOT',
    icon: './assets/ai.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  setTimeout(() => {
    win.loadFile('index.html')
  }, 5000)
  win.loadFile('./window/Splash.html')
  // win.webContents.openDevTools()
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
