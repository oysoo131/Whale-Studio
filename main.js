const { app, BrowserWindow, ipcMain } = require('electron')
let mainWindows;
let splash;
app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname+"/icon.png",  // 아이콘 설정
    titleBarStyle: 'hidden', // 기본 탑바 숨김
    show: false,
    webPreferences: {
      preload: __dirname + '/preload.js',  // 경로 확인
      devTools:true,
      contextIsolation: true,  // IPC 통신 보안
      nodeIntegration: false,
    },
  });
  splash = new BrowserWindow({width: 600, height: 400, transparent: true, frame: false, alwaysOnTop: true});
  splash.loadFile(`src/splash.html`);

  mainWindow.loadFile('src/index.html');
  mainWindows = mainWindow

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splash.close();
      mainWindow.show();
    }, 2000); // 2초 후 메인 창 표시

  });

  //mainWindow.loadURL("https://youtube.com")
});


ipcMain.on('window-minimize', () => {
  if (mainWindows) mainWindows.minimize();
});

ipcMain.on('window-close', () => {
  if (mainWindows) mainWindows.close();
});
ipcMain.on('win-max', () => {
  if (mainWindows) mainWindows.maximize();
});