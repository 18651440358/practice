'use strict'

import { app, protocol, BrowserWindow, Menu, Tray} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1366,
    minWidth: 1366,
    height: 768,
    minHeight: 768,
    titleBarStyle: 'hidden',
    transparent: true,
    movable: true,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      allowRunningInsecureContent: true,
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 导航
const temlate = [
  {
    label: '文件',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CommandOrControl+Z',
        role: 'undo'
      },
      {
        label: '回滚',
        accelerator: 'Shift+CommandOrControl+Z',
        role: 'redo'
      },
      {type: 'separator'},
      {
        label: '剪切',
        accelerator: 'CommandOrControl+X',
        role: 'cut'
      },
      {
        label: '复制',
        accelerator: 'CommandOrControl+C',
        role: 'copy'
      },
      {
        label: '粘贴',
        accelerator: 'CommandOrControl+V',
        role: 'paste'
      },
      {
        label: '全选',
        accelerator: 'CommandOrControl+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: '系统菜单',
    submenu: [
      {
        label: '学生群组挖掘',
      },
      {
        label: '房屋价格预测',
      },
      {
        label: '癌症病情诊断',
      },
      {
        label: '发起聊天',
      }
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最大化'
      },
      {
        label: '最小化'
      }
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '作者：周灿'
      }
    ]
  }
]

if(process.platform === 'darwin'){
  const name = 'Metis'
  temlate.unshift({
    label: name,
    submenu: [
      {
        label: `关于 ${name}`,
        role: 'about'
      },
      {
        label: '系统设置',
        role: 'services',
        submenu: []
      },
      {type: 'separator'},
      {
        label: `隐藏 ${name}`,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: `退出 ${name}`,
        accelerator: 'Command+Q',
        click() {app.quit()}
      },
    ]
  })
}

const appMenu = Menu.buildFromTemplate(temlate)

const getIcon = () => {
  if(process.platform === 'win32') return 'src/metis.png'
  return 'src/metis.icns'
}

const path = require('path')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  Menu.setApplicationMenu(appMenu)
  var appTray = new Tray(path.join(__dirname,getIcon));
  appTray.setToolTip('我的托盘图标');
  app.setName('Metis');
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

