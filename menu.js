const { Menu, BrowserWindow, webContents } = require('electron')

const template = [
  {
    label: 'File',
    submenu: [{ role: 'quit' }, { role: 'reload' }],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ],
  },
  {
    label: 'Menu',
    submenu: [
      {
        label: 'History',
        click: function () {
          child = new BrowserWindow({
            width: 800,
            height: 600,
            title: 'PRAYER TIME',
            icon: './assets/ai.ico',
            // maxHeight: 600,
            // maximizable: true,
            // minimizable: true,
            // maxWidth: 1150,
            // movable: true,
            // center: true,
            darkTheme: true,
          })
          child.loadFile('./window/History.html')
          child.show()
          // child.webContents.openDevTools()
        },
      },
      {
        label: 'SignUp',
        click: function () {
          child = new BrowserWindow({
            width: 800,
            height: 600,
            title: 'PRAYER TIME',
            icon: './assets/ai.ico',
            // maxHeight: 600,
            // maximizable: true,
            // minimizable: true,
            // maxWidth: 1150,
            // movable: true,
            // center: true,
            darkTheme: true,
          })
          child.loadFile('./window/SignUp.html')
          child.show()
          // child.webContents.openDevTools()
        },
      },
    ],
  },
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
