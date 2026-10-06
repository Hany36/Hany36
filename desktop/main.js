// 보급기지 작전 PC version: a window that opens the online game with the graphics card turned on,
// whatever the browser's own settings are. It always loads the newest upload; offline it falls back to a bundled copy.
const { app, BrowserWindow, Menu, session, shell } = require('electron');
const path = require('path');

const GAME_URL = 'https://hany36.github.io/Hany36/fps/';
app.commandLine.appendSwitch('ignore-gpu-blocklist');          // use the GPU even where Chromium would play safe
app.commandLine.appendSwitch('force_high_performance_gpu');    // laptops: the NVIDIA/AMD card, not the built-in one
// the frame rate follows the monitor (vsync): 165 Hz screen → 165 FPS, evenly paced

function createWindow() {
  const win = new BrowserWindow({
    width: 1600, height: 900, backgroundColor: '#101210', title: '보급기지 작전', show: false,
    webPreferences: { backgroundThrottling: false },
  });
  win.once('ready-to-show', () => { win.maximize(); win.show(); });
  // no menu: Ctrl+W and similar shortcuts can't close the game mid-match
  Menu.setApplicationMenu(null);
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    if (input.key === 'F5') { win.webContents.reloadIgnoringCache(); e.preventDefault(); }
  });
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => {
    if (isMain && url.startsWith('http')) win.loadFile(path.join(__dirname, 'offline', 'index.html'));
  });
  win.loadURL(GAME_URL);
}

app.whenReady().then(async () => {
  try { await session.defaultSession.clearCache(); } catch (e) { /* start anyway */ }   // always the newest version
  createWindow();
});
app.on('window-all-closed', () => app.quit());
